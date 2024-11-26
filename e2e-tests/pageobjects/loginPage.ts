import * as elmList from '../support/elementList';
import * as commonHelpers from '../support/commonHelpers';
const fs = require('fs-extra');
import * as waitFor from '../support/waitHelpers';
import { promisedExpect } from '../support/chai';
import cucumberJson from 'wdio-cucumberjs-json-reporter';

export class LoginPageObject {

get submitButton() {
    return $(elmList.SUBMIT_BTN);
}
get createAnAccountButton(){
    return $(elmList.CREATE_AN_ACCOUNT);
}
get inputFirstName(){
    return $(elmList.LOGIN_FIRSTNAME);
}
get inputLastName(){
    return $(elmList.LOGIN_LASTNAME);
}
get inputEmail(){
    return $(elmList.EMAIL_ADDRESS);
}
get inputPassword(){
    return $(elmList.LOGIN_PASSWORD);
}
get inputConfirmPassword(){
    return $(elmList.LOGIN_CONFIRM_PASSWORD);
}


/**
 * Click on login web element in global header.
 */
clickSubmitButton = async (): Promise<void> => {
    await commonHelpers.jsClickElm(elmList.SUBMIT_BTN)
}

/**
 * To enter firstName
 * @param firstName
 */
loginFirstName = async (value: string): Promise<void> => {
    await this.inputFirstName.clearValue();
    await browser.pause(500);
    await this.inputFirstName.setValue(value);
}

/**
 * To enter lastName
 * @param lastName
 */
loginLastName = async (value: string): Promise<void> => {
    await this.inputLastName.clearValue();
    await browser.pause(500);
    await this.inputLastName.setValue(value);
}

/**
 * To enter Email
 * @param inputEmail
 */
loginEmail = async (value: string): Promise<void> => {
    await this.inputEmail.clearValue();
    await browser.pause(500);
    await this.inputEmail.setValue(value);
}

/**
 * To enter password
 * @param password
 */
loginPassword = async (value: string): Promise<void> => {
    await this.inputPassword.clearValue();
    await browser.pause(500);
    await this.inputPassword.setValue(value);
}

/**
 * To enter confirmpassword
 * @param confirmpassword
 */
loginConfirmPassword = async (value: string): Promise<void> => {
    await this.inputConfirmPassword.clearValue();
    await browser.pause(500);
    await this.inputConfirmPassword.setValue(value);
}

/**
 * To click on submit in login popup.
 */
createAnAccount = async (): Promise<void> => {
    await waitFor.Element(elmList.LOGIN_SUBMIT_BUTTON);
    await commonHelpers.clickElm(await this.createAnAccountButton);
}

processLogin = async (changeEmail: boolean = false, forCheckout: boolean = true, specialCredsType: string = '', chainCheckout: boolean = false, shouldCloseCookie: boolean = true): Promise<void> => {
    if (shouldCloseCookie) {
    await commonHelpers.closeCookie()
    }
    await browser.pause(1000)
    await waitFor.Element(elmList.HOME_LOGIN_NAV);
    await this.clickLoginButton();
    await waitFor.UrlContains("/login");
    await waitFor.Element(elmList.LOGIN_SUBMIT_BUTTON);
    
    if (specialCredsType === '') {
        await this.setCredentials(changeEmail, forCheckout, chainCheckout);
    }
    else {
        await this.setAccTypeCredentials(specialCredsType);
    }
    await this.loginInput((globalThis as any).__vars[browser.sessionId + ".email"], (globalThis as any).__vars[browser.sessionId + ".password"]);
    console.log("Credentials: ",(globalThis as any).__vars[browser.sessionId + ".email"] + " " + (globalThis as any).__vars[browser.sessionId + ".password"]);
    cucumberJson.attach(`Email : ${(globalThis as any).__vars[browser.sessionId + ".email"]} `, 'text/plain');
    cucumberJson.attach(`Password : ${(globalThis as any).__vars[browser.sessionId + ".password"]} `, 'text/plain');
    
    await this.loginSubmit();
    await waitFor.loaderDisappear(15000);
    
    const ACCOUNT_NAV: string = elmList.HOME_MY_ACCOUNT_NAV;
    await waitFor.ElementVisible(ACCOUNT_NAV);
    await promisedExpect(await ($(ACCOUNT_NAV)).isExisting(), "Login failed1! Account navigation not visible!").to.be.true;
}
}