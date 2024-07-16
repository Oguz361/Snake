describe('Weather App E2E Tests', () => {
  it('should load the main page', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Enter city"]').should('exist');
  });

  it('should display an error message for an unknown city', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Enter city"]').type('UnknownCity');
    cy.get('button').contains('Search').click();
    cy.contains('Error fetching weather data. Please try again.').should('exist');
  });

  it('should display the loading indicator while fetching data', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Enter city"]').type('Berlin');
    cy.get('button').contains('Search').click();
    cy.contains('Loading').should('exist');
    cy.contains('Berlin').should('exist');
  });

  it('should show weather details when a city is found', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Enter city"]').type('Berlin');
    cy.get('button').contains('Search').click();
    cy.contains('Berlin').should('exist');
    cy.contains('Feels like').should('exist');
    cy.contains('Humidity').should('exist');
    cy.contains('Pressure').should('exist');
    cy.contains('Wind Speed').should('exist');
  });

  it('should update the weather details when a new city is searched', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Enter city"]').type('Berlin');
    cy.get('button').contains('Search').click();
    cy.contains('Berlin').should('exist');
    cy.get('input[placeholder="Enter city"]').clear().type('London');
    cy.get('button').contains('Search').click();
    cy.contains('London').should('exist');
  });

  it('should handle multiple rapid searches correctly', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Enter city"]').type('Berlin');
    cy.get('button').contains('Search').click();
    cy.wait(500);
    cy.get('input[placeholder="Enter city"]').clear().type('London');
    cy.get('button').contains('Search').click();
    cy.wait(500);
    cy.get('input[placeholder="Enter city"]').clear().type('Paris');
    cy.get('button').contains('Search').click();
    cy.contains('Paris').should('exist');
  });


});