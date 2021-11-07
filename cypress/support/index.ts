import axios from 'axios';
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

        cy.request(reqData(json.username, json.password)).then((response) => {
            if (response.status === 200) {
                expect(response.body).to.have.property(
                    'username',
                    json.username,
                );
                expect(response.body).to.have.property('access_token');
                return;
            }

            cy.request(reqData(json.tmpUsername, json.password)).then(
                (response) => {
                    if (response.status === 200) {
                        expect(response.body).to.have.property(
                            'username',
                            json.tmpUsername,
                        );
                        expect(response.body).to.have.property('access_token');
                        return;
                    }

                    cy.request(reqData(json.username, json.tmpPassword)).then(
                        (response) => {
                            if (response.status === 200) {
                                expect(response.body).to.have.property(
                                    'username',
                                    json.username,
                                );
                                expect(response.body).to.have.property(
                                    'access_token',
                                );
                                return;
                            }
                        },
                    );
                },
            );
        });
    });
});
