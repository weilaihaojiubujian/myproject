const root = 'http://localhost:8087/';
const root1 = 'http://localhost:8086/';
const login = root + 'admin/user/login';
const register = root + 'admin/user/userReg';
const userInfo = root1 + 'admin/user/userInfo';
const sendRegisterEmail = root + 'admin/user/sendVerifyCodeEmail';
const sendForgetEmail = root + 'admin/user/sendForgetEmail';
const resetPassword = root + 'admin/user/resetPassword';
const bookUrl = root + 'api/books';
export default {
    login,
    register,
    userInfo,
    sendRegisterEmail,
    sendForgetEmail,
    resetPassword,
    bookUrl,
    root,
    root1
};
