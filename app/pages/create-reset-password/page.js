import { Page } from '@webformula/pax-core';
import { createResetPassword } from '../../modules/auth.js';

export default class CreateResetPassword extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Forgot password';
  }

  get emailInput() {
    return document.querySelector('#email');
  }

  get submitButton() {
    return document.querySelector('#submit-button');
  }

  async requestResetPassword() {
    const button = this.submitButton;
    
    // prevent this from being called multiple times when method is in progress
    if (button.pending) return;

    // put button into pending state. This is needed because the user can hit enter in the last textfield to trigger this
    if (!button.pending) button.asyncClick();
    
    if (!this.emailInput.validity.valid) {
      setTimeout(() => {
        button.resolve();
      }, 0);
      return;
    }

    try {
      await createResetPassword(this.emailInput.value);
      window.location = '#/reset-password';
    } catch (e) {
      button.resolve();
      throw e;
    }
  }

  template() {
    return 'pages/create-reset-password/page.html';
  }
}
