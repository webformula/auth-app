export async function login(identifier, password) {
  const response = await fetch(`${window.tokenIssuerUrl}/login`, {
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
  console.log(response);
  if (response.requiresVerification) {
    window.location = '#/verification';
  } else {
    window.location = window.redirectLink;
  }
}

export async function register(identifier, password) {
  await fetch(`${window.tokenIssuerUrl}/register`, {
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
  await fetch(`${window.tokenIssuerUrl}/twoFactorVerification`, {
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
  window.location = window.redirectLink;
}

export async function createResetPassword(email) {
  await fetch(`${window.tokenIssuerUrl}/create-reset-password`, {
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
  await fetch(`${window.tokenIssuerUrl}/create-reset-password`, {
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
