import request from '/pax-request/src/instancer.js';

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
      window.location = '#/verification';
    }
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      window.location = window.redirectLink;
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
    window.location = window.redirectLink;
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
