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

  async requestResetPassword(button) {
    if (button.pending) return;

    if (!this.emailInput.value) {
      alert('requires email');
      setTimeout(() => {
        button.resolve();
      }, 0);
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
    console.log('pages/create-reset-password/page.html');
    return 'pages/create-reset-password/page.html';
  }
}
