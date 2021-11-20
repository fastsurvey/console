/// <reference types="cypress" />

Cypress.Commands.add('seedAccountData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        console.log('SEED BLUEBERRY ACCOUNT', accountJSON);
        const {EMAIL, USERNAME, PASSWORD, TMP_USERNAME, TMP_PASSWORD} = accountJSON;

        const reqData = (username: string, password: string) => ({
            method: 'POST',
            url: 'https://api.dev.fastsurvey.de/authentication',
            body: {identifier: username, password},
            failOnStatusCode: false,
        });

        const seedData = (username: string, access_token: string) => ({
            method: 'PUT',
            url: `https://api.dev.fastsurvey.de/users/${username}`,
            body: {
                username: USERNAME,
                email_address: EMAIL,
                password: PASSWORD,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        const expectBodyFormat = (
            response: Cypress.Response<any>,
            username: string,
        ) => {
            expect(response.body).to.have.property('username', username);
            expect(response.body).to.have.property('access_token');
        };

        cy.request(reqData(USERNAME, PASSWORD)).then((r1) => {
            if (r1.status === 200) {
                expectBodyFormat(r1, USERNAME);
                return;
            }

            cy.request(reqData(TMP_USERNAME, PASSWORD)).then((r2) => {
                if (r2.status === 200) {
                    expectBodyFormat(r2, TMP_USERNAME);
                    cy.request(seedData(TMP_USERNAME, r2.body.access_token));
                    return;
                }

                cy.request(reqData(USERNAME, TMP_PASSWORD)).then((r3) => {
                    expect(r3.status).to.equal(200);
                    expectBodyFormat(r3, USERNAME);
                    cy.request(seedData(USERNAME, r3.body.access_token));
                });
            });
        });
    });
});

Cypress.Commands.add('seedConfigData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        cy.fixture('configs.json').then((configsJSON: any) => {
            console.log('SEED BLUEBERRY CONFIGS', accountJSON, configsJSON);
            const {USERNAME, PASSWORD} = accountJSON;

            cy.request({
                method: 'POST',
                url: 'https://api.dev.fastsurvey.de/authentication',
                body: {
                    identifier: USERNAME,
                    password: PASSWORD,
                },
            }).then((authResponse) => {
                expect(authResponse.status).to.equal(200);
                expect(authResponse.body).to.have.property('username', USERNAME);
                expect(authResponse.body).to.have.property('access_token');

                cy.request({
                    method: 'GET',
                    url: `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys`,
                    headers: {
                        Authorization: `Bearer ${authResponse.body.access_token}`,
                        'Content-Type': 'application/json',
                    },
                }).then((configsResponse) => {
                    expect(configsResponse.status).to.equal(200);
                    expect(configsResponse.body).to.have.length.gte(2);

                    const surveyToDelete = configsResponse.body
                        .map((c: any) => c['survey_name'])
                        .filter((s: string) => !configsJSON.surveysToKeep.includes(s));

                    console.log(`DELETE SURVEYS ${JSON.stringify(surveyToDelete)}`);

                    surveyToDelete.forEach((s: string) => {
                        cy.request({
                            method: 'DELETE',
                            url: `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys/${s}`,
                            headers: {
                                Authorization: `Bearer ${authResponse.body.access_token}`,
                                'Content-Type': 'application/json',
                            },
                        });
                    });
                });
            });
        });
    });
});

Cypress.Commands.add('seedDuplicationData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        cy.fixture('configs.json').then((configsJSON: any) => {
            const authRequest = {
                method: 'POST',
                url: 'https://api.dev.fastsurvey.de/authentication',
                body: {
                    identifier: accountJSON.username,
                    password: accountJSON.password,
                },
            };

            const duplicationRequest = (
                method: 'GET' | 'POST' | 'PUT',
                authResponse: Cypress.Response<any>,
            ) => {
                const config =
                    configsJSON.duplication[
                        method === 'POST' ? 'original' : 'updated_original'
                    ];
                return {
                    method: method,
                    url: `https://api.dev.fastsurvey.de/users/${accountJSON.username}/surveys/${config['survey_name']}`,
                    body: method === 'GET' ? undefined : config,
                    headers: {
                        Authorization: `Bearer ${authResponse.body['access_token']}`,
                        'Content-Type': 'application/json',
                    },
                };
            };

            cy.request(authRequest).then((authResponse) => {
                expect(authResponse.status).to.equal(200);
                expect(authResponse.body).to.have.property('access_token');

                cy.request(duplicationRequest('POST', authResponse)).then(
                    (duplicationResponse) => {
                        expect(duplicationResponse.status).to.equal(200);
                        cy.request(duplicationRequest('PUT', authResponse)).then(
                            (duplicationResponse2) => {
                                expect(duplicationResponse2.status).to.equal(200);

                                cy.request(
                                    duplicationRequest('GET', authResponse),
                                ).then((duplicationResponse3) => {
                                    expect(duplicationResponse3.status).to.equal(200);
                                    expect(duplicationResponse3.body).to.deep.equal({
                                        ...configsJSON.duplication['updated_original'],
                                        max_identifier:
                                            configsJSON.duplication[
                                                'updated_max_identifier'
                                            ],
                                    });
                                });
                            },
                        );
                    },
                );
            });
        });
    });
});
