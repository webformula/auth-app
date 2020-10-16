import setup from './auth.js';

setup({
  authURL: 'http://localhost:8080/',
  tokenIssuerUrl: 'http://localhost:3201',
  refreshUrl: 'http://localhost:3201/refresh',
  redirectUrl: 'http://localhost:8080/test'//window.location
});
