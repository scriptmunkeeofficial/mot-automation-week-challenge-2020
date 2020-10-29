
import MainPage from '../page_objects/main.page';
import AdminPage from '../page_objects/admin.page';

describe('Web UI Challenge', () => {

    before('Initialize', ()=> {
    });

    beforeEach('Load Web UI', () => {
        MainPage.open(browser.config.baseUrl);
        if(MainPage.letMeHackButton.isExisting()) {
            MainPage.letMeHackButton.click();
        }

    });

    /**
     * Beginner:
     * Create an automated test that completes the contact us form on the homepage, submits it, and asserts that the form was completed successfully.
     */
    it('Beginner Challenge - Complete Contact Us form', () => {
        
        let cName = 'Test Name';
        let cEmail = 'test@test.net';
        let cPhone = '1-976-555-1212';
        let cSubject = 'Looking to get more information about MoT';
        let cMessage = 'I like the challenge and think it could for sure help the beginners';

        MainPage.contactUsName.waitForExist();
        MainPage.contactUsName.scrollIntoView( {'block': 'center' } );
        
        // Filling in the form
        MainPage.contactUsName.setValue(cName);
        MainPage.contactUsEmail.setValue(cEmail);
        MainPage.contactUsPhoneNumber.setValue(cPhone);
        MainPage.contactUsSubject.setValue(cSubject);
        MainPage.contactUsMessage.setValue(cMessage);
        MainPage.contactUsSubmitButton.click();

        browser.waitUntil( ()=> {
            return MainPage.contactUsForm.isExisting() != true;
        }, { timeout: 5000, timeoutMsg: 'Contact Form did not get replaced'} );

        expect(MainPage.contactUsResponseTitle).toHaveText(`Thanks for getting in touch ${cName}!`);
        expect(MainPage.contactUsResponseBodyLines[0]).toHaveText('We\'ll get back to you about');
        expect(MainPage.contactUsResponseBodyLines[1]).toHaveText(cSubject);
        expect(MainPage.contactUsResponseBodyLines[2]).toHaveText('as soon as possible.');

    });

    /**
     * Intermediate:
     * Create an automated test that reads a message on the admin side of the site.
     *
     * You’ll need to trigger a message in the first place, login as admin, open that specific message and validate its contents.
     */
    it('Intermediate', ()=> {
        let name = 'aaaaaaa';
        let email = 'bbbbb@bbbbbb.bbb';
        let phone = '987-654-4321';
        let sub = 'this is a test subject';
        let msg = 'sending you a message of support';

        MainPage.sendContactUsMessage(name, email, phone, sub, msg);

        AdminPage.openAdminPage();

        if(AdminPage.adminLoginUsername.isExisting()) {
            AdminPage.loginAdminPage();
        } else { 
            browser.waitUntil( ()=> {
                return AdminPage.roomsHeaders[0].isExisting();
            }, {
                timeout: 5000,
                timeoutMsg: 'Admin page did not load'

            });
        }

        expect(AdminPage.inboxNotifications).toBeExisting()

        AdminPage.inboxLink.click();
        browser.waitUntil( ()=> { 
            return AdminPage.messagesRows.length > 0;
        }, {
            timeout: 5000,
            timeoutMsg: 'Messages page did not load'
        });

        expect(browser).toHaveUrlContaining('messages')

        AdminPage.openMessage(name);

        expect(AdminPage.modalFrom).toHaveTextContaining(name);
        expect(AdminPage.modalPhone).toHaveTextContaining(phone);
        expect(AdminPage.modalEmail).toHaveTextContaining(email);
        expect(AdminPage.modalSubject).toHaveTextContaining(sub);
        expect(AdminPage.modalMessage).toHaveTextContaining(msg);

    });

    /**
     * Advanced:
     * Create an automated test where a user successfully books a room from the homepage.
     *
     * You’ll have to click ‘Book this Room’, drag over dates you wish to book, complete the required information and submit the booking.
     */
    it.only('Advanced', ()=> {

        // click on book this room button
        // filling Pii (fname, lname, email, phone)
        // calenar date objects suck. Might have to go by p text
        // Drag & Drop date selection ( which are off by a day visuall time )
        // will have to consider if selected dates are 
        // Validate modal dialog for selected dates
        //
        // Test Directive
        //  1. find current date object .rbc-month-view.rbc-month-row.rcb-row div[class="rbc-date-cell rbc-now rbc-current"]
        //  2. determine 7 or 1 month later
        //  3. determined date becomes the selector?
        //  4. determine duration of stay
        //  5. determine if duration will fall off existing calendar
        //  6. Hard part, click & drag between rows
        //
        //  1. Find current date cell
        //  2. Determine calendar row and cell location (0-7)
        //  3. Logic
        //      If last row & last 3 days, click Next month button
        //      else select 2nd day of following week and drag to 1 day later
        //  4. Store staring cell date click, Store ending cell date release
        //

        let todayPosition;
        let selectedDates = [];

        MainPage.bookRoomButton.scrollIntoView();
        MainPage.bookRoomButton.click();

        browser.waitUntil( ()=> {
            return MainPage.roomBookingCancelButton.isExisting();
        }, {
            timeout: 5000,
            timeoutMsg: 'Room reservation container did not load'
        })

        // browser.pause(3000);
        // console.log('checking for today');

        todayPosition = MainPage.getCalendarTodayPosition();
        console.table(todayPosition)

        selectedDates = MainPage.selectReservationDates(todayPosition.week +1, todayPosition.day -1, 2);
        browser.pause(3000);
        console.log(selectedDates);

    });
});
