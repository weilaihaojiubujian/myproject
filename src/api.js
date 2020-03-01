const root = 'http://localhost:8087/';
const login = root + 'admin/user/login';
const register = root + 'admin/user/userReg';
const sendRegisterEmail = root + 'admin/user/sendVerifyCodeEmail';
const bookUrl = root + 'api/books';
export default {
    login,
    register,
    sendRegisterEmail,
    bookUrl,
    root
};
