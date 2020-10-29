
import Page from './page';
import {get, post} from 'https';

class AdminPage extends Page {

    // Login Selectors
    get adminLoginUsername() { return $('#username'); }
    get adminLoginPassword() { return $('#password'); }
    get adminLoginButton() { return $('#doLogin'); }

    // Navigation
    get roomsLink() { return $('a[href="#/admin/"]'); }
    get reportsLink() { return $('a[href="#/admin/report"]'); }
    get brandingLink() { return $('a[href="#/admin/branding"]'); }
    get inboxIcon() { return $('.fa-inbox'); }
    get inboxLink() { return $('a[href="#/admin/messages"]'); }
    get inboxNotifications() { return $('.notification'); }

    // Rooms selectors
    get roomsHeaders() { return $$('.row .rowHeader'); }

    // Messages selectorts
    get messagesHeader() { return $$('.row .rowHeader'); }
    get messagesRows() { return $$('div[id*="message"]'); }

    // Modal Dialog
    get modalBase() { return $('.ReactModalPortal div[role="dialog"]'); }
    get modalClosebutton() { return this.modalBase.$('button[class*="btn"]'); }
    get modalFrom() { return this.modalBase.$$('.form-row')[0]; }
    get modalPhone() { return this.modalBase.$$('.form-row')[0]; }
    get modalEmail() { return this.modalBase.$$('.form-row')[1]; }
    get modalSubject() { return this.modalBase.$$('.form-row')[2]; }
    get modalMessage() { return this.modalBase.$$('.form-row')[3]; }

    openAdminPage() {
        console.log(`opening: ${browser.config.baseUrl}admin`);
        super.open(`${browser.config.baseUrl}admin`);

        browser.waitUntil( ()=> {
            return this.adminLoginButton.isExisting();
        }, {
            timeout: 5000,
            timeoutMsg: 'Admin page did not load'
        })
    }

    loginAdminPage(uName = 'admin', passwd = 'password') {
        this.adminLoginUsername.setValue(uName);
        this.adminLoginPassword.setValue(passwd);
        this.adminLoginButton.click();

        browser.waitUntil( ()=> {
            return this.roomsHeaders[0].isExisting();
        }, {
            timeout: 5000,
            timeoutMsg: 'Admin page did not load'

        });
    }

    openMessage(locator) {
        let msgId, i = 0;
        // console.log(`######## count of messages: ${this.messagesRows.length}`);
        for(i ; i < this.messagesRows.length; i++) {
            // console.info(this.messagesRows[i].getText());
            if(this.messagesRows[i].getText().includes(locator)) {
                msgId = this.messagesRows[i].getAttribute('id');
                // console.log(`found message on row: ${msgId}`);
                $(`#${msgId}`).click();

                browser.waitUntil( ()=> {
                    return this.modalBase.isExisting();
                }, {
                    timeout: 5000,
                    timeoutMsg: 'Message Modal did not open'
                });

                break; 
            }
        }

        return 0;
    }

    // API Functions

    loginAdminApi(uName = 'admin', passwd = 'passowrd') {
        let responseData, authToken;

        let postData = JSON.stringify({
            username: uName,
            password: passwd
        });

        const requestOptions = {
            hostname: browser.config.baseUrl,
            path: '/auth/login',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded, application/json',
                "Content-Length": Buffer.byteLength(postData)
            }
        };

        const req = post(requestOptions, (res)=> {
            let data = '';
            res.on('data', d => {
                console.log(`DATA: ${d}`);
                data += d;
            })
            res.on('end', () => {
                console.log('No more data in response.');
                console.log(data);
                return data;
            });
        });

        req.on('error', (e)=> {
            console.error(e.messagesRows)
        });
        req.write(postData);
        req.end();


        return authToken;
    }
}

export default new AdminPage()
