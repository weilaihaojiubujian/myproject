const root = 'http://localhost:8087/';
const root1 = 'http://localhost:8086/';
const login = root + 'admin/user/login';
const register = root + 'admin/user/userReg';
const userInfo = root1 + 'admin/user/userInfo';
const sendRegisterEmail = root + 'admin/user/sendVerifyCodeEmail';
const sendForgetEmail = root + 'admin/user/sendForgetEmail';
const resetPassword = root + 'admin/user/resetPassword';
const changepasswd = root + 'admin/user/changepasswd';
const loginout = root + 'admin/user/loginout';
const createProject = root1 + 'admin/project/createProject';
const editProject = root1 + 'admin/project/editProject';
const projectInfo = root1 + 'admin/project/projectInfo';
const editUser = root1 + 'admin/user/editUser';
const fileUpload = root1 + 'file/uploadFiles';
const uploadFile = root1 + 'file/uploadFile';
const projectList = root1 + 'admin/project/projectList';
const bookUrl = root + 'api/books';
export default {
    login,
    register,
    userInfo,
    sendRegisterEmail,
    sendForgetEmail,
    resetPassword,
    changepasswd,
    loginout,
    createProject,
    editProject,
    projectInfo,
    fileUpload,
    projectList,
    editUser,
    uploadFile,
    bookUrl,
    root,
    root1
};
