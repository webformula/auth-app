import { Page } from '@webformula/pax-core';
import { login } from '../../modules/auth.js';

export default class Login extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Login';
  }

  get identifierInput() {
    return document.querySelector('#identifier');
  }

  get passwordInput() {
    return document.querySelector('#password');
  }

  get submitButton() {
    return document.querySelector('#login');
  }

  togglePasswordVisibility() {
    const _passwordInput = this.passwordInput;
    const _isNotVisible = document.querySelector('#password-is-not-visible');
    const _isVisible = document.querySelector('#password-is-visible');

    _isNotVisible.style.display = 'none';
    _isVisible.style.display = 'none';

    if (_passwordInput.type === 'password') {
      _passwordInput.type = 'text';
      _isVisible.style.display = '';
    } else {
      _passwordInput.type = 'password';
      _isNotVisible.style.display = '';
    }
  }

  async sendLogin() {
    const button = this.submitButton;

    // prevent this from being called multiple times when method is in progress
    if (button.pending) return;

    // put button into pending state. This is needed because the user can hit enter in the last textfield to trigger this
    if (!button.pending) button.asyncClick();

    if (!this.identifierInput.validity.valid || !this.passwordInput.validity.valid) {
      setTimeout(() => {
        button.resolve();
      }, 0);
      return;
    }

    try {
      await login(this.identifierInput.value, this.passwordInput.value, localStorage.getItem('deviceToken'));
    } catch (e) {
      button.resolve();
      throw e;
    }
  }

  template() {
    return 'pages/login/page.html';
  }
}
