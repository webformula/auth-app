import { Page } from '@webformula/pax-core';
import { getSessions, logoutSession } from '../../modules/auth.js';

export default class SessionManagement extends Page {
  constructor() {
    super();

    this.sessions = [];
    window.tokenIssuerUrl = 'http://localhost:3201';
  }

  get title() {
    return 'Session management';
  }

  get sessionList() {
    return document.querySelector('#session-list');
  }

  get logoutSessionButton() {
    return document.querySelector('#logout-session');
  }

  async connectedCallback() {
    this.sessions = await getSessions();
    this.render();
  }

  async logoutSession() {
    if (this.logoutSessionButton.pending) return;
    
    const indexes = this.sessionList.selected;
    const selected = indexes.map(i => this.sessions[i]);
    console.log(indexes);
    console.log(selected);
    // await logoutSession(selected);

    // this.sessions = await getSessions();
    // this.render();
  }

  updateSelection(selected) {
    this.logoutSessionButton.setAttribute('disabled', 'disabled');
    this.logoutSessionButton.innerHTML = 'logout session';

    if (selected.length === 1) {
      this.logoutSessionButton.removeAttribute('disabled');
    } else if (selected.length > 1) {
      this.logoutSessionButton.innerHTML = 'logout sessions';
      this.logoutSessionButton.removeAttribute('disabled');
    }
  }
  
  template() {
    return 'pages/session-management/page.html';
  }
}
