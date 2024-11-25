class ExpensesPage {
    get addExpenseButton() {
        return cy.get('[data-testid="add-expense"]');
    }
    get mileageInput() {
        return cy.get('[name="mileage"]');
    }
    get litersInput() {
        return cy.get('[name="liters"]');
    }
    get totalCostInput() {
        return cy.get('[name="total-cost"]');
    }
    get saveExpenseButton() {
        return cy.get('[data-testid="save-expense"]');
    }

    addFuelExpense(mileage, liters, cost) {
        this.addExpenseButton.click();
        this.mileageInput.type(mileage);
        this.litersInput.type(liters);
        this.totalCostInput.type(cost);
        this.saveExpenseButton.click();
        cy.contains(`$${cost}`).should('exist');
    }
}

module.exports = new ExpensesPage();
