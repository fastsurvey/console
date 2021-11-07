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
