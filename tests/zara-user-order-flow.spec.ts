import { MainPage } from '../app/pages/MainPage';
import { CartPage } from '../app/pages/CartPage';
import { test } from '../app/fixtures/cookieFixture';
import { expect } from '@playwright/test';
import { RegisterPage } from '../app/pages/RegisterPage';
import { PersonalDetailsPage } from '../app/pages/PersonalDetailsPage';
import { faker } from '@faker-js/faker';
import validationMessages from '../app/fixtures/validation-error-messages.json' assert {type: 'json'};
import { launchStealthPage } from '../app/Utils/stealthBrowser';

test.describe('Zara user journey: from cookie modal to registration', () => {

  test('TC-1 Search item by name and add all sizes', async () => {
   const page = await launchStealthPage();
    const mainPage = new MainPage(page);
    const cartPage = new CartPage(page);
    const itemName = "Boots"
    const minSizes = 4


    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);
    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
  });

  test('TC-2 Remove every second item from shopping bag', async () => {
    const page = await launchStealthPage();
    const mainPage = new MainPage(page);
    const cartPage = new CartPage(page);
    const itemName = "Dress"
    const minSizes = 6


    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
  });

  test.skip('TC-3 Check the error message for incorrectly filled Email field in registration form', async ({ pageWithCookies}) => {
    const mainPage = new MainPage(pageWithCookies);
    const cartPage = new CartPage(pageWithCookies);
    const registerPage = new RegisterPage(pageWithCookies);
    const personalDetailsPage = new PersonalDetailsPage(pageWithCookies);
    const itemName = "Jeans"
    const minSizes = 5
    const invalidEmail1 = faker.internet.email().split('@')[0] + 'gmail.com';
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = faker.string.alpha({ length: 4, casing: 'mixed' }) + faker.string.numeric(4);

    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.nameField.fill(firstName);
    await personalDetailsPage.surnameField.fill(lastName);
    await personalDetailsPage.passwordField.fill(password);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();
    
    console.log(await personalDetailsPage.getErrorMessage());
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidEmailMessage);
    
    await personalDetailsPage.emailField.fill(invalidEmail1);
    await personalDetailsPage.clickCreateAccountButton();
    
    console.log(await personalDetailsPage.getErrorMessage());
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.invalidFormatEmailMessage);
  });

   test.skip('TC-4 Check the error message for incorrectly filled Password field in registration form', async ({ pageWithCookies }) => {
    const mainPage = new MainPage(pageWithCookies);
    const cartPage = new CartPage(pageWithCookies);
    const registerPage = new RegisterPage(pageWithCookies);
    const personalDetailsPage = new PersonalDetailsPage(pageWithCookies);
    const itemName = "Shirt"
    const minSizes = 4
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
   const invalidPassword = faker.string.alphanumeric(5);

    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.nameField.fill(firstName);
    await personalDetailsPage.surnameField.fill(lastName);
    await personalDetailsPage.emailField.fill(email);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();
    
    console.log(await personalDetailsPage.getErrorMessage());
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidPasswordMessage);
    
    await personalDetailsPage.passwordField.fill(invalidPassword);
    await personalDetailsPage.clickCreateAccountButton();
    
    console.log(await personalDetailsPage.getErrorMessage());
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.invalidFormatPasswordMessage);
  });

  test.skip('TC-5 Check the error message for incorrectly filled Name field in registration form', async ({ pageWithCookies }) => {
    const mainPage = new MainPage(pageWithCookies);
    const cartPage = new CartPage(pageWithCookies);
    const registerPage = new RegisterPage(pageWithCookies);
    const personalDetailsPage = new PersonalDetailsPage(pageWithCookies);
    const itemName = "Boots"
    const minSizes = 5
    const email = faker.internet.email();
    const password = faker.string.alpha({ length: 4, casing: 'mixed' }) + faker.string.numeric(4);
    const lastName = faker.person.lastName();

    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.emailField.fill(email);
    await personalDetailsPage.passwordField.fill(password);
    await personalDetailsPage.surnameField.fill(lastName);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();
    
    console.log(await personalDetailsPage.getErrorMessage());
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidNameMessage);
  });

  test.skip('TC-6 Check the error message for incorrectly filled Surname field in registration form', async ({ pageWithCookies }) => {
    const mainPage = new MainPage(pageWithCookies);
    const cartPage = new CartPage(pageWithCookies);
    const registerPage = new RegisterPage(pageWithCookies);
    const personalDetailsPage = new PersonalDetailsPage(pageWithCookies);
    const itemName = "Sandals"
    const minSizes = 4
    const email = faker.internet.email();
    const password = faker.string.alpha({ length: 4, casing: 'mixed' }) + faker.string.numeric(4);
    const name = faker.person.firstName();

    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.emailField.fill(email);
    await personalDetailsPage.passwordField.fill(password);
    await personalDetailsPage.nameField.fill(name);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();
    
    console.log(await personalDetailsPage.getErrorMessage());
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidSurnameMessage);
  });
});;