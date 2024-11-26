import * as EC from 'wdio-wait-for';

/**
 * Function to wait for browser to be navigated to expected URL.
 * @param expectedUrl Expected URL
 * @param timeout Default: 30000
 */
export const Url = async (expectedUrl: string, timeout: number = 30000): Promise<void> => {
    try {
        await browser.waitUntil(async () => {
            const baseUrl = await browser.getUrl();
            return baseUrl === expectedUrl;
        },
            { timeout, timeoutMsg: '[URL] Timeout!!! Condition not satisfied.' });
    } catch (err) { }
}

/**
 * Function to wait for browser to be navigated to the URL which contains the expected URL.
 * @param expectedUrl Expected URL
 * @param timeout Default: 30000
 */
export const UrlContains = async (expectedUrl: string, timeout: number = 30000): Promise<void> => {
    try {
        await browser.waitUntil(async () => (await browser.getUrl()).includes(expectedUrl),
            { timeout, timeoutMsg: '[URL] Timeout!!! Condition not satisfied.' });
    } catch (err) { }
}

/**
 * Function to wait for an element to be present.
 * @param expectedElement Element identifier string
 * @param elmNo Element Number. Default: 0
 * @param xpath Is element string is an xpath. Default: false
 * @param timeout Default: 10000
 */
export const Element = async (expectedElement: string, elmNo: number = 0, xpath = false, timeout: number = 10000): Promise<void> => {
    try {
        await (await $$(expectedElement))[elmNo].waitForExist({ timeout: timeout });
    } catch (error) { }
}

/**
 * Function to wait for an element to be visible.
 * @param expectedElement Element identifier string
 * @param elmNo Element Number. Default: 0
 * @param xpath Is element string is an xpath. Default: false
 * @param timeout Default: 10000
 */
export const ElementVisible = async (expectedElement: string, elmNo: number = 0, xpath = false, timeout: number = 10000): Promise<void> => {
    try {
        await (await $$(expectedElement))[elmNo].waitForDisplayed({ timeout: timeout });
    } catch (error) { }
}

/**
 * Function to wait for an element to be enabled.
 * @param expectedElement Element identifier string
 * @param elmNo Element Number. Default: 0
 * @param xpath Is element string is an xpath. Default: false
 * @param timeout Default: 10000
 */
export const ElementEnabled = async (expectedElement: string, elmNo: number = 0, xpath = false, timeout: number = 10000): Promise<void> => {
    try {
        await (await $$(expectedElement))[elmNo].waitForEnabled({ timeout: timeout });
    } catch (error) { }
}

/**
 * Function to wait for an element to disappear.
 * @param elm Element identifier string
 * @param elmNo Element number 
 * @param timeout Default: 10000
 */
export const ElementNotVisible = async (elm: string, elmNo = 0, timeout = 10000): Promise<void> => {
    try {
        await (await $$(elm))[elmNo].waitForDisplayed({ timeout: timeout, reverse: true });
    } catch (error) { }
}
