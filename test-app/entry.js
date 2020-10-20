import setup from './auth.js';

setup({
  authAppURL: 'http://localhost:8080/',
  tokenServiceUrl: 'http://localhost:3201',
  refreshPath: 'refresh',
  logoutPath: 'logout',
  redirectUrl: window.location
});
