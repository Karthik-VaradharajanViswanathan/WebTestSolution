/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ShopPage from "../../../support/pageobjects/ShopPage";
import CartPage from "../../../support/pageobjects/CartPage";
import CheckoutPage from "../../../support/pageobjects/CheckoutPage";

let lowestPrice = null;

Given("I add four random items to my cart", () => {
  const shopPage = new ShopPage();
  cy.visit(Cypress.env("url"));
  shopPage.ClickAddCartItems(); //working code but can handle the duplicate cart item
});

When("I view my cart", () => {
  const shopPage = new ShopPage();
  shopPage.viewMyCart().eq(1).click();
});

Then("I find total four items listed in my cart", () => {
  const cartPage = new CartPage();
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
        prices.sort((a, b) => a - b);
      });

    cy.log("The sorted price from lowest to highest is :", prices);
    lowestPrice = prices[0];
    cy.log("The lowest sorted price is :", lowestPrice);
  });
});

Then("I am able to remove the lowest price item from my cart", () => {
  cy.contains("span.woocommerce-Price-amount.amount", lowestPrice)
    .parents("span")
    .parents("td")
    .next()
    .click();
});

Then("I am able to verify three items in my cart", () => {
  const cartPage = new CartPage();
  cartPage.getFinalSum();
});
