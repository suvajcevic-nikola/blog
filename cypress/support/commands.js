Cypress.Commands.add('visitHomePage', () => {
  cy.visit("http://localhost:3000");
});

Cypress.Commands.add('checkElementExists', (selector) => {
  cy.get(selector).should("exist");
});

Cypress.Commands.add('clickFirstChild', (selector) => {
  cy.get(`${selector} > :nth-child(1)`).click();
});

Cypress.Commands.add('checkUrlIncludes', (string) => {
  cy.url().should("include", string);
});

Cypress.Commands.add('typeIntoFormField', (formSelector, fieldSelector, text) => {
  cy.get(formSelector).get(fieldSelector).type(text);
});