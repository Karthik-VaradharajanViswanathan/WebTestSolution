Feature: To check the user ability to add and remove an item from cart

    Application Katalon Shop
    
    Scenario: Add random items to the cart and remove the lowest price item from the cart
    Given I add four random items to my cart
    When I view my cart
    Then I find total four items listed in my cart
    When I search for lowest price item
    Then I am able to remove the lowest price item from my cart
    Then I am able to verify three items in my cart