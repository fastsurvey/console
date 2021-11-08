/// <reference types="cypress" />

Cypress.Commands.add('seedAccountData', () => {
    cy.fixture('account.json').then((json: any) => {
        console.log('SEED BLUEBERRY ACCOUNT', json);

        const reqData = (username: string, password: string) => ({
            method: 'POST',
            url: 'https://api.dev.fastsurvey.de/authentication',
            body: {
                identifier: username,
                password: password,
            },
            failOnStatusCode: false,
        });

        const seedData = (username: string, access_token: string) => ({
            method: 'PUT',
            url: `https://api.dev.fastsurvey.de/users/${username}`,
            body: {
                username: json.username,
                email_address: json.email,
                password: json.password,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        const expectBody = (
            response: Cypress.Response<any>,
            username: string,
        ) => {
            expect(response.body).to.have.property('username', username);
            expect(response.body).to.have.property('access_token');
        };

        cy.request(reqData(json.username, json.password)).then((r1) => {
            if (r1.status === 200) {
                expectBody(r1, json.username);
                return;
            }

            cy.request(reqData(json.tmpUsername, json.password)).then((r2) => {
                if (r2.status === 200) {
                    expectBody(r2, json.tmpUsername);
                    cy.request(
                        seedData(json.tmpUsername, r2.body.access_token),
                    );
                    return;
                }

                cy.request(reqData(json.username, json.tmpPassword)).then(
                    (r3) => {
                        expect(r3.status).to.equal(200);
                        expectBody(r3, json.username);
                        cy.request(
                            seedData(json.username, r3.body.access_token),
                        );
                    },
                );
            });
        });
    });
});

Cypress.Commands.add('seedConfigData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        cy.fixture('configs.json').then((configsJSON: any) => {
            console.log('SEED BLUEBERRY CONFIGS', accountJSON, configsJSON);

            cy.request({
                method: 'POST',
                url: 'https://api.dev.fastsurvey.de/authentication',
                body: {
                    identifier: accountJSON.username,
                    password: accountJSON.password,
                },
            }).then((authResponse) => {
                expect(authResponse.status).to.equal(200);
                expect(authResponse.body).to.have.property(
                    'username',
                    accountJSON.username,
                );
                expect(authResponse.body).to.have.property('access_token');

                cy.request({
                    method: 'GET',
                    url: `https://api.dev.fastsurvey.de/users/${accountJSON.username}/surveys`,
                    headers: {
                        Authorization: `Bearer ${authResponse.body.access_token}`,
                        'Content-Type': 'application/json',
                    },
                }).then((configsResponse) => {
                    expect(configsResponse.status).to.equal(200);
                    expect(configsResponse.body).to.have.length.gte(2);

                    const surveyToDelete = configsResponse.body
                        .map((c: any) => c['survey_name'])
                        .filter(
                            (s: string) =>
                                !configsJSON.surveysToKeep.includes(s),
                        );

                    console.log(
                        `DELETE SURVEYS ${JSON.stringify(surveyToDelete)}`,
                    );

                    surveyToDelete.forEach((s: string) => {
                        cy.request({
                            method: 'DELETE',
                            url: `https://api.dev.fastsurvey.de/users/${accountJSON.username}/surveys/${s}`,
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

Cypress.Commands.add('seedAccountData', () => {
    cy.fixture('account.json').then((json: any) => {
        console.log('SEED BLUEBERRY ACCOUNT', json);

        const reqData = (username: string, password: string) => ({
            method: 'POST',
            url: 'https://api.dev.fastsurvey.de/authentication',
            body: {
                identifier: username,
                password: password,
            },
            failOnStatusCode: false,
        });

        const seedData = (username: string, access_token: string) => ({
            method: 'PUT',
            url: `https://api.dev.fastsurvey.de/users/${username}`,
            body: {
                username: json.username,
                email_address: json.email,
                password: json.password,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        const expectBody = (
            response: Cypress.Response<any>,
            username: string,
        ) => {
            expect(response.body).to.have.property('username', username);
            expect(response.body).to.have.property('access_token');
        };

        cy.request(reqData(json.username, json.password)).then((r1) => {
            if (r1.status === 200) {
                expectBody(r1, json.username);
                return;
            }

            cy.request(reqData(json.tmpUsername, json.password)).then((r2) => {
                if (r2.status === 200) {
                    expectBody(r2, json.tmpUsername);
                    cy.request(
                        seedData(json.tmpUsername, r2.body.access_token),
                    );
                    return;
                }

                cy.request(reqData(json.username, json.tmpPassword)).then(
                    (r3) => {
                        expect(r3.status).to.equal(200);
                        expectBody(r3, json.username);
                        cy.request(
                            seedData(json.username, r3.body.access_token),
                        );
                    },
                );
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
                        cy.request(
                            duplicationRequest('PUT', authResponse),
                        ).then((duplicationResponse2) => {
                            expect(duplicationResponse2.status).to.equal(200);

                            cy.request(
                                duplicationRequest('GET', authResponse),
                            ).then((duplicationResponse3) => {
                                expect(duplicationResponse3.status).to.equal(
                                    200,
                                );
                                expect(duplicationResponse3.body).to.deep.equal(
                                    {
                                        ...configsJSON.duplication[
                                            'updated_original'
                                        ],
                                        max_identifier:
                                            configsJSON.duplication[
                                                'updated_max_identifier'
                                            ],
                                    },
                                );
                            });
                        });
                    },
                );
            });
        });
    });
});
