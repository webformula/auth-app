

import { router } from '@webformula/pax-core';
import CreateResetPassword from './pages/create-reset-password/page.js';
import Login from './pages/login/page.js';
import Registration from './pages/register/page.js';
import ResetPassword from './pages/reset-password/page.js';
import Verification from './pages/verification/page.js';

router.addPageClass(CreateResetPassword, 'create-reset-password');
router.addPageClass(Login, 'login');
router.addPageClass(Registration, 'register');
router.addPageClass(ResetPassword, 'reset-password');
router.addPageClass(Verification, 'verification');
router.setRoot('login');
router.init();
window.router = router;

export {
  router
};
