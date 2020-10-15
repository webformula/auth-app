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

  async sendVerification(button) {
    if (button.pending) return;
    
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
