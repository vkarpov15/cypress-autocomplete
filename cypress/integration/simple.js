describe('Autocomplete', function() {
  it('renders results', function() {
    cy.visit('http://localhost:5000', {
      onBeforeLoad: win => {
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

    cy.get('#search').type('mongoose{enter}');

    cy.get('#results').
      should('contain', 'mongoose').
      and('contain', 'mongoose-autopopulate');
  });
});
