import { HTMLElementExtended } from '@webformula/pax-core';
import { setup } from './auth-service.js';
import './login.js';
import './register.js';

customElements.define('auth-app', class extends HTMLElementExtended {
  constructor() {
    super();
    
    setup(
      this.tokenServiceUrl,
      this.refreshPath,
      this.accessTokenKey,
      this.refreshTokenKey
    )
      .then(valid => {
        this._valid = valid;
        if (!valid) this.render();
      })
      .catch(e => console.error(e));
    
    this._state = 'login';
    this.setAttribute('id', 'authApp');
    this.cloneTemplate();
  }

  get tokenServiceUrl() {
    return this.getAttribute('tokenServiceUrl');
  }

  get refreshPath() {
    return this.getAttribute('refreshPath') || 'refresh';
  }

  get accessTokenKey() {
    return this.getAttribute('accessTokenKey') || 'accessToken';
  }

  get refreshTokenKey() {
    return this.getAttribute('refreshTokenKey') || 'refreshToken';
  }

  gotoRegister() {
    this._state = 'register';
    this.render();
  }

  gotoLogin() {
    this._state = 'login';
    this.render();
  }

  template() {
    if (!this.valid) {
      console.log(this._state);
      switch (this._state) {
        case 'login':
          return `<auth-login></auth-login>`;
        case 'register':
          return '<auth-register></auth-register>';
        default:
          return 'default';
      }
    }
    return 'valid';
  }
  
});
