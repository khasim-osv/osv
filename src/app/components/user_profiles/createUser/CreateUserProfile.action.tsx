import {
  CreateUserProfileActionTypes,
  IBank,
  ICompanyInfo,
  ICompanyInfoSelectField,
  ISignIn,
  ICommunication,
  IWorkflowManagement,
  IWorkflowManagementDetails,
} from "./CreateUserProfile.actionTypes";
// import { Module } from "./Modules.types";

export function get_pageData() {
  return {
    type: CreateUserProfileActionTypes.GET_PAGE_DATA,
  };
}
export function getUserProfileData(_id: string) {
  return {
    type: CreateUserProfileActionTypes.GET_USER_PROFILE,
    _id,
  };
}

export function save_companyInfo(payload: ICompanyInfo) {
  return {
    type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO,
    payload,
  };
}

export function save_signInInfo(payload: ISignIn) {
  return {
    type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO,
    payload,
  };
}
export function save_bankAccouts(payload: IBank) {
  return {
    type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS,
    payload,
  };
}
export function saveWFManagement(payload: IWorkflowManagement) {
  return {
    type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT,
    payload,
  };
}
export function saveCommunication(payload: ICommunication) {
  return {
    type: CreateUserProfileActionTypes.SAVE_COMMUNICATION,
    payload,
  };
}

export function makeCompanyInfoEditable() {
  return {
    type: CreateUserProfileActionTypes.EDIT_COMPANY_INFO,
  };
}

export function makeSignInEditable() {
  return {
    type: CreateUserProfileActionTypes.EDIT_SIGN_IN,
  };
}
export function editBankAccount(payload: IBank) {
  return {
    type: CreateUserProfileActionTypes.EDIT_BANK_ACCOUNTS,
    bank: payload,
  };
}

export function makeWFManagementEditable(payload: IWorkflowManagement) {
  return {
    type: CreateUserProfileActionTypes.EDIT_WORKFORCE_MANAGEMENT,
    payload,
  };
}
export function addBankAccount() {
  return {
    type: CreateUserProfileActionTypes.ADD_BANK_ACCOUNT,
    //payload,
  };
}
export function closeBankForm() {
  return {
    type: CreateUserProfileActionTypes.CLOSE_BANK_FORM,
    //	payload,
  };
}
export function openBankForm() {
  return {
    type: CreateUserProfileActionTypes.OPEN_BANK_FORM,
    //payload,
  };
}

export function get_workflow_data(userProfileId: string) {
  return {
    type: CreateUserProfileActionTypes.GET_WORKFLOW_DATA,
    payload: { userProfileId },
  };
}

export function update_workflow_data(values: IWorkflowManagementDetails) {
  return {
    type: CreateUserProfileActionTypes.UPDATE_WORKFLOW_DATA,
    payload: values,
  };
}

export function update_close() {
  return {
    type: CreateUserProfileActionTypes.UPDATE_CLOSE,
  };
}
