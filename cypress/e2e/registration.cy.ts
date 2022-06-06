describe('Registration page works', () => {
    it('works with correct data', () => {
        cy.visit('/register');

        cy.get('[data-testid="reg"]').as('reg').should('be.disabled');
        cy.get('[data-testid="validation-error"]').as('validation-error');

        cy.get('[data-testid="firstname"]').as('firstname');
        cy.get('[data-testid="lastname"]').as('lastname');
        cy.get('[data-testid="email"]').as('email');
        cy.get('[data-testid="password"]').as('password');

        // validation check
        cy.get('@firstname').type('U');
        cy.get('@lastname').type('L');
        cy.get('@email').type('u');
        cy.get('@password').type('01');
        cy.contains('Имя менее');
        cy.contains('Фамилия менее');
        cy.contains('нет символа @');
        cy.contains('короткая почта');
        cy.contains('короткий пароль');
        cy.get('@reg').should('be.disabled');

        // valid values
        cy.get('@firstname').type('ser');
        cy.get('@lastname').type('astname');
        cy.get('@email').type('ser@mail.com');
        cy.get('@password').type('2345');
        cy.get('@reg').should('be.enabled');

        // network check
        cy.intercept({
            method: 'post',
            url: 'http://127.0.0.1:3030/api/v1/user',
        }, {
            body: JSON.stringify({
                "id":14,
                "email":"test@mail.com",
                "firstName":"test",
                "lastName":"test",
                "password":"$2b$10$LP7J1X7Be7rE3MgtKgLKS.BKBrsKYkIxo1QnyJyj9Nk10aolR5Rle",
                "avatarName":"default.jpg",
                "isAdmin":false,
                "isBanned":false
            })
        }).as('reg-req');

        cy.intercept({
            method: 'post',
            url: 'http://127.0.0.1:3030/api/v1/user',
        }, {
            body: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidXNlckBtYWlsLmNvbSIsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJhdmF0YXJOYW1lIjoiZGVmYXVsdC5qcGciLCJpc0FkbWluIjpmYWxzZSwiaXNCYW5uZWQiOnRydWUsImlhdCI6MTY1NDQ1NTEwN30.81rfI-buXyjkNc2TNhmmAqOaxin548ES86YdGafx6V0'
        }).as('login-req');

        cy.get('@reg').click();
        cy.url().should('eq', `${Cypress.env('baseUrl')}/`);

        // cy.get('[data-testid="error-status"]').as('error-status');
    });
});