// Login
Cypress.Commands.add('login', (email, password) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('Password123', { sensitive: true });
    cy.contains('Login').click();
});

//Secret password
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }

    return originalFn(element, text, options)
});

Cypress.Commands.add('createExpense', (authCookie, carId, expenseData) => {
    return cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/expenses',
        headers: {
            Cookie: authCookie,
        },
        body: {
            carId: carId,
            ...expenseData,
        },
    });
});
