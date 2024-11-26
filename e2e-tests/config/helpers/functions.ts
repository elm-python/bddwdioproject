'use strict';

import yargs from 'yargs/yargs';
const argv = yargs(process.argv.slice(2)).parseSync();
import Jimp from 'jimp';
const { generate } = require('multiple-cucumber-html-reporter');
import * as commonHelper from '../../support/commonHelpers'
const featureSet = require('../data/featureSet').data;
const smokeSetTags = require('../data/smokeSet').data;
import fs from 'fs';


/**
 * Resize + optimize images.
 *
 * @param Array images An array of images paths.
 * @param Number width A number value of width e.g. 1920.
 * @param Number height Optional number value of height e.g. 1080.
 * @param Number quality Optional number value of quality of the image e.g. 90.
 */
export const optimizeImage = async (imgPath: string, width = Jimp.AUTO, height: number = 768, quality: number = 90): Promise<void> => {
    const image = await Jimp.read(imgPath);
    await image.resize(width, height);
    await image.quality(quality);
    await image.writeAsync(imgPath);
};

/**
 * Function to generate cucumber HTML report.
 */
export const generateReport = async (): Promise<void> => {
    if (fs.existsSync('./reports')) {
        if (fs.existsSync('./reports/report')) {
            fs.rmdirSync('./reports/report', { recursive: true });
        }
        await generate({
            jsonDir: './reports/json/',
            reportPath: './reports/report/',
            pageTitle: 'HTML Report',
            reportName: `Automation report for the site: Desktop () Website: ${getBaseUrl(argv.env)}`,
            displayDuration: true,
            // displayReportTime:true,
        });
    }
}


/**
 * Get the site url based on the domain tag, if any.
 * Default domain: .com
 * Default Environment(env): stage
 */
export const getBaseUrl = (env: any) => {
    return `https://${env}.softwaretestingboard.com`;
}

export const getBrowserName = () => {
    let browser = 'chrome';
    if (argv.browserName) {
        if (argv.browserName === 'firefox') {
            browser = 'firefox'
        }
        else if (argv.browserName === 'edge') {
            browser = 'edge';
        }
        else if (argv.browserName === 'safari') {
            browser = 'safari';
        }
        else if (argv.browserName === 'ie') {
            browser = 'ie';
        }
    }
    return browser;
}
