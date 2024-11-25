class GaragePage {
    get addCarButton() {
        return cy.get('[data-testid="add-car"]');
    }
    get carBrandInput() {
        return cy.get('[name="brand"]');
    }
    get carModelInput() {
        return cy.get('[name="model"]');
    }
    get saveCarButton() {
        return cy.get('[data-testid="save-car"]');
    }

    addCar(brand, model) {
        this.addCarButton.click();
        this.carBrandInput.type(brand);
        this.carModelInput.type(model);
        this.saveCarButton.click();
        cy.contains(`${brand} ${model}`).should('exist');
    }
}

module.exports = new GaragePage();
