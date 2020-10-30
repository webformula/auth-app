import '@webformula/pax-components/release/entry.js';
import './pax-entry.js';
import { handleAccountableState } from './modules/auth.js';

const urlParams = new URLSearchParams(window.location.search);
const parsedParams = new URLSearchParams(atob(decodeURIComponent(urlParams.get('p'))));
if (parsedParams.get('r')) localStorage.setItem('redirectLink', parsedParams.get('r'));
if (parsedParams.get('b')) localStorage.setItem('tokenIssuerUrl', parsedParams.get('b'));

// this will get the correct auth state from the server and redirect the user accordingly
handleAccountableState();
