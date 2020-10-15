import { Page } from '@webformula/pax-core';
import { register } from '../../modules/auth.js';

export default class Registration extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Register';
  }

  get identifierInput() {
    return document.querySelector('#identifier');
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

  async sendRegistration(button) {
    if (button.pending) return;

    if (this.passwordInput.value !== this.passwordInput2.value) {
      alert('passwords do not match');

      setTimeout(() => {
        button.resolve();
      }, 0);
      return;
    }

    try {
      await register(this.identifierInput.value, this.passwordInput.value);
      window.location = '#/login';
    } catch (e) {
      button.resolve();
      throw e;
    }
  }

  template() {
    return 'pages/register/page.html';
  }
}
