/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe("bing transalator", function () {
  it("verify the language", function () {
    cy.visit(Cypress.env("url"));
    // cy.visit("https://www.bing.com/translator");
    cy.get("#tta_input_ta").type("Hola");
    cy.wait(10000);

    cy.xpath("(//td/div/div/select/optgroup[1])[1]").contains(
      "Spanish (detected)"
    );
  });
});
