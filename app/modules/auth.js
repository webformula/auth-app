import request from '/pax-request/src/instancer.js';

request.baseUrl = 'http://localhost:3201';

const redirectLink = '';

export async function login(identifier, password, deviceToken) {
  try {
    const response = await request
      .post('login')
      .data({
        identifier,
        password,
        deviceToken
      })
      .send();

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      window.location = '#/verification';
    }
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      window.location = redirectLink;
    }
  } catch (e) {
    localStorage.removeItem('deviceToken');
    throw e;
  }
}

export async function register(identifier, password) {
  const response = await request
    .post('register')
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
      .post('twoFactorVerification')
      .data({
        code,
        token: localStorage.getItem('token'),
        rememberDevice
      })
      .send();
    
    localStorage.removeItem('token');
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('deviceToken', response.data.deviceToken);
    window.location = redirectLink;
  } catch (e) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('deviceToken');
  }
}

export async function createResetPassword(email) {
  const response = await request
    .post('create-reset-password')
    .data({
      email
    })
    .send();

  console.log(response);
}

export async function resetPassword(tempPassword, newPassword) {
  const response = await request
    .post('reset-password')
    .data({
      tempPassword,
      newPassword
    })
    .send();

  console.log(response);
}
