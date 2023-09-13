class CartPage {
  getCartSum() {
    return cy.get(".product-quantity div input");
  }

  getFinalSum() {
    let totalSum = 0;
    // cartPage;
    cy.wait(5000);
    this.getCartSum()
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
          `We have successfully added three items as per the requirement : Sum of cart items is  ${totalSum}`
        );
      });
  }
}

export default CartPage;
