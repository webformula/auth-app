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

  async sendLogin(button) {
    if (button.pending) return;

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
