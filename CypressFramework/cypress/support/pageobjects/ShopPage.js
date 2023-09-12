let count = 0;
let randomNumber = 0;
class ShopPage {
  getShopItems() {
    return cy.get(".columns-3 ul li div a[rel='nofollow']");
  }

  viewMyCart() {
    return cy.get('a[href="https://cms.demo.katalon.com/cart/"]');
  }

  ClickAddCartItems() {
    cy.get(".columns-3 ul li div a[rel='nofollow']")
      .its("length")
      .should("eq", 12)
      .then((length) => {
        cy.log(`Number of shop items are: ${length}`);
        cy.wait(3000);

        randomNumber = Math.floor(Math.random() * length) + 1;
        if (count < 4) {
          if (Number(randomNumber) === 12) {
            randomNumber = randomNumber - 1;
          }
          this.getShopItems()
            .eq(randomNumber)
            .invoke("text")
            .then((text) => {
              cy.log(`Text from the element: ${text}`);
              if (text.includes("Add to cart")) {
                this.getShopItems().eq(randomNumber).click();
                count++;
                this.ClickAddCartItems(); // Recursively call the function with an incremented count
              } else {
                cy.log("Add to cart is not available");
                this.ClickAddCartItems(); // Retry with the same count
              }
            });
        }
      });
  }
}

export default ShopPage;
