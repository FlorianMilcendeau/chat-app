describe('User authentication', () => {
    it('Client - User registration', () => {
        cy.visit('/authenticate/sign-up');

        cy.get('button[type="submit"]').should('be.disabled');

        cy.get('input[name="name"]').type('John').should('have.value', 'John');

        cy.get('input[name="email"]')
            .type('jdoe@gmail.com')
            .should('have.value', 'jdoe@gmail.com');

        cy.get('input[name="password"]')
            .type('$cx4&4?eLXd@N%62')
            .should('have.value', '$cx4&4?eLXd@N%62');

        cy.wait(500);

        cy.get('input[name="password-check"]')
            .type('$cx4&4?eLXd@N%62', { force: true })
            .should('have.value', '$cx4&4?eLXd@N%62');

        cy.get('button[type="submit"]').should('not.be.disabled');
    });

    it('Client - User login', () => {
        cy.visit('/authenticate/sign-in');

        cy.get('input[name="email"]')
            .type('jdoe@gmail.com')
            .should('have.value', 'jdoe@gmail.com');

        cy.get('input[name="password"]')
            .type('$cx4&4?eLXd@N%62')
            .should('have.value', '$cx4&4?eLXd@N%62');
    });

    it('Client - Should be redirect to sign-in page', () => {
        cy.visit('/authenticate/sign-up');

        cy.contains('sign-in').click();

        cy.url().should('include', '/authenticate/sign-in');
    });

    it('Client - Should be redirect to sign-up page', () => {
        cy.visit('/authenticate/sign-in');

        cy.contains('sign-up').click();

        cy.url().should('include', '/authenticate/sign-up');
    });
});
