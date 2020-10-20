import request from '/pax-request/src/instancer.js';

let _accessTokenKey;
let _refreshTokenKey;
let _tokenServiceUrl;
let _refreshPath;

export async function setup(tokenServiceUrl, refreshPath = 'refresh', accessTokenKey = 'accessToken', refreshTokenKey = 'refreshToken') {
  _tokenServiceUrl = tokenServiceUrl;
  _refreshPath = refreshPath;
  _accessTokenKey = accessTokenKey;
  _refreshTokenKey = refreshTokenKey;

  if (hasValidAccessToken()) return true;
  if (!hasRefreshToken()) return false;
  return refreshToken();
}

export async function login(identifier, password, deviceToken) {
  try {
    const response = await request
      .post(`${window.tokenIssuerUrl}/login`)
      .data({
        identifier,
        password,
        deviceToken
      })
      .credentials()
      .send();

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // window.location = '#/verification';
    }
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      // window.location = window.redirectLink;
    }
  } catch (e) {
    localStorage.removeItem('deviceToken');
    throw e;
  }
}

export async function register(identifier, password) {
  const response = await request
    .post(`${window.tokenIssuerUrl}/register`)
    .data({
      identifier,
      password,
      email: identifier
    })
    .send();
}

export async function verifyDevice(code, rememberDevice = false) {

  try {
    const response = await request
      .post(`${window.tokenIssuerUrl}/twoFactorVerification`)
      .data({
        code,
        token: localStorage.getItem('token'),
        rememberDevice
      })
      .send();

    localStorage.removeItem('token');
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('deviceToken', response.data.deviceToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    // window.location = window.redirectLink;
  } catch (e) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('deviceToken');
  }
}

export async function createResetPassword(email) {
  const response = await request
    .post(`${window.tokenIssuerUrl}/create-reset-password`)
    .data({
      email
    })
    .send();

  console.log(response);
}

export async function resetPassword(tempPassword, newPassword) {
  const response = await request
    .post(`${window.tokenIssuerUrl}/reset-password`)
    .data({
      tempPassword,
      newPassword
    })
    .send();

  console.log(response);
}



function hasValidAccessToken() {
  const decodedAccess = decode(localStorage.getItem(_accessTokenKey));
  const validAccess = decodedAccess && decodedAccess.exp && (new Date(parseInt(decodedAccess.exp) * 1000) > new Date());
  return !!validAccess;
}

function hasRefreshToken() {
  const decoded = decode(localStorage.getItem(_refreshTokenKey));
  return !!decoded;
}

async function refreshToken() {
  const data = await fetch(_refreshUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken: localStorage.getItem(_refreshTokenKey)
    })
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
