describe('Verify Registration flow ', () => {

    const validateInput = (selector, testCases) => {
        testCases.forEach(({ input, expectedError, borderColor = 'rgb(220, 53, 69)' }) => {
            cy.get(selector).clear().type(input).blur();
            cy.get(selector).should('have.css', 'border-color', borderColor);
        });
    };

    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
    });

    it('Validates Registration Form Fields', () => {
        cy.contains('Sign In').click();
        cy.get('.modal-content').should('be.visible');
        cy.contains('Registration').click();
        cy.get('.modal-content').should('be.visible');

        // Name validation
        validateInput('input[name="name"]', [
            { input: ' ', expectedError: 'Name required' },
            { input: '%^&', expectedError: 'Name is invalid' },
            { input: 'A', expectedError: 'Name has to be from 2 to 20 characters long' },
            { input: 'A'.repeat(21), expectedError: 'Name has to be from 2 to 20 characters long' },
            { input: 'Dasha', expectedError: null, borderColor: 'rgb(206, 212, 218)'  },
        ]);

        //Last name field
        validateInput('input[name="lastName"]', [
            { input: ' ', expectedError: 'Last name required' },
            { input: '%^&', expectedError: 'Last name is invalid' },
            { input: 'A', expectedError: 'Last name has to be from 2 to 20 characters long' },
            { input: 'A'.repeat(21), expectedError: 'Last name has to be from 2 to 20 characters long' },
            { input: 'Tolstaya', expectedError: null,  borderColor: 'rgb(206, 212, 218)'},
        ]);

        // Email field validation
        validateInput('input[name="email"]', [
            { input: ' ', expectedError: 'Email required' },
            { input: 'invalid-email', expectedError: 'Email is incorrect' },
            { input: 'daria.t@gmail.com', expectedError: null, borderColor: 'rgb(206, 212, 218)'},
        ]);

        // Password validation
        validateInput('input[name="password"]', [
            { input: ' ', expectedError: 'Password required' },
            {
                input: '123',
                expectedError:
                    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
            },
            { input: 'Password123', expectedError: null,  borderColor: 'rgb(206, 212, 218)'},
        ]);

        // Re-enter pass
        cy.get('input[name="repeatPassword"]').clear().focus().blur();
        cy.get('input[name="repeatPassword"]').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Re-enter password required');

        cy.get('input[name="password"]').clear().type('Password123');
        cy.get('input[name="repeatPassword"]').type('Password12345');
        cy.get('input[name="repeatPassword"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Passwords do not match');

        cy.get('input[name="repeatPassword"]').clear().type('Password123');
        cy.get('input[name="repeatPassword"]').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('not.exist');

        cy.contains('Register').click();
    });

    it('Login with Valid Credentials', () => {
        cy.contains('Sign In').click();
        cy.login('daria.t@gmail.com', 'Password123');

        cy.url().should('include', '/garage');
    });
})
