let _authAppURL;
let _redirectUrl;
let _tokenServiceUrl;
let _logoutPath;
let _refreshPath;
let _accessTokenKey;

export default async function setup({
  authAppURL,
  redirectUrl,
  tokenServiceUrl,
  refreshPath,
  logoutPath,
  accessTokenKey
} = {
  authAppURL: 'path to auth app site',
  redirectUrl: 'redirect to once auth completed',
  tokenServiceUrl: 'token service base url',
  logoutPath: 'logout',
  refreshPath: 'refresh',
  accessTokenKey: 'accessToken'
}) {
  _authAppURL = authAppURL;
  _redirectUrl = redirectUrl;
  _tokenServiceUrl = tokenServiceUrl;
  _logoutPath = logoutPath || 'logout';
  _refreshPath = refreshPath || 'logout';
  _accessTokenKey = accessTokenKey || 'accessToken';

  const valid = await validateAuth();

  if (!valid) {
    const params = encodeURIComponent(btoa(`b=${_tokenServiceUrl}&r=${_redirectUrl}`));
    window.location = `${_authAppURL}?p=${params}`;
  }
}

export async function logout() {
  localStorage.removeItem(_accessTokenKey);
  await fetch(`${_tokenServiceUrl}/${_logoutPath}`, {
    method: 'POST',
    credentials: 'include'
  });
}
window.logout = logout;

// check id has local access token and it is not expired.
// If not then attempt a refresh
async function validateAuth() {
  const decodedAccess = decode(localStorage.getItem(_accessTokenKey));
  const validAccess = decodedAccess && decodedAccess.exp && (new Date(parseInt(decodedAccess.exp) * 1000) > new Date());
  if (validAccess) return true;

  // try refreshing
  const data = await fetch(`${_tokenServiceUrl}/${_refreshPath}`, {
    method: 'POST',
    credentials: 'include'
  })
    .then(response => response.json())
    .catch(e => {
      console.error(e);
    });

  if (data && data.accessToken) {
    localStorage.setItem(_accessTokenKey, data.accessToken);
    return true;
  }

  return false;
}


function decode(token = '') {
  if (!token || token === 'undefined') return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
