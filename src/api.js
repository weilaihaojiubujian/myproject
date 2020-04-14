const root = 'http://localhost:8087/';
const root1 = 'http://localhost:8086/';
const login = root + 'admin/user/login';
const register = root + 'admin/user/userReg';
const userInfo = root1 + 'admin/user/userInfo';
const otherUserInfo = root1 + 'admin/user/otherUserInfo';
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
const uploadFileByUserId = root1 + 'file/uploadFileByUserId';
const uploadFile = root1 + 'file/uploadFile';
const projectList = root1 + 'admin/project/projectList';
const taskList = root1 + 'admin/task/taskList';
const editTask = root1 + 'admin/task/editTask';
const taskInfo = root1 + 'admin/task/taskInfo';
const auditProjectList = root1 + 'admin/auditProjectList';
const auditProject = root1 + 'admin/auditProject';
const auditTaskList = root1 + 'admin/auditTaskList';
const auditTask = root1 + 'admin/auditTask';
const completeTask = root1 + 'admin/task/completeTask';
const recharge = root1 + 'admin/transfer/recharge';
const goAlipay = root1 + 'alipay/goAlipay';
const withdraw = root1 + 'admin/transfer/withdraw';
const transferAccount = root1 + 'admin/transfer/transferAccount';
const transferRecord = root1 + 'admin/transfer/transferRecord';
const listFile = root1 + 'file/listFile';
const listFileByUserId= root1 + 'file/listFileByUserId';
const userProjectList=root1 + 'admin/project/userProjectList';
const userAcceptProjectList=root1 + 'admin/project/userAcceptProjectList';
const projectUserList=root1 + 'admin/project/projectUserList';
const confirmUser=root1 + 'admin/project/confirmUser';
const confirmProject=root1 + 'admin/project/confirmProject';
const deleteProject=root1 + 'admin/project/deleteProject';
const createChat=root1 + 'admin/chat/createChat';
const chatList=root1 + 'admin/chat/chatList';
const uploadPicture= root1 + 'file/uploadPicture';
const otherUserInfoByUserId= root1 + 'admin/user/otherUserInfoByUserId';
const validationUser= root1 + 'admin/user/validationUser';
const evaluationUser= root1 + 'admin/user/evaluationUser';
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
    uploadFileByUserId,
    projectList,
    editUser,
    uploadFile,
    taskList,
    createTask,
    editTask,
    taskInfo,
    auditProjectList,
    auditProject,
    auditTask,
    auditTaskList,
    completeTask,
    recharge,
    withdraw,
    goAlipay,
    transferAccount,
    transferRecord,
    listFile,
    userProjectList,
    userAcceptProjectList,
    projectUserList,
    confirmUser,
    otherUserInfo,
    confirmProject,
    deleteProject,
    listFileByUserId,
    createChat,
    chatList,
    uploadPicture,
    otherUserInfoByUserId,
    validationUser,
    evaluationUser,
    root,
    root1
};
