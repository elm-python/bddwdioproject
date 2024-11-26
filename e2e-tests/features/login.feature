@p0 @login @SignUp-flow
Feature: Login scenarios

  Background: Signing up into magento software testing
    Given the user goes to the magento sign up page using a browser

  @SignUp
  Scenario: As a user, I want to Sign up in to Magento Site
    When user clicks on Create an Account link 
    Then user is redirected to "/account/create" page
    When user enter valid "first name" "value"
    And user enter valid "last name" "value"
    And user enter valid "email address" "value"
    And user enter valid "password"
    And user enter valid "confirm password"
    Then verify user is able to create an account successfully