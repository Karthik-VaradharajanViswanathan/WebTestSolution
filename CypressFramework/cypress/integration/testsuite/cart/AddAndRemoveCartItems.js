/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ShopPage from "../../../support/pageobjects/ShopPage";
import CartPage from "../../../support/pageobjects/CartPage";
//import CheckoutPage from "../../../support/pageobjects/CheckoutPage";

let lowestPrice = null;
const shopPage = new ShopPage();
const cartPage = new CartPage();
Given("I add four random items to my cart", () => {
  cy.visit(Cypress.env("url"));
  shopPage.ClickAddCartItems(); //working code but can handle the duplicate cart item
});

When("I view my cart", () => {
  shopPage.viewMyCart().eq(1).click();
});

Then("I find total four items listed in my cart", () => {
  let totalSum = 0;
  cartPage
    .getCartSum()
    .each(($inputElement) => {
      cy.wrap($inputElement)
        .invoke("attr", "value")
        .then((value) => {
          const numberValue = parseInt(value, 10);
          if (!isNaN(numberValue)) {
            totalSum += numberValue;
          }
        });
    })
    .then(() => {
      cy.log(
        `We have successfully added four items as per the requirement : Sum of cart items is  ${totalSum}`
      );
      cy.wrap(totalSum).should("eq", 4);
    });
});

When("I search for lowest price item", () => {
  let prices = [];
  // Get all the elements with prices
  cy.get(".product-subtotal span").each(($element) => {
    cy.wrap($element)
      .invoke("text")
      .then((priceText) => {
        // Remove the dollar sign and any other non-numeric characters
        const numericText = priceText.replace(/[^0-9.]/g, "");

        // Convert the numeric text to a number
        const price = parseFloat(numericText);

        // Check if it's a valid number and greater than 0
        if (!isNaN(price) && price > 0) {
          prices.push(price);
        }

        // Get the Lowest Price Item
        lowestPrice = Math.min(...prices);
        cy.log("The lowest price item :", lowestPrice);
      });
  });
});

Then("I am able to remove the lowest price item from my cart", () => {
  cy.contains("span.woocommerce-Price-amount.amount", lowestPrice)
    .parent() // Yields parent class="product-price"
    .siblings(".product-remove") // Yields sibling class="product-remove"
    .find("a")
    .scrollIntoView()
    .click({ force: true }); // Clicks <a> with class="remove"
});

Then("I am able to verify three items in my cart", () => {
  cartPage.getFinalSum();
});
