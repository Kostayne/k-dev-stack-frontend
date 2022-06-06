describe('login page', () => {
    it('valid', () => {
        cy.visit('/login');

        cy.get('[data-testid="email"]').as('email');
        cy.get('[data-testid="password"]').as('password');
        cy.get('[data-testid="login"]').as('login').should('be.disabled');

        // default values
        cy.get('@email').should("be.empty");
        cy.get('@password').should("be.empty");

        cy.get('@email').type('ha');

        cy.get('[data-testid="validation-error"]').as('validation-error');
        cy.get('@validation-error');

        cy.get('@email').clear().type('not-exists@mail.heh');
        cy.get('@password').type('012345');

        cy.get('@validation-error').should('not.exist');
        cy.get('[data-testid="login"]').as('login').should('be.enabled');

        // invalid data
        cy.get('@email').clear().type('not-exists@mail.heh');
        cy.get('@login').click();
        
        cy.get('[data-testid="status"]').as('status')
            .contains('Неправильные данные');

        // valid data
        cy.get('@email').clear().type('user@mail.com');

        cy.fixture('me.json').then(data => {
            cy.intercept({
                method: 'get',
                url: Cypress.env('apiUrl') + '/user/me'
            }, {
                statusCode: 200,
                body: data
            })
        }).as('meReq');

        cy.fixture('login.txt').then(data => {
            cy.intercept({
                method: 'POST',
                url: Cypress.env('apiUrl') + '/user/auth'
            },
            
            {
                statusCode: 200,
                body: data
            })
        }).as('loginReq');

        cy.get('@login').click();
        cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
    });
});

export {};