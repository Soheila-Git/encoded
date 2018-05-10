/* global cy */
describe('Test home page', () => {
    it('Goes to the home page', () => {
        cy.server();
        cy.route('GET', '/search/?type=Experiment&status=released').as('getExperiments');
        cy.route('GET', '/search/?type=Page&news=true&status=released&limit=5').as('getNews');
        cy.visit('http://localhost:6543/');
        cy.wait(['@getExperiments', '@getNews']).then(() => {
            cy.get('#chart-wrapper-2');
        });
    });

    it('Goes to the Experiment search page', () => {
        cy.contains('Data').click().then(() => {
            cy.contains('Search').click();
        });
        cy.url().should('eq', 'http://localhost:6543/search/?type=Experiment');
        cy.get('[data-test="search-results"]').within(() => {
            cy.contains('25');
        });
    });

    it('Properly selects facets', () => {
        cy.get('[data-test="facet-Assay category"]').within(() => {
            cy.contains('Transcription').click();
        });
        cy.get('[data-test="search-results"]').within(() => {
            cy.contains('12');
        });
    });
});
