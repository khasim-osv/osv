import { all } from "redux-saga/effects";
import { loginUserWatcher } from "./components/login/Login.saga";
import {
  getTranslationDataWatcher,
  updateTranslationDataWatcher,
  deleteTranslationDataWatcher,
  saveTranslationDataWatcher,
} from "./components/master_data_management/translations/Translations.saga";
import {
  getErrorCodesDataWatcher,
  updateErrorCodesDataWatcher,
  saveErrorCodesDataWatcher,
} from "./components/master_data_management/error_codes/ErrorCodes.saga";
import {
  getGroupsWatcher,
  updateGroupsWatcher,
  saveGroupsWatcher,
} from "./components/master_data_management/groups/Groups.saga";
import {
  getBanksWatcher,
  updateBanksWatcher,
  saveBanksWatcher,
} from "./components/master_data_management/banks/Banks.saga";
import {
  getModulesDataWatcher,
  updateModuleDataWatcher,
  saveModuleDataWatcher,
  getCategoriesWatcher,
} from "./components/master_data_management/modules/Modules.saga";
import {
  getLicensesDataWatcher,
  updateLicenseDataWatcher,
  saveLicenseDataWatcher,
  getModulesWatcher,
} from "./components/master_data_management/licence_type/Licenses.saga";
import {
  getPageDataWatcher,
  saveCompanyInfoWatcher,
  saveSignInInfoWatcher,
  saveBankAccountsInfoWatcher,
  saveWFManagementWatcher,
  saveCommunicationWatcher,
  getUserProfileWatcher,
  getWorkflowDataWatcher,
  updateWorkflowDataWatcher,
} from "./components/user_profiles/createUser/CreateUserProfile.saga";

import {
  getUserProfileDataWatcher,
  updateUserProfileDataWatcher,
  getLicencesDataWatcher,
  // saveUserProfileDataWatcher,
} from "./components/user_profiles/all_user_profiles/AllUserProfiles.saga";

import {
  getUserManagementDataWatcher,
  updateUserManagementDataWatcher,
  getRoleMasterDataWatcher,
  getProfileUsersDataWatcher,
} from "./components/user_profiles/user_management/UserManagement.saga";

import {
  getRoleManagementDataWatcher,
  updateRoleManagementDataWatcher,
  getMasterModulesDataWatcher,
  getAllRolesDataWatcher,
} from "./components/user_profiles/role_management/RoleManagement.saga";

export default function* rootSaga() {
  yield all([
    loginUserWatcher(),
    getTranslationDataWatcher(),
    updateTranslationDataWatcher(),
    deleteTranslationDataWatcher(),
    saveTranslationDataWatcher(),
    getAllRolesDataWatcher(),
    getModulesDataWatcher(),
    updateModuleDataWatcher(),
    saveModuleDataWatcher(),
    getCategoriesWatcher(),
    getErrorCodesDataWatcher(),
    updateErrorCodesDataWatcher(),
    saveErrorCodesDataWatcher(),
    getGroupsWatcher(),
    updateGroupsWatcher(),
    saveGroupsWatcher(),
    getBanksWatcher(),
    updateBanksWatcher(),
    saveBanksWatcher(),
    getLicensesDataWatcher(),
    updateLicenseDataWatcher(),
    saveLicenseDataWatcher(),
    getModulesWatcher(),
    getPageDataWatcher(),
    saveCompanyInfoWatcher(),
    saveSignInInfoWatcher(),
    saveBankAccountsInfoWatcher(),
    getUserProfileDataWatcher(),
    updateUserProfileDataWatcher(),
    //saveUserProfileDataWatcher(),
    saveWFManagementWatcher(),
    saveCommunicationWatcher(),
    getUserManagementDataWatcher(),
    updateUserManagementDataWatcher(),
    getUserProfileWatcher(),
    getRoleManagementDataWatcher(),
    updateRoleManagementDataWatcher(),
    getMasterModulesDataWatcher(),
    getRoleMasterDataWatcher(),
    getLicencesDataWatcher(),
    getWorkflowDataWatcher(),
    updateWorkflowDataWatcher(),
    getProfileUsersDataWatcher(),
  ]);
}
