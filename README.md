# auth-app

Integrate this with any app to get proper authentication.
This should run on the same domain with a separate sub-domain as the app you are hosting
 - app.domain.com
 - auth.domain.com

The refresh token is stored ina httponly secure cookie
The accessToken is send down in teh response body so you can store it in localStorage or any other place.

# SDK
Use this to connect the auth app to your app.
- load the sdk (sdk/index.js) in your app
- call setup
  ```javascript
  import setup from './auth.js';

  setup({
    authAppURL: 'http://localhost:8080/',
    tokenServiceUrl: 'http://localhost:3201',
    refreshPath: 'refresh',
    logoutPath: 'logout',
    redirectUrl: window.location
  });
  ```
