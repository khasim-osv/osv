import { combineReducers } from "redux";
import { login_reducer } from "./components/login/Login.reducer";
import {
  getTranslationData_reducer,
  updateTranslationData_reducer,
  saveTranslationData_reducer,
  deleteTranslationData_reducer,
} from "./components/master_data_management/translations/Translations.reducer";
import { registration } from "./components/registration/Registration.reducer";
import {
  getErrorCodeData_reducer,
  saveErrorCodeData_reducer,
  updateErrorCodeData_reducer,
} from "./components/master_data_management/error_codes/ErrorCodes.reducer";

import {
  getModuleData_reducer,
  updateModuleData_reducer,
  saveModuleData_reducer,
  getCategories_reducer,
} from "./components/master_data_management/modules/Modules.reducer";

import {
  getGroups_reducer,
  saveGroups_reducer,
  updateGroups_reducer,
} from "./components/master_data_management/groups/Groups.reducer";

import {
  getBanks_reducer,
  saveBanks_reducer,
  updateBanks_reducer,
} from "./components/master_data_management/banks/Banks.reducer";

import {
  getLicenseData_reducer,
  updateLicenseData_reducer,
  saveLicenseData_reducer,
  getModules_reducer,
} from "./components/master_data_management/licence_type/Licenses.reducer";
import {
  getPageData_reducer,
  saveCompanyInfo_reducer,
  saveSignInInfo_reducer,
  saveBankAccouts_reducer,
  saveWFManagement_reducer,
  saveCommunication_reducer,
  getUsers_reducer,
  getRoles_reducer,
  getWorkflowData_reducer,
  updateWorkflowData_reducer,
  breadcrumb_reducer,
} from "./components/user_profiles/createUser/CreateUserProfile.reducer";

import {
  getAllUserProfileData_reducer,
  updateAllUserProfileData_reducer,
  getLicencesData_reducer,
} from "./components/user_profiles/all_user_profiles/AllUserProfiles.reducer";

import {
  getUserManagementData_reducer,
  updateUserManagementData_reducer,
  getRoleMasterData_reducer,
  getProfileUsersData_reducer,
} from "./components/user_profiles/user_management/UserManagement.reducer";
import {
  getRoleManagementData_reducer,
  updateRoleManagementData_reducer,
  getMasterModulesData_reducer,
  getAllRolesManagementData_reducer,
} from "./components/user_profiles/role_management/RoleManagement.reducer";

export const reducers = combineReducers({
  user: login_reducer,
  Translation: combineReducers({
    GetTranslations: getTranslationData_reducer,
    EditTranslation: updateTranslationData_reducer,
    SaveTranslation: saveTranslationData_reducer,
    DeleteTranslation: deleteTranslationData_reducer,
  }),
  modules: combineReducers({
    getModules: getModuleData_reducer,
    editModule: updateModuleData_reducer,
    saveModule: saveModuleData_reducer,
    categories: getCategories_reducer,
  }),
  ErrorCodes: combineReducers({
    GetErrorCodes: getErrorCodeData_reducer,
    EditErrorCodes: updateErrorCodeData_reducer,
    SaveErrorCodes: saveErrorCodeData_reducer,
  }),
  Groups: combineReducers({
    GetGroups: getGroups_reducer,
    EditGroups: updateGroups_reducer,
    SaveGroups: saveGroups_reducer,
  }),
  Banks: combineReducers({
    GetBanks: getBanks_reducer,
    EditBanks: updateBanks_reducer,
    SaveBanks: saveBanks_reducer,
  }),
  licenses: combineReducers({
    getLicenses: getLicenseData_reducer,
    editLicense: updateLicenseData_reducer,
    saveLicense: saveLicenseData_reducer,
    modules: getModules_reducer,
  }),
  userProfile: combineReducers({
    createUserPageData: getPageData_reducer,
    companyInfoData: saveCompanyInfo_reducer,
    signInInfoData: saveSignInInfo_reducer,
    bankAccountsInfoData: saveBankAccouts_reducer,
    workforceMngmntData: saveWFManagement_reducer,
    commmunicationData: saveCommunication_reducer,
    roles: getRoles_reducer,
    users: getUsers_reducer,
    GetAllUserProfile: getAllUserProfileData_reducer,
    EditUserProfile: updateAllUserProfileData_reducer,
    // SaveAllUserProfile: saveAllUserProfileData_reducer,
    getUser: getUserManagementData_reducer,
    editUser: updateUserManagementData_reducer,
    getRole: getRoleManagementData_reducer,
    editRole: updateRoleManagementData_reducer,
    getMasterModules: getMasterModulesData_reducer,
    getRolesMaster: getRoleMasterData_reducer,
    getAllRoles: getAllRolesManagementData_reducer,
    getLicences: getLicencesData_reducer,
    getWorkflowData: getWorkflowData_reducer,
    updateWorkflowData: updateWorkflowData_reducer,
    getAllProfileUsers: getProfileUsersData_reducer,
  }),
  breadcrumb: breadcrumb_reducer,
  registration,
});
