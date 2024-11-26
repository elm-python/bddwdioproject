import * as waitFor from './waitHelpers';
import * as geoLocHelpers from './geoLocHelpers';
import { expect } from 'chai';
import { promisedExpect } from './chai';



/**
 * Deletes browser cookies, session storage and local storage.
 */
export const deleteAllBrowserData = async (): Promise<any> => {
    // Promise take a max 1.5s to resolve
    return new Promise(async (resolve, reject) => {
        const timeout = setTimeout(() => {
            resolve(1);
        }, 1500);
        try {
            await browser.execute(`
            try {
                var cookies = document.cookie.split("; ");
                for (var c = 0; c < cookies.length; c++) {
                    var d = window.location.hostname.split(".");
                    while (d.length > 0) {
                        var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + d.join('.') + ' ;path=';
                        var p = location.pathname.split('/');
                        document.cookie = cookieBase + '/';
                        while (p.length > 0) {
                            document.cookie = cookieBase + p.join('/');
                            p.pop();
                        };
                        d.shift();
                    }
                }
            } catch(e){}
            `);
            await browser.deleteCookies();
            await browser.execute('try{window.sessionStorage.clear();} catch(e){}');
            await browser.execute('try{window.localStorage.clear();} catch(e){}');
            await browser.execute('try{document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/"); });} catch(e){}');
        } catch (error) { }

        clearTimeout(timeout);
        resolve(1);
    });
};

/**
 * Get current domain name.
 * Default domain is "com"
 */
export const getCurrentDomain = (): string => {
    let domain: string = "com";
    if ((globalThis as any).__vars[browser.sessionId + ".domainName"]) {
        if ((globalThis as any).__vars[browser.sessionId + ".domainName"] !== "") {
            domain = (globalThis as any).__vars[browser.sessionId + ".domainName"];
        }
    }
    return domain;
}

/**
 * Get current environment name.
 * @returns dev | stage | prod
 */
export const getEnv = (): string => {
    const baseUrl: string = browser.options.baseUrl!;
    let env: string = 'stage';
    if (baseUrl.includes("://magento")) {
        env = 'local';
    }
    return env;
}



/**
 * Plain JavaScript function to click on an element.
 * @param selector Selector value as string. Ex: div[class="name"]
 * @param elmNo Default 0.
 */
export const jsClickElm = async (selector: string, elmNo: number = 0): Promise<void> => {
    await browser.execute(`document.querySelectorAll('${selector}')[${elmNo}].click()`).catch((err: Error) => { throw new Error(`Unable to click: [${selector}]`); });
}
/**
 * Get the first element visible in viewport/screen.
 * @param elmName Element Name. Value = 'input[class="wishlists__input"]'.
 * @returns Element Number
 */
export const getVisibleElementNo = async (elmName: string): Promise<number> => {
    await waitFor.Element(elmName);
    await promisedExpect((await $$(elmName))[0].isExisting(), `Element [${elmName}] not present!`).to.eventually.be.true;
    const elmCount: number = await $$(elmName).length;
    let visibleElmNo: number = 0;
    for (let i: number = 0; i < elmCount; ++i) {
        const isElmDisplayed = await (await $$(elmName))[i].isDisplayed();
        if (isElmDisplayed) {
            visibleElmNo = i;
            break;
        }
    }
    await promisedExpect((await $$(elmName))[visibleElmNo].isDisplayed(), `Element [${elmName}] not visible!`).to.eventually.be.true;
    return visibleElmNo;
}

/**
 * Retrieve current page URL.
 * @param lowerCase To get URl in lowercase. Default: false
 * @returns 
 */
export const getPageUrl = async (lowerCase: boolean = false): Promise<string> => {
    let currentUrl = await browser.getUrl();
    return lowerCase ? currentUrl.toLowerCase() : currentUrl;
}

/**
 * Chai assertion to check if user is navigated to given link.
 * @param link URL or part of URL. Ex: "/account"
 */
export const checkRedirectionToLink = async (link: string) => {
    await waitFor.waitForPageLoad(20000);
    await waitFor.UrlContains(link);
    const url: string = await getPageUrl();
   
    //await browser.pause(2000)
    
    expect(url.includes(link), `${link} does not exists in URL ${url}`).to.be.true;
}