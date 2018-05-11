/* global cy */
describe('encoded test', () => {
    it('goes to the search page from the home page', () => {
        cy.visit('http://localhost:6543');
        cy.get('#navbar').within(() => {
            cy.contains('Data').click();
            cy.contains('Search').click();
        });
    });

    it('has the correct URL', () => {
        cy.url().should('eq', 'http://localhost:6543/search/?type=Experiment');
    });

    it('has the correct search result count', () => {
        cy.get('[data-test="search-results"]').contains('43');
    });
});
