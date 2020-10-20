import '@webformula/pax-components/release/entry.js';
import './pax-entry.js';

const urlParams = new URLSearchParams(window.location.search);
const parsedParams = new URLSearchParams(atob(decodeURIComponent(urlParams.get('p'))));
window.redirectLink = parsedParams.get('r');
window.tokenIssuerUrl = parsedParams.get('b');
