import { HTMLElementExtended } from '@webformula/pax-core';
import { login } from './auth-service.js';

customElements.define('auth-login', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.bound_sendLogin = this.sendLogin.bind(this);

    this.cloneTemplate();
  }

  get identifierInput() {
    return this.shadowRoot.querySelector('#identifier');
  }

  get passwordInput() {
    return this.shadowRoot.querySelector('#password');
  }

  get passwordVisible() {
    return this.shadowRoot.querySelector('#password-is-not-visible');
  }

  get passwordNotVisible() {
    return this.shadowRoot.querySelector('#password-is-visible');
  }

  get loginButton() {
    return this.shadowRoot.querySelector('#login');
  }

  addEvents() {
    this.passwordVisible.addEventListener('click', this.bound_togglePasswordVisibility);
    this.passwordNotVisible.addEventListener('click', this.bound_togglePasswordVisibility);
    this.loginButton.addEventListener('click', this.bound_sendLogin);
  }

  removeEvents() {
    this.passwordVisible.removeEventListener('click', this.bound_togglePasswordVisibility);
    this.passwordNotVisible.removeEventListener('click', this.bound_togglePasswordVisibility);
    this.loginButton.removeEventListener('click', this.bound_sendLogin);
  }


  togglePasswordVisibility() {
    const _passwordInput = this.passwordInput;
    const _isNotVisible = this.passwordVisible;
    const _isVisible = this.passwordNotVisible;

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
    const button = this.loginButton;
    if (button.pending) return;
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

  styles() {
    return /* css */`
      @import url(https://cdn.jsdelivr.net/gh/webformula/pax-components@0.14.2-beta/release/theme.css);
      @import url(https://cdn.jsdelivr.net/gh/webformula/pax-components@0.14.2-beta/release/entry.css);
    `;
  }

  template() {
    return /* html */`
      <div class="mdw-column" mdw-flex-position="center" style="margin-top: 80px;">
        <mdw-card style="width: 320px;">
          <div class="mdw-card__content">
            <!-- logo example -->
            <!-- <mdw-icon style="font-size: 24px;">security</mdw-icon> -->
            <h5 style="margin: 4px; margin-top: 12px;">Sign in</h5>
          </div>

          <div class="mdw-card__content">
            <mdw-textfield>
              <label>Email</label>
              <input id="identifier" type="email" required>

              <mdw-textfield-helper>
                <mdw-helper-text validation>email required</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>
          
            <mdw-textfield style="margin-top: 24px; margin-bottom: 42px">
              <label>Password</label>
              <input id="password" type="password" required>

              <mdw-icon id="password-is-not-visible" onclick="">visibility</mdw-icon>
              <mdw-icon id="password-is-visible" style="display: none;" onclick="">visibility_off</mdw-icon>

              <mdw-textfield-helper>
                <mdw-helper-text validation>required</mdw-helper-text>
                <mdw-helper-text persistent><a class="sub-link" href="#/create-reset-password">Forgot password?</a></mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>
          </div>

          <div class="mdw-card__actions mdw-row" mdw-flex-position="space-between">
            <mdw-button onclick="authApp.gotoRegister()">Create account</mdw-button>
            <mdw-button id="login" mdw-async class="mdw-raised mdw-primary">Login</mdw-button>
          </div>
        </mdw-card>
      </div>
    `;
  }
});
