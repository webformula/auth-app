import { HTMLElementExtended } from '@webformula/pax-core';
import { register } from './auth-service.js';

customElements.define('auth-register', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onInput = this.onInput.bind(this);
    this.bound_togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.bound_sendRegistration = this.sendRegistration.bind(this);

    this.cloneTemplate();
  }

  get identifierInput() {
    return this.shadowRoot.querySelector('#identifier');
  }

  get passwordInput() {
    return this.shadowRoot.querySelector('#password');
  }

  get passwordInput2() {
    return this.shadowRoot.querySelector('#password-2');
  }

  get passwordVisible() {
    return this.shadowRoot.querySelector('#password-is-not-visible');
  }

  get passwordNotVisible() {
    return this.shadowRoot.querySelector('#password-is-visible');
  }

  get registerButton() {
    return this.shadowRoot.querySelector('#register');
  }

  addEvents() {
    this.passwordInput2.addEventListener('input', this.bound_onInput);
    this.passwordVisible.addEventListener('click', this.bound_togglePasswordVisibility);
    this.passwordNotVisible.addEventListener('click', this.bound_togglePasswordVisibility);
    this.registerButton.addEventListener('click', this.bound_sendRegistration);
  }

  removeEvents() {
    this.passwordInput2.removeEventListener('input', this.bound_onInput);
    this.passwordVisible.removeEventListener('click', this.bound_togglePasswordVisibility);
    this.passwordNotVisible.removeEventListener('click', this.bound_togglePasswordVisibility);
    this.registerButton.removeEventListener('click', this.bound_sendRegistration);
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

  async sendRegistration() {
    const button = this.registerButton;
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
            <h5 style="margin: 4px; margin-top: 12px;">Create account</h5>
          </div>

          <div class="mdw-card__content">
            <mdw-textfield>
              <label>Email</label>
              <input id="identifier" type="email" required>

              <mdw-textfield-helper>
                <mdw-helper-text validation>email required</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>
          
            <mdw-textfield style="margin-top: 24px;">
              <label>Password</label>
              <input id="password" type="password" required>

              <mdw-icon id="password-is-not-visible" onclick="">visibility</mdw-icon>
              <mdw-icon id="password-is-visible" style="display: none;;" onclick="">visibility_off</mdw-icon>

              <mdw-textfield-helper>
                <mdw-helper-text validation>required</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>

            <mdw-textfield>
              <label>Re-enter Password</label>
              <input id="password-2" type="password" required>

              <mdw-textfield-helper>
                <mdw-helper-text validation>Passwords do not match</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>
          </div>

          <div class="mdw-card__actions" style="justify-content: space-around;">
            <mdw-button onclick="authApp.gotoLogin()">cancel</mdw-button>
            <mdw-button id="register" mdw-async class="mdw-raised mdw-primary">Create account</mdw-button>
          </div>
        </mdw-card>
      </div>
    `;
  }
});
