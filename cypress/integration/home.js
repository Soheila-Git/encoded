/* global cy */
describe('Test home page', () => {
    it('Goes to the home page', () => {
        cy.server();
        cy.route('GET', '/search/?type=Experiment*').as('getExperiments');
        cy.route('GET', '/search/?type=Page*').as('getNews');
        cy.visit('http://localhost:6543/');
        cy.wait(['@getExperiments', '@getNews']).then((() => {
            cy.contains('Fly').click();
        }));
    });
});
