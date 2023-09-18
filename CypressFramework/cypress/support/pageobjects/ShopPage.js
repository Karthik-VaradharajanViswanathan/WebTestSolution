let count = 0;
let randomNumber = 0;
let overallShopItems = 0;
let shoppingItemText = "";
const ranNum = [];

class ShopPage {
  getShopItems() {
    return cy.get(".columns-3 ul li div a[rel='nofollow']");
  }

  viewMyCart() {
    return cy.get('a[href="https://cms.demo.katalon.com/cart/"]');
  }

  getRandomNumber(max) {
    randomNumber = Math.floor(Math.random() * max) + 1;
    return randomNumber;
  }

  getLengthOfShoppingItems() {
    cy.get(".columns-3 ul li div a[rel='nofollow']")
      .its("length")
      .should("eq", 12)
      .then((length) => {
        cy.log(`Number of shop items are: ${length}`);
        cy.wait(1000);
        overallShopItems = length;
      });
    return overallShopItems;
  }

  getShoppingItemsText() {
    this.getShopItems()
      .eq(randomNumber)
      .invoke("text")
      .then((text) => {
        cy.log(`Text from the element: ${text}`);
        shoppingItemText = text;
      });
    return shoppingItemText;
  }

  ClickAddCartItems() {
    this.getLengthOfShoppingItems();
    this.getRandomNumber(overallShopItems - 1);
    if (count < 4) {
      this.getShopItems()
        .eq(randomNumber)
        .invoke("text")
        .then((text) => {
          cy.log(`Text from the element: ${text}`);
          if (text.includes("Add to cart") && !ranNum.includes(randomNumber)) {
            ranNum.push(randomNumber);
            this.getShopItems().eq(randomNumber).click();
            count++;
            this.ClickAddCartItems(); // Recursively call the function with an incremented count
          } else {
            cy.log(
              "Add to cart item is not available or it's already been added"
            );
            this.ClickAddCartItems(); // Retry with the same count
          }
        });
    }
  }
}

export default ShopPage;
