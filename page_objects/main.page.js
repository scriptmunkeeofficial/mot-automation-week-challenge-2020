
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

    sendContactUsMessage(name, email, phone, sub, msg) {
        this.contactUsName.setValue(name);
        this.contactUsEmail.setValue(email);
        this.contactUsPhoneNumber.setValue(phone);
        this.contactUsSubject.setValue(sub);
        this.contactUsMessage.setValue(msg);
        this.contactUsSubmitButton.click();

        this.waitForContactUsConfirmation();
    }

    waitForContactUsConfirmation() {
        browser.waitUntil( ()=> {
            return this.contactUsForm.isExisting() != true;
        }, { timeout: 5000, timeoutMsg: 'Contact Form did not get replaced'} );

    }
}

export default new MainPage()
