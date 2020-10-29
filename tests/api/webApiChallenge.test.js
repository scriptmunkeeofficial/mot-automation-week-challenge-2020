
import Page from '../../page_objects/page';
import MainPage from '../../page_objects/main.page';
import AdminPage from '../../page_objects/admin.page';

import {get, post} from 'https';

describe('Web API Challenge Test', () => {

    before('Initialize', ()=> {
    });

    beforeEach('Load Web UI', () => {
        MainPage.open(browser.config.baseUrl);
        if(MainPage.letMeHackButton.isExisting()) {
            MainPage.letMeHackButton.click();
        }

    });

    it('Beginner: GET Branding ', ()=> {
        let parsedData;

        get(`${browser.config.baseUrl}/branding/`, { headers: 'accept: */*' }, (res) => {

            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            let error;
            let rawData = '';

            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // Consume response data to free up memory
                res.resume();
                return;
            }
            res.setEncoding('utf8');
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    parsedData = JSON.parse(rawData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });

        browser.waitUntil( ()=> {
            return parsedData != undefined;
        }, { timeout: 5000, timeoutMsg: 'API response did not complete'} );

        // console.log(parsedData);
        expect(parsedData.hasOwnProperty('contact')).toBe(true);
        expect(parsedData.hasOwnProperty('description')).toBe(true);
        expect(parsedData.hasOwnProperty('logoUrl')).toBe(true);
        expect(parsedData.hasOwnProperty('map')).toBe(true);
        expect(parsedData.hasOwnProperty('name')).toBe(true);

    });

    it.skip('Intermediate: Room Creation', () => {
        let authResp;

        // TODO: authenticate 
        authResp = AdminPage.loginAdminApi();
        console.log(`token: ${authResp.token}`); 

        // TODO: create the room if it doesn't exist
        
        // TODO: validate the room was created

    });

    it.skip('Advanced: TBD', ()=> {

    });


})
