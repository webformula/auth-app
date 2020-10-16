import '@webformula/pax-components/release/entry.js';
import './pax-entry.js';

const urlParams = new URLSearchParams(window.location.search);
window.redirectLink = urlParams.get('r');
window.tokenIssuerUrl = urlParams.get('b');
