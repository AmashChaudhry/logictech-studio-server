import loginUserRouter from '../api/login-user.js';
import logoutUserRouter from '../api/logout-user.js';
import updateUserRouter from '../api/update-user.js';
import currentUserRouter from '../api/current-user.js';
import registerUserRouter from '../api/register-user.js';
import validateEmailRouter from '../api/validate-email.js';
import validateUsernameRouter from '../api/validate-username.js';
import validatePhoneNumberRouter from '../api/validate-phone-number.js';

export default function routes(app) {
    app.use('/api', loginUserRouter);
    app.use('/api', logoutUserRouter);
    app.use('/api', updateUserRouter);
    app.use('/api', currentUserRouter);
    app.use('/api', registerUserRouter);
    app.use('/api', validateEmailRouter);
    app.use('/api', validateUsernameRouter);
    app.use('/api', validatePhoneNumberRouter);
}