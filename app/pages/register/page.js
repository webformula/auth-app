import { Page } from '@webformula/pax-core';
import { register } from '../../modules/auth.js';

export default class Registration extends Page {
  constructor() {
    super();

    this.bound_onInput = this.onInput.bind(this);
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

  addEvents() {
    this.passwordInput2.addEventListener('input', this.bound_onInput);
  }

  removeEvents() {
    this.passwordInput2.removeEventListener('input', this.bound_onInput);
  }

  onInput() {
    if (this.passwordInput.value !== this.passwordInput2.value) {
      this.passwordInput2.setCustomValidity('passwords do not match');
      this.passwordInput2.parentNode.classList.add('mdw-invalid');
    } else {
      this.passwordInput2.setCustomValidity('');
      this.passwordInput2.parentNode.classList.remove('mdw-invalid');
    }
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
    if (!this.identifierInput.validity.valid || !this.passwordInput.validity.valid || !this.passwordInput2.validity.valid) {
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
