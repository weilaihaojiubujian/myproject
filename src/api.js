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
const createTask = root1 + 'admin/task/createTask';
const editProject = root1 + 'admin/project/editProject';
const projectInfo = root1 + 'admin/project/projectInfo';
const editUser = root1 + 'admin/user/editUser';
const fileUpload = root1 + 'file/uploadFiles';
const uploadFile = root1 + 'file/uploadFile';
const projectList = root1 + 'admin/project/projectList';
const taskList = root1 + 'admin/task/taskList';
const editTask = root1 + 'admin/task/editTask';
const taskInfo = root1 + 'admin/task/taskInfo';
const auditProductList = root1 + 'admin/auditProductList';
const auditProduct = root1 + 'admin/auditProduct';
const auditTaskList = root1 + 'admin/auditTaskList';
const auditTask = root1 + 'admin/auditTask';
const completeTask = root1 + 'admin/task/completeTask';
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
    taskList,
    createTask,
    editTask,
    taskInfo,
    auditProductList,
    auditProduct,
    auditTask,
    auditTaskList,
    completeTask,
    root,
    root1
};
