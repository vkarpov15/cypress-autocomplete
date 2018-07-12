describe('Autocomplete', function() {
  it('renders results', function() {
    cy.visit('http://localhost:5000', {
      onBeforeLoad: win => {
        // Stub out `window.fetch()` so `index.js` doesn't actually hit
        // the npm API
        cy.stub(win, 'fetch', () => {
          return Promise.resolve({
            json: () => ({
              objects: [
                { package: { name: 'mongoose' } },
                { package: { name: 'mongoose-autopopulate' } }
              ]
            })
          });
        });
      }
    });

    // `{enter}` is how you simulate hitting the 'enter' key in Cypress
    // See: https://docs.cypress.io/api/commands/type.html#Arguments
    cy.get('#search').type('mongoose{enter}');

    // Don't use `expect()` directly here, chaining calls onto `cy`
    // is potentially async
    cy.get('#results').
      should('contain', 'mongoose').
      and('contain', 'mongoose-autopopulate');
  });
});
