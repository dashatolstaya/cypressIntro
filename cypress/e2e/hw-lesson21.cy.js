import '../support/commands'

describe('Car creation with response interception', () => {
    let carId;
    let authCookie;

    beforeEach(() => {
        cy.intercept('POST', '**/api/cars').as('createCar');
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });
        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/auth/signin',
            body: {
                email: 'daria.t@gmail.com',
                password: 'Password123',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            expect(response.status).to.equal(200);

            const authCookie = response.headers['set-cookie']
                .find((cookie) => cookie.startsWith('sid'))
                .split(';')[0];
            const [cookieName, cookieValue] = authCookie.split('=');
            cy.setCookie(cookieName, cookieValue);
            Cypress.env('authCookie', authCookie);
            cy.log('Auth Cookie:', authCookie);
            cy.reload();
        });
    });

    it('should create a car and intercept the response', () => {
        cy.contains('Add car').click();
        cy.get('select[name="carBrandId"]').select('Audi');
        cy.get('select[name="carModelId"]').select('TT');
        cy.get('input[name="mileage"]').type('20');
        cy.get('.modal-content').within(() => {
            cy.contains('button', 'Add').click();
        });

        cy.wait('@createCar').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
            carId = interception.response.body.data.id;
            expect(carId).to.exist;
            Cypress.env('carId', carId);
            cy.log('Created Car ID:', carId);
        });
    });

    it('should validate that created car exists in the list', () => {

        const authCookie = Cypress.env('authCookie');
        const carId = Cypress.env('carId');

        expect(authCookie).to.exist;
        expect(carId).to.exist;

        cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/cars',
            headers: {
                Cookie: authCookie,
            },
        }).then((response) => {
            expect(response.status).to.equal(200);

            const carList = response.body.data;
            const createdCar = carList.find((car) => car.id === carId);

            expect(createdCar).to.exist;
            expect(createdCar.brand).to.equal('Audi');
            expect(createdCar.model).to.equal('TT');

            cy.log('Created car found in list:', createdCar);
        });
    });

    it('should create an expense via API and validate response', () => {
        const authCookie = Cypress.env('authCookie');
        const carId = Cypress.env('carId');

        const expenseData = {
            carId: carId,
            reportedAt: "2024-12-30",
            mileage: 100,
            liters: 20,
            totalCost: 1000,
            forceMileage: false
        };

        let expenseId;

        cy.createExpense(authCookie, carId, expenseData).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.include({
                reportedAt: expenseData.reportedAt,
                mileage: expenseData.mileage,
                liters: expenseData.liters,
                totalCost: expenseData.totalCost,
            });
            cy.log('Created Expense ID:', response.body.data.id);
            expenseId = response.body.data.id;
            expect(expenseId).to.exist;
            Cypress.env('expenseId', expenseId);
            cy.log('Created Expense ID:', expenseId);
        });
    });

    it('should validate created expense in UI', () => {
        const authCookie = Cypress.env('authCookie');
        const carId = Cypress.env('carId');

        expect(authCookie).to.exist;
        expect(carId).to.exist;

        cy.request({
            method: 'GET',
            url: `https://qauto.forstudy.space/api/expenses`,
            headers: {
                Cookie: authCookie,
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            cy.log('API Expenses:', response.body.data);
        });

        cy.contains('Fuel expenses').click();
        cy.get('td').eq(0).should('contain', '30.12.2024');
        cy.get('td').eq(1).should('contain', '100');
        cy.get('td').eq(2).should('contain', '20');
        cy.get('td').eq(3).should('contain', '1000.00');
    });})