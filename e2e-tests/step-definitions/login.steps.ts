import { Given,When, Then } from '@cucumber/cucumber';
import * as elmList from '../support/elementList';
import * as waitFor from '../support/waitHelpers';
import * as commonHelpers from '../support/commonHelpers';
import * as geoLocHelpers from '../support/geoLocHelpers';
import { promisedExpect } from '../support/chai';
import { LoginPageObject } from '../pageobjects/loginPage';

const loginObj: LoginPageObject = new LoginPageObject();


Then('user is redirected to {string} page', { timeout: 2 * 30000 }, async (link) => {
    await commonHelpers.checkRedirectionToLink(link);
});

When('user enters valid {string} {string}', { timeout: 2 * 30000 }, async (type, value) => {
    if (type == "first name"){
        await loginObj.loginFirstName(value);
    }
    else if (type == "last name") {
        await loginObj.loginLastName(value);
    }
    else if (type == "email address") {
        await loginObj.loginEmail(value);
    }
    else if (type == "password") {
        await loginObj.loginPassword(value);
    }
    else if (type == "confirm password") {
        await loginObj.loginConfirmPassword(value);
    }
});

When('user clicks on Create an Account link ', { timeout: 2 * 60000 }, async () => {
    await promisedExpect((await $(elmList.CREATE_AN_ACCOUNT)).isExisting()).to.eventually.equal(true);
    await loginObj.createAnAccount();
});


Given('the user goes to the magento sign up page using a browser', { timeout: 2 * 140000 }, async () => {
    const baseUrl = browser.options.baseUrl!;
    const env = await commonHelpers.getEnv();
    console.log(`\n===>  You are testing this web site:  ${baseUrl}`);
    await browser.url(baseUrl);
    const pageTitle: string = await browser.getTitle(); 
    const isLoggedInLink: boolean = await (await $(elmList.CREATE_AN_ACCOUNT)).isExisting();
    
    await promisedExpect(await browser.getTitle()).to.include(titleforEnv[env])

});

Then('verify user is able to create an account successfully', { timeout: 2 * 45000 }, async () => {
    await waitFor.UrlContains('/account');
    const url: string = await commonHelpers.getPageUrl();
    expect(url.includes('/account')).to.be.true;
});
