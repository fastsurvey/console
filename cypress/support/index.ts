/// <reference types="cypress" />

import {first} from 'lodash';

export const requestAuthentication = (identifier: string, password: string) =>
    cy.request({
        method: 'POST',
        url: 'https://api.dev.fastsurvey.de/authentication',
        body: {
            identifier,
            password,
        },
        headers: {
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
    });

Cypress.Commands.add('seedAccountData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        console.log('SEED BLUEBERRY ACCOUNT', accountJSON);
        const {EMAIL, USERNAME, PASSWORD, TMP_USERNAME, TMP_PASSWORD} = accountJSON;

        const requestAccountUpdate = (
            authResponse: Cypress.Response<any>,
            username: string,
        ) =>
            cy.request({
                method: 'PUT',
                url: `https://api.dev.fastsurvey.de/users/${username}`,
                body: {
                    username: USERNAME,
                    email_address: EMAIL,
                    password: PASSWORD,
                },
                headers: {
                    Authorization: `Bearer ${authResponse.body.access_token}`,
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

        requestAuthentication(USERNAME, PASSWORD).then((r1) => {
            if (r1.status === 200) {
                expectBodyFormat(r1, USERNAME);
                return;
            }

            requestAuthentication(TMP_USERNAME, PASSWORD).then((r2) => {
                if (r2.status === 200) {
                    expectBodyFormat(r2, TMP_USERNAME);
                    requestAccountUpdate(r2, TMP_USERNAME);
                    return;
                }

                requestAuthentication(USERNAME, TMP_PASSWORD).then((r3) => {
                    expect(r3.status).to.equal(200);
                    expectBodyFormat(r3, USERNAME);
                    requestAccountUpdate(r3, USERNAME);
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
            const {SURVEYS_TO_KEEP} = configsJSON;

            const requestConfigs = (authResponse: Cypress.Response<any>) =>
                cy.request({
                    method: 'GET',
                    url: `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys`,
                    headers: {
                        Authorization: `Bearer ${authResponse.body.access_token}`,
                        'Content-Type': 'application/json',
                    },
                });

            const requestDelete =
                (authResponse: Cypress.Response<any>) => (surveyName: string) =>
                    cy.request({
                        method: 'DELETE',
                        url: `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys/${surveyName}`,
                        headers: {
                            Authorization: `Bearer ${authResponse.body.access_token}`,
                            'Content-Type': 'application/json',
                        },
                    });

            requestAuthentication(USERNAME, PASSWORD).then((authResponse) => {
                expect(authResponse.status).to.equal(200);
                expect(authResponse.body).to.have.property('username', USERNAME);
                expect(authResponse.body).to.have.property('access_token');

                requestConfigs(authResponse).then((configsResponse) => {
                    expect(configsResponse.status).to.equal(200);

                    const surveyToDelete = configsResponse.body
                        .map((c: any) => c['survey_name'])
                        .filter((s: string) => !SURVEYS_TO_KEEP.includes(s));

                    console.log(`DELETE SURVEYS ${JSON.stringify(surveyToDelete)}`);
                    surveyToDelete.map(requestDelete(authResponse));
                });
            });
        });
    });
});

Cypress.Commands.add('seedDuplicationData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        cy.fixture('configs.json').then((configsJSON: any) => {
            const {USERNAME, PASSWORD} = accountJSON;
            const {ORIGINAL_SURVEY, UPDATED_ORIGINAL, UPDATED_NEXT_IDENTIFIER} =
                configsJSON.DUPLICATION;

            const request = (
                method: 'GET' | 'POST' | 'PUT',
                url: string,
                body: any,
                authResponse: Cypress.Response<any>,
            ) => {
                return cy.request({
                    method,
                    url,
                    body,
                    headers: {
                        Authorization: `Bearer ${authResponse.body['access_token']}`,
                        'Content-Type': 'application/json',
                    },
                });
            };

            requestAuthentication(USERNAME, PASSWORD).then((authResponse) => {
                expect(authResponse.status).to.equal(200);
                expect(authResponse.body).to.have.property('access_token');

                const postInitialConfig = () =>
                    request(
                        'POST',
                        `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys`,
                        ORIGINAL_SURVEY,
                        authResponse,
                    );

                const putUpdatedConfig = () =>
                    request(
                        'PUT',
                        `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys/${UPDATED_ORIGINAL['survey_name']}`,
                        UPDATED_ORIGINAL,
                        authResponse,
                    );

                const getConfigs = () =>
                    request(
                        'GET',
                        `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys`,
                        undefined,
                        authResponse,
                    );

                postInitialConfig().then((r1) => {
                    expect(r1.status).to.equal(200);

                    getConfigs().then((r2) => {
                        expect(r2.status).to.equal(200);

                        expect(
                            first(
                                r2.body.filter(
                                    (c: any) =>
                                        c['survey_name'] ===
                                        ORIGINAL_SURVEY.survey_name,
                                ),
                            ),
                        ).to.deep.equal({
                            ...ORIGINAL_SURVEY,
                            next_identifier: UPDATED_NEXT_IDENTIFIER,
                        });

                        putUpdatedConfig().then((r3) => {
                            expect(r3.status).to.equal(200);

                            getConfigs().then((r4) => {
                                expect(r4.status).to.equal(200);
                                expect(
                                    first(
                                        r4.body.filter(
                                            (c: any) =>
                                                c['survey_name'] ===
                                                UPDATED_ORIGINAL.survey_name,
                                        ),
                                    ),
                                ).to.deep.equal({
                                    ...UPDATED_ORIGINAL,
                                    next_identifier: UPDATED_NEXT_IDENTIFIER,
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

Cypress.Commands.add('seedEditorData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        cy.fixture('configs.json').then((configsJSON: any) => {
            const {USERNAME, PASSWORD} = accountJSON;
            const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER} = configsJSON.EDITOR;

            const baseUrl = `https://api.dev.fastsurvey.de/users/${USERNAME}`;

            const postConfig = (authResponse: Cypress.Response<any>) =>
                cy.request({
                    method: 'POST',
                    url: `${baseUrl}/surveys`,
                    body: INITIAL_SURVEY,
                    headers: {
                        Authorization: `Bearer ${authResponse.body['access_token']}`,
                        'Content-Type': 'application/json',
                    },
                });

            const getConfig = (authResponse: Cypress.Response<any>) =>
                cy.request({
                    method: 'GET',
                    url: `${baseUrl}/surveys/${INITIAL_SURVEY['survey_name']}`,
                    headers: {
                        Authorization: `Bearer ${authResponse.body['access_token']}`,
                        'Content-Type': 'application/json',
                    },
                });

            requestAuthentication(USERNAME, PASSWORD).then((authResponse) => {
                expect(authResponse.status).to.equal(200);
                expect(authResponse.body).to.have.property('access_token');

                postConfig(authResponse).then((r1) => {
                    expect(r1.status).to.equal(200);

                    getConfig(authResponse).then((r2) => {
                        expect(r2.status).to.equal(200);
                        expect(r2.body).to.deep.equal({
                            ...INITIAL_SURVEY,
                            next_identifier: INITIAL_NEXT_IDENTIFIER,
                        });
                    });
                });
            });
        });
    });
});

Cypress.Commands.add('seedResultsData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        cy.fixture('configs.json').then((configsJSON: any) => {
            const {USERNAME, PASSWORD} = accountJSON;
            const {SURVEY, INITIAL_SUBMISSIONS} = configsJSON.RESULTS;

            const baseUrl = `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys`;

            const postConfig = (authResponse: Cypress.Response<any>) =>
                cy.request({
                    method: 'POST',
                    url: baseUrl,
                    body: SURVEY,
                    headers: {
                        Authorization: `Bearer ${authResponse.body['access_token']}`,
                        'Content-Type': 'application/json',
                    },
                });

            const postSubmission = (
                authResponse: Cypress.Response<any>,
                submission: any,
            ) =>
                cy.request({
                    method: 'POST',
                    url: `${baseUrl}/${SURVEY['survey_name']}/submissions`,
                    body: submission,
                    headers: {
                        Authorization: `Bearer ${authResponse.body['access_token']}`,
                        'Content-Type': 'application/json',
                    },
                });

            requestAuthentication(USERNAME, PASSWORD).then((r1: any) => {
                expect(r1.status).to.equal(200);
                postConfig(r1).then((r2) => {
                    expect(r2.status).to.equal(200);
                    INITIAL_SUBMISSIONS.forEach((s: any) => {
                        postSubmission(r1, s).then((r3) => {
                            expect(r3.status).to.equal(200);
                        });
                    });
                });
            });
        });
    });
});

Cypress.Commands.add('seedUpdatedResultsData', () => {
    cy.fixture('account.json').then((accountJSON: any) => {
        cy.fixture('configs.json').then((configsJSON: any) => {
            const {USERNAME, PASSWORD} = accountJSON;
            const {SURVEY, UPDATED_SUBMISSIONS} = configsJSON.RESULTS;

            requestAuthentication(USERNAME, PASSWORD).then((r1: any) => {
                expect(r1.status).to.equal(200);
                UPDATED_SUBMISSIONS.forEach((s: any) => {
                    cy.request({
                        method: 'POST',
                        url:
                            `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys` +
                            `/${SURVEY['survey_name']}/submissions`,
                        body: s,
                        headers: {
                            Authorization: `Bearer ${r1.body['access_token']}`,
                            'Content-Type': 'application/json',
                        },
                    }).then((r2) => {
                        expect(r2.status).to.equal(200);
                    });
                });
            });
        });
    });
});
