import { test, expect } from '../app/fixtures/page-fixtures';
import { faker } from '@faker-js/faker';
import validationMessages from '../app/fixtures/validation-error-messages.json' assert {type: 'json'};
import { generateStrongPassword } from '../app/helper/generateStrongPassword';


test.describe('Zara user journey: from cookie modal to registration', () => {
  test('TC-1 Search item by name and add all sizes', async ({ mainPageWithCookies, cartPage, basePage }) => {
    const itemName = "Boots"
    const minSizes = 4

    await basePage.clickSearchButton();
    await mainPageWithCookies.fillSearchField(itemName);

    const added = await mainPageWithCookies.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
  });

  test('TC-2 Remove every second item from shopping bag', async ({ mainPageWithCookies, cartPage, basePage }) => {
    const itemName = "Dress"
    const minSizes = 4

    await basePage.clickSearchButton();
    await mainPageWithCookies.fillSearchField(itemName);

    const added = await mainPageWithCookies.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
  });

  test('TC-3 Check the error message for incorrectly filled Email field in registration form', async ({ mainPageWithCookies, cartPage, basePage, registerPage, personalDetailsPage }) => {
    const itemName = "Jeans"
    const minSizes = 5
    const invalidEmail1 = faker.internet.email().split('@')[0] + 'gmail.com';
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = generateStrongPassword();

    await basePage.clickSearchButton();
    await mainPageWithCookies.fillSearchField(itemName);

    const added = await mainPageWithCookies.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.nameField.fill(firstName);
    await personalDetailsPage.surnameField.fill(lastName);
    await personalDetailsPage.passwordField.fill(password);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidEmailMessage);

    await personalDetailsPage.emailField.fill(invalidEmail1);
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.invalidFormatEmailMessage);
  });

  test('TC-4 Check the error message for incorrectly filled Password field in registration form', async ({ mainPageWithCookies, cartPage, basePage, registerPage, personalDetailsPage }) => {
    const itemName = "Shirt"
    const minSizes = 4
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const invalidPassword = faker.string.alphanumeric(5);

    await basePage.clickSearchButton();
    await mainPageWithCookies.fillSearchField(itemName);

    const added = await mainPageWithCookies.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.nameField.fill(firstName);
    await personalDetailsPage.surnameField.fill(lastName);
    await personalDetailsPage.emailField.fill(email);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidPasswordMessage);

    await personalDetailsPage.passwordField.fill(invalidPassword);
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.invalidFormatPasswordMessage);
  });

  test('TC-5 Check the error message for incorrectly filled Name field in registration form', async ({ mainPageWithCookies, cartPage, basePage, registerPage, personalDetailsPage }) => {
    const itemName = "Top"
    const minSizes = 4
    const email = faker.internet.email();
    const lastName = faker.person.lastName();
    const password = generateStrongPassword();
    const phoneNumber = '2' + faker.string.numeric(9);

    await basePage.clickSearchButton();
    await mainPageWithCookies.fillSearchField(itemName);

    const added = await mainPageWithCookies.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.emailField.fill(email);
    await personalDetailsPage.passwordField.fill(password);
    await personalDetailsPage.surnameField.fill(lastName);
    await personalDetailsPage.phoneNumberInputField.fill(phoneNumber);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidNameMessage);
  });

  test('TC-6 Check the error message for incorrectly filled Surname field in registration form', async ({ mainPageWithCookies, cartPage, basePage, registerPage, personalDetailsPage }) => {
    const itemName = "Sandals"
    const minSizes = 4
    const email = faker.internet.email();
    const name = faker.person.firstName();
    const password = generateStrongPassword();

    await basePage.clickSearchButton();
    await mainPageWithCookies.fillSearchField(itemName);

    const added = await mainPageWithCookies.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();
    await personalDetailsPage.emailField.fill(email);
    await personalDetailsPage.passwordField.fill(password);
    await personalDetailsPage.nameField.fill(name);
    await personalDetailsPage.checkPrivacyCheckbox();
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidSurnameMessage);
  });
});