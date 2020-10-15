import { Page } from '@webformula/pax-core';
import { resetPassword } from '../../modules/auth.js';

export default class ResetPassword extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Reset Password';
  }

  get tempPasswordInput() {
    return document.querySelector('#temp-password');
  }

  get passwordInput() {
    return document.querySelector('#password');
  }

  get passwordInput2() {
    return document.querySelector('#password-2');
  }

  togglePasswordVisibility() {
    const _passwordInput = this.passwordInput;
    const _passwordInput2 = this.passwordInput2;
    const _isNotVisible = document.querySelector('#password-is-not-visible');
    const _isVisible = document.querySelector('#password-is-visible');

    _isNotVisible.style.display = 'none';
    _isVisible.style.display = 'none';

    if (_passwordInput.type === 'password') {
      _passwordInput.type = 'text';
      _passwordInput2.type = 'text';
      _isVisible.style.display = '';
    } else {
      _passwordInput.type = 'password';
      _passwordInput2.type = 'password';
      _isNotVisible.style.display = '';
    }
  }

  async saveNewPassword(button) {
    if (button.pending) return;

    if (this.passwordInput.value !== this.passwordInput2.value) {
      alert('passwords do not match');

      setTimeout(() => {
        button.resolve();
      }, 0);
      return;
    }

    try {
      await resetPassword(this.tempPasswordInput.value, this.passwordInput.value);
      window.location = '#/login';
    } catch (e) {
      button.resolve();
      throw e;
    }
  }

  template() {
    return 'pages/reset-password/page.html';
  }
}
