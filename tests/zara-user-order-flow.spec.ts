import { test, expect } from '../app/fixtures/page-fixtures';
import { faker } from '@faker-js/faker';
import validationMessages from '../app/fixtures/validation-error-messages.json' assert {type: 'json'};
import * as RegistrationData from '../app/helper/registrationData';


test.describe('Zara user journey: from cookie modal to registration', () => {
  test('TC-1 Search item by name and add all sizes', async ({ mainPage, cartPage, basePageWithCookies, basePage }) => {
    const itemName = "Boots"
    const minSizes = 4

    await basePageWithCookies.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
  });

  test('TC-2 Remove every second item from shopping bag', async ({ mainPage, cartPage, basePageWithCookies, basePage }) => {
    const itemName = "Dress"
    const minSizes = 4

    await basePageWithCookies.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
  });

  test('TC-3 Check the error message for incorrectly filled Email field in registration form', async ({ mainPage, cartPage, basePageWithCookies, basePage, registerPage, personalDetailsPage }) => {
    const itemName = 'Jeans';
    const minSizes = 5;
    const registrationData = RegistrationData.generateInvalidEmailData();

    await basePageWithCookies.clickSearchButton();
    await mainPage.fillSearchField(itemName);
    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();

    await personalDetailsPage.fillRegistrationForm({ ...registrationData, email: '' });
    await personalDetailsPage.clickCreateAccountButton();
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidEmailMessage);

    await personalDetailsPage.fillRegistrationForm(registrationData);
    await personalDetailsPage.clickCreateAccountButton();
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.invalidFormatEmailMessage);
  });

  test('TC-4 Check the error message for incorrectly filled Password field in registration form', async ({ mainPage, cartPage, basePageWithCookies, basePage, registerPage, personalDetailsPage }) => {
    const itemName = 'Shirt';
    const minSizes = 4;
    const registrationData = RegistrationData.generateInvalidPasswordData();

    await basePageWithCookies.clickSearchButton();
    await mainPage.fillSearchField(itemName);
    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();

    await personalDetailsPage.fillRegistrationForm({ ...registrationData, password: '' });
    await personalDetailsPage.clickCreateAccountButton();
    expect(await personalDetailsPage.getErrorMessage()).toEqual(
      validationMessages.requiredInvalidPasswordMessage
    );

    await personalDetailsPage.fillRegistrationForm(registrationData);
    await personalDetailsPage.clickCreateAccountButton();
    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.invalidFormatPasswordMessage);
  });

  test('TC-5 Check the error message for incorrectly filled Name field in registration form', async ({ mainPage, cartPage, basePageWithCookies, basePage, registerPage, personalDetailsPage }) => {
    const itemName = 'Top';
    const minSizes = 4;
    const registrationData = RegistrationData.generateMissingFieldData('name');

    await basePageWithCookies.clickSearchButton();
    await mainPage.fillSearchField(itemName);
    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();

    await personalDetailsPage.fillRegistrationForm(registrationData);
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidNameMessage);
  });

  test('TC-6 Check the error message for incorrectly filled Surname field in registration form', async ({ mainPage, cartPage, basePageWithCookies, basePage, registerPage, personalDetailsPage }) => {
    const itemName = 'Sandals';
    const minSizes = 4;
    const registrationData = RegistrationData.generateMissingFieldData('surname');

    await basePageWithCookies.clickSearchButton();
    await mainPage.fillSearchField(itemName);
    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);

    await basePage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
    await registerPage.clickRegisterButton();

    await personalDetailsPage.fillRegistrationForm(registrationData);
    await personalDetailsPage.clickCreateAccountButton();

    expect(await personalDetailsPage.getErrorMessage()).toEqual(validationMessages.requiredInvalidSurnameMessage);
  });
});