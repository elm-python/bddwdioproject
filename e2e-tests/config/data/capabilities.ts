import yargs from 'yargs/yargs';
const argv = yargs(process.argv.slice(2)).parseSync();
const os = require('os');

let opSys = os.platform();
if (opSys == "darwin") {
    opSys = "osx";
} else if (opSys == "win32" || opSys == "win64") {
    opSys = "windows";
}
const opSysVersion = os.release();


const capabilities = {
    chrome: {
        maxInstances: 4,
        browserName: 'chrome',
        acceptInsecureCerts: true,
      "goog:chromeOptions": { args: ["--no-sandbox", "--disable-gpu", "--headless", "--disable-dev-shm-usage", "--disable-infobars", "--disable-extensions", "--privileged", "--window-size=1920,1080"] },
        'cjson:metadata': {
            browser: {
                name: 'chrome',
                version: 'stable'
            },
            device: 'Development machine',
            platform: {
                name: opSys,
                version: opSysVersion
            }
        },
    },
    firefox: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ["--headless"],
            prefs: {
                'browser.download.folderList': 2,
                'browser.download.manager.closeWhenDone': true,
                'browser.download.manager.showWhenStarting': false,
                'browser.helperApps.alwaysAsk.force': false,
                'browser.download.manager.showAlertOnComplete': false,
                'browser.download.manager.useWindow': false,
                'browser.helperApps.neverAsk.saveToDisk': 'application/pdf,application/csv,text/plain,application/vnd.csv',
                'pdfjs.disabled': true
            },
        },
        maxInstances: 4,
        'cjson:metadata': {
            browser: {
                name: 'firefox',
                version: 'stable'
            },
            device: 'Development machine',
            platform: {
                name: opSys,
                version: opSysVersion
            }
        },
    },
    edge: {
        maxInstances: 4,
        browserName: 'edge',
        acceptInsecureCerts: true,
        "ms:edgeOptions": { "args": ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--disable-infobars", "--disable-extensions", "--privileged", "--headless"] },
        'cjson:metadata': {
            browser: {
                name: 'edge',
                version: 'stable'
            },
            device: 'Development machine',
            platform: {
                name: opSys,
                version: opSysVersion
            }
        },
    },

};

/**
 * Function to get required browser capability for protractor.
 * @returns Capability array.
 */
export const getCapabilities = () => {
    if (argv.browserName) {
        if (argv.browserName === 'chrome') {
            return [capabilities.chrome];
        }
        else if (argv.browserName === 'firefox') {
            return [capabilities.firefox];
        }
        else if (argv.browserName === "edge") {
            return [capabilities.edge];
        }
        throw new Error('Invalid browser name: ' + argv.browser);
    }
    return [capabilities.chrome];
}
