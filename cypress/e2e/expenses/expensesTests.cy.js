const expensesPage = require('./expensesPage');

describe('Expenses Tests', () => {
    beforeEach(() => {
        cy.visit('/garage');
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.addCar('Toyota', 'Corolla'); // Виклик методу GaragePage
        cy.contains('Toyota Corolla').click();
    });

    it('should add a fuel expense', () => {
        expensesPage.addExpense(50);
        cy.contains('$50').should('exist');
    });
});
