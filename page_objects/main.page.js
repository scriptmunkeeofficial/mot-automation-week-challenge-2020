
import Page from './page';

class MainPage extends Page {

    get letMeHackButton() { return $('.btn-primary'); }
    // Constact Us Form
    get contactUsForm() { return $('forrm'); }
    get contactUsName() { return $('#name'); }
    get contactUsEmail() { return $('#email'); }
    get contactUsPhoneNumber() { return $('#phone'); }
    get contactUsSubject() { return $('#subject'); }
    get contactUsMessage() { return $('#description'); }
    get contactUsSubmitButton() { return $('#submitContact'); }

    // Contact Us Form submission response
    get contactUsResponseDiv() { return $('div[style="height: 412px;"]'); }
    get contactUsResponseTitle() { return this.contactUsResponseDiv.$('h2'); }
    get contactUsResponseBodyLines() { return this.contactUsResponseDiv.$$('p'); }

    // Reservation Request
    get bookRoomButton() { return $('button[class*="openBooking"]'); }
    get roomBookingContainer() { return $('div[class="row hotel-room-info"]'); }
    get roomBookingFirstName() { return $('input[name="firstname"]'); }
    get roomBookingLastName() { return $('input[name="lastname"]'); }
    get roomBookingEmail() { return $('input[name="email"]'); }
    get roomBookingPhone() { return $('input[name="phone"]'); }
    get roomBookingBookButton() { return $('button[class*="btn-outline-primary"]'); }
    get roomBookingCancelButton() { return $('button[class*="btn-outline-danger"]'); }

    get roomBookingTodayButton() { return $$('.rbc-toolbar .rbc-btn-group button')[0]; }
    get roomBookingPreviousMonthButton() { return $$('.rbc-toolbar .rbc-btn-group button')[1]; }
    get roomBookingNextMonthButton() { return $$('.rbc-toolbar .rbc-btn-group button')[2]; }

    get roomBookingCurrentDate() { return $('div[class="rbc-date-cell rbc-now rbc-current"] '); }
    get roomBookingCalendar() { return $('.rbc-month-view'); }
    get roomBookingCalendarRows() { return $$('.rbc-month-row .rbc-row-content'); }


    /**
     *
    */
    sendContactUsMessage(name, email, phone, sub, msg) {
        this.contactUsName.setValue(name);
        this.contactUsEmail.setValue(email);
        this.contactUsPhoneNumber.setValue(phone);
        this.contactUsSubject.setValue(sub);
        this.contactUsMessage.setValue(msg);
        this.contactUsSubmitButton.click();

        this.waitForContactUsConfirmation();
    }

    /**
     *
    */
    waitForContactUsConfirmation() {
        browser.waitUntil( ()=> {
            return this.contactUsForm.isExisting() != true;
        }, { timeout: 5000, timeoutMsg: 'Contact Form did not get replaced'} );

    }

    /**
     * @returns {Object} {'week': 1, 'day': 3 }
     */
    getCalendarTodayPosition() {
        let i, j, dateCells;
        // console.log(`cal row length: ${this.roomBookingCalendarRows.length}`)

        for( i = 0; i < this.roomBookingCalendarRows.length; i++) {
            dateCells = this.roomBookingCalendarRows[i].$$('.rbc-date-cell');
            // console.log(`dateCells length: ${dateCells.length}`)

            for (j = 0; j < dateCells.length; j++) {
                // console.log(dateCells[j].getAttribute('class').includes('rbc-current'));

                if (dateCells[j].getAttribute('class').includes('rbc-current') ) {
                    // console.log(i, j);
                    return { 'week': i, 'day': j};
                }
            }
        }
    }

    /**
     * selected the reservation windows and returns the human readable calendar dates
     * The arguments week and startDay are Zero based
     * @argument {number} week
     * @argument {number} startDay
     * @argument {number} numberOfDays
     *
     * @returns {Array} selectedDays
     */
    selectReservationDates( week, startDay, numberOfDays) {
        let startWeek, firstDay, lastDay;
        let bookedDays = [];

        console.log(week, startDay, numberOfDays);
        startWeek = this.roomBookingCalendarRows[week];
        firstDay = startWeek.$$('.rbc-date-cell')[startDay];
        lastDay = startWeek.$$('.rbc-date-cell')[startDay+numberOfDays];

        firstDay.dragAndDrop(lastDay, {duration: 3000});

        browser.pause(3000);

        for (let d = 0; d < numberOfDays; d++) {
            bookedDays[d] = startWeek.$$('.rbc-date-cell')[startDay +d].getText();
            console.log(bookedDays);
        }
        
        return bookedDays;
    }
}

export default new MainPage()
