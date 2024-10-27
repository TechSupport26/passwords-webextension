import AbstractPasswordPaste from "@js/Client/PasswordPaste/AbstractPasswordPaste";

export default class TypingPasswordPaste extends AbstractPasswordPaste {

    canHandle() {
        return location.origin === 'https://www.typing.com/student/login' &&
            (
                document.getElementById('submit') !== null ||
                document.getElementById('login-username') !== null
            );
    }

    async handle() {
        let userInput = document.getElementById('login-username');
        if (userInput === null) {
            if (this._passwordPasteRequest.isAutofill()) {
                return false;
            }

            let loginButton = document.getElementById('submit');
            if (loginButton === null) {
                return false;
            }
            this._simulateClick(loginButton);
            try {
                userInput = await this._waitForElement('#form-ele-username', 10000);
            } catch (e) {
                return false;
            }
        }

        this._insertTextIntoField(userInput, this._passwordPasteRequest.getUser());
        // Wait for a second after username input before proceeding
        await this._wait(1000);
        let passwordInput = document.getElementById('form-ele-username');
        this._insertTextIntoField(passwordInput, this._passwordPasteRequest.getPassword());        
        if (!this._passwordPasteRequest.isAutofill() && this._passwordPasteRequest.isSubmit()) {
            // await this._wait(500); //It may not be needed.
            // Something in reddits own code seems to reset the value of the field to a previous state in some cases
        }

        return true;
    }
}