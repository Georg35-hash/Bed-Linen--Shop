import { register, login } from './scripts/auth-register-handler';
import '../src/mainSignUp.scss';
document.addEventListener('DOMContentLoaded', () => {
  register();
  login();
});
