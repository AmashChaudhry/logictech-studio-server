import loginUserRouter from '../api/login-user.js';
import registerUserRouter from '../api/register-user.js';
import validateEmailRouter from '../api/validate-email.js';
import validateUsernameRouter from '../api/validate-username.js';
import validatePhoneNumberRouter from '../api/validate-phone-number.js';

export default function routes(app) {
    app.use('/api', loginUserRouter);
    app.use('/api', registerUserRouter);
    app.use('/api', validateEmailRouter);
    app.use('/api', validateUsernameRouter);
    app.use('/api', validatePhoneNumberRouter);
}