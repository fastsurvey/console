import * as utilities from '../../support/utilities';

const {login, logout, reload} = utilities;

describe('The Config List Page', () => {
    // @ts-ignore
    after(cy.seedConfigData);

    beforeEach(() => {
        cy.fixture('account.json').then((accountJSON: any) => {
            login(accountJSON.username, accountJSON.password);
        });
    });

    it('looks as expected', () => {});
});
