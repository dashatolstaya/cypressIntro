const garagePage = require('./garagePage');
const expensesPage = require('../expenses/expensesPage');

describe('Garage Tests', () => {
    beforeEach(() => {
        cy.visit('/garage');
        cy.login(Cypress.env('email'), Cypress.env('password')); // Custom login command
    });

    it('should add a car and fuel expense', () => {
        const carBrand = 'Audi';
        const carModel = 'TT';
        const mileage = 1200;
        const liters = 50;
        const cost = 80;

        garagePage.addCar(carBrand, carModel);

        // Navigate to Fuel Expenses for this car
        cy.contains(`${carBrand} ${carModel}`).click();
        cy.contains('Add fuel expense').click();


        expensesPage.addFuelExpense(mileage, liters, cost);
    });
});
