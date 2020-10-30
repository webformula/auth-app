export async function handleAccountableState() {
  const response = await fetch(`${localStorage.getItem('tokenIssuerUrl')}/account-state`, {
    method: 'GET',
    credentials: 'include'
  }).then(response => response.json());

  if (!response.state) throw Error('no retrievable state');
  
  switch (response.state.code) {
    case 0: // authorized
      if (localStorage.getItem('redirectLink')) window.location = localStorage.getItem('redirectLink');

    case 1: // unauthorized. needs to login / register
    case 2: // needs access token. can hit refresh endpoint to resolve
    case 3: // not capable of re-auth. has an invalid refresh token. Once the access token expires, a login is required
    default:
      if (window.location.hash !== '' && window.location.hash !== '#/') window.location = '/';
  }
}

export async function login(identifier, password) {
  const response = await fetch(`${localStorage.getItem('tokenIssuerUrl')}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      identifier,
      password
    })
  })
  .then(response => response.json());
  if (response.requiresVerification) {
    window.location = '#/verification';
  } else {
    window.location = localStorage.getItem('redirectLink');
  }
}

export async function register(identifier, password) {
  await fetch(`${localStorage.getItem('tokenIssuerUrl')}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      identifier,
      password,
      email: identifier
    })
  });
}

export async function verifyDevice(code, rememberDevice = false) {
  await fetch(`${localStorage.getItem('tokenIssuerUrl')}/twoFactorVerification`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code,
      rememberDevice
    })
  });
  window.location = localStorage.getItem('redirectLink');
}

export async function createResetPassword(email) {
  await fetch(`${localStorage.getItem('tokenIssuerUrl')}/create-reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  });
}

export async function resetPassword(tempPassword, newPassword) {
  await fetch(`${localStorage.getItem('tokenIssuerUrl')}/create-reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tempPassword,
      newPassword
    })
  });
}

export async function getSessions() {
  const data = await fetch(`${localStorage.getItem('tokenIssuerUrl')}/get-sessions`, {
    method: 'GET',
    credentials: 'include'
  });
  return data.json();
}

export async function logoutSession(sessionIds = []) {
  await fetch(`${localStorage.getItem('tokenIssuerUrl')}/clear-sessions`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionIds
    })
  });
}
