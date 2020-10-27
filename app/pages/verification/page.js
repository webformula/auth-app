import { Page } from '@webformula/pax-core';
import { verifyDevice } from '../../modules/auth.js';

export default class Verification extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Verify device';
  }

  get codeInput() {
    return document.querySelector('#code');
  }

  get rememberInput() {
    return document.querySelector('#remember');
  }

  get submitButton() {
    return document.querySelector('#submit-button');
  }

  async sendVerification(button) {
    const button = this.submitButton;

    // prevent this from being called multiple times when method is in progress
    if (button.pending) return;

    // put button into pending state. This is needed because the user can hit enter in the last textfield to trigger this
    if (!button.pending) button.asyncClick();

    if (!this.codeInput.validity.valid) {
      setTimeout(() => {
        button.resolve();
      }, 0);
      return;
    }
    
    try {
      await verifyDevice(this.codeInput.value, this.rememberInput.checked);
    } catch (e) {
      button.resolve();
      throw e;
    }
  }

  template() {
    return 'pages/verification/page.html';
  }
}
