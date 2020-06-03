import {
  Modules,
  IModules,
} from "../role_management/RoleManagement.actionTypes";
import {
  IProfileUsers,
  IProfileUsersData,
} from "../user_management/UserManagement.actionTypes";

export enum CreateUserProfileActionTypes {
  GET_PAGE_DATA = "GET_PAGE_DATA",
  GET_PAGE_DATA_SUCCESS = "GET_PAGE_DATA_SUCCESS",
  GET_PAGE_DATA_FAILED = "GET_PAGE_DATA_FAILED",
  SAVE_COMPANY_INFO = "SAVE_COMPANY_INFO",
  SAVE_COMPANY_INFO_SUCCESS = "SAVE_COMPANY_INFO_SUCCESS",
  SAVE_COMPANY_INFO_FAILED = "SAVE_COMPANY_INFO_FAILED",
  SAVE_SIGNIN_INFO = "SAVE_SIGNIN_INFO",
  SAVE_SIGNIN_INFO_SUCCESS = "SAVE_SIGNIN_INFO_SUCCESS",
  SAVE_SIGNIN_INFO_FAILED = "SAVE_SIGNIN_INFO_FAILED",
  EDIT_COMPANY_INFO = "EDIT_COMPANY_INFO",
  SAVE_BANK_ACCOUNTS = "SAVE_BANK_ACCOUNTS",
  SAVE_BANK_ACCOUNTS_SUCCESS = "SAVE_BANK_ACCOUNTS_SUCCESS",
  SAVE_BANK_ACCOUNTS_FAILED = "SAVE_BANK_ACCOUNTS_FAILED",
  UPDATE_BANK_ACCOUNTS_SUCCESS = "UPDATE_BANK_ACCOUNTS_SUCCESS",
  EDIT_BANK_ACCOUNTS = "EDIT_BANK_ACCOUNTS",
  EDIT_SIGN_IN = "EDIT_SIGN_IN",
  SAVE_WORKFORCE_MANAGEMENT = "SAVE_WORKFORCE_MANAGEMENT",
  SAVE_WORKFORCE_MANAGEMENT_SUCCESS = "SAVE_WORKFORCE_MANAGEMENT_SUCCESS",
  SAVE_WORKFORCE_MANAGEMENT_FAILED = "SAVE_WORKFORCE_MANAGEMENT_FAILED",
  EDIT_WORKFORCE_MANAGEMENT = "EDIT_WORKFORCE_MANAGEMENT",
  SAVE_COMMUNICATION = "SAVE_COMMUNICATION",
  SAVE_COMMUNICATION_SUCCESS = "SAVE_COMMUNICATION_SUCCESS",
  SAVE_COMMUNICATION_FAILED = "SAVE_COMMUNICATION_FAILED",
  GET_USER_PROFILE = "GET_USER_PROFILE",
  GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS",
  GET_USER_PROFILE_FAILED = "GET_USER_PROFILE_FAILED",
  GET_ROLES = "GET_ROLES",
  GET_USERS = "GET_USERS",
  ADD_BANK_ACCOUNT = "ADD_BANK_ACCOUNT",
  CLOSE_BANK_FORM = "CLOSE_BANK_FORM",
  OPEN_BANK_FORM = "OPEN_BANK_FORM",
  RESET_COMPANY_INFO = "RESET_COMPANY_INFO",
  RESET_SIGN_IN = "RESET_SIGN_IN",
  RESET_BANK_ACCOUNTS = "RESET_BANK_ACCOUNTS",
  LOAD_BANK_ACCOUNTS = "LOAD_BANK_ACCOUNTS",
  RESET_ROLES = "RESET_ROLES",
  RESET_USERS = "RESET_USERS",
  GET_WORKFLOW_DATA = "GET_WORKFLOW_DATA",
  GET_WORKFLOW_SUCCEEDED = "GET_WORKFLOW_SUCCEEDED",
  GET_WORKFLOW_FAILED = "GET_WORKFLOW_FAILED",
  UPDATE_WORKFLOW_DATA = "UPDATE_WORKFLOW_DATA",
  UPDATE_WORKFLOW_SUCCEEDED = "UPDATE_WORKFLOW_SUCCEEDED",
  UPDATE_WORKFLOW_FAILED = "UPDATE_WORKFLOW_FAILED",
  UPDATE_CLOSE = "UPDATE_CLOSE",
}

export const defaultCompanyInfoState: ICompanyInfoState = {
  companyName: "",
  companyNameAr: "",
  groupId: "",
  address: "",
  businessType: "",
  licenceTypeId: "",
  erpService: "",
  editState: true,
  communication: false,
};

export interface ICompanyInfo {
  _id?: string;
  companyName: string;
  companyNameAr: string;
  groupId: IGroupSelect;
  address: string;
  businessType: string;
  licenceTypeId: string;
  erpService: string;
  communication: boolean;
  workflowManagement?: IWorkflowManagement;
  company?: ICompanyValue;
}

export interface IGroupSelect {
  label: string;
  value: string;
  groupName: string;
}
export interface ICompanyInfoState extends ICompanyInfo {
  loading?: boolean;
  success?: boolean;
  load?: boolean;
  saved?: boolean;
  editState?: boolean;
}

export interface ICompanyValue {
  english: string;
  arabic: string;
}

export interface ICompanyInfoSelectField {
  selectId: string;
  value: string;
}
export const defaultSignInState: ISignInState = {
  userId: "",
  email: "",
  phCode: "",
  phone: "",
  twoStepVerification: false,
  editState: true,
  /*biometric:""*/
};

export interface ISignIn {
  _id?: string;
  userId: string;
  email: string;
  phCode: string;
  phone: string;
  twoStepVerification: boolean;
  /*biometric:""*/
  userProfileId?: string;
}

export interface ISignInState extends ISignIn {
  loading?: boolean;
  success?: boolean;
  load?: boolean;
  saved?: boolean;
  editState?: boolean;
}

export const defaultBankAccountsState: IBanks = {
  showBankForm: true,

  selectedBank: {
    //_id: "",
    bankId: "",
    accountId: "",
    password: "",
    /*biometric:""*/
  },
  banks: [],
};
export interface IBanks {
  showBankForm: boolean;

  selectedBank: IBank;
  banks: IBank[];
}

export interface IBank {
  _id?: string;
  bankId: string;
  accountId: string;
  password: string;
  userProfileId?: string;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  modules: Modules[];
}
export interface ILicense {
  _id: string;
  licenseName: string;
}
export interface IBankState extends IBanks {
  loading?: boolean;
  success?: boolean;
  load?: boolean;
  saved?: boolean;
}

/* export interface IBank {
  bank: string;
  _id: string;
}
 */
export interface IPageData {
  licenses: ILicensesMaster /* | {} */;
  //groups: [IGroup] | [];
  groups: IGroupsMaster /* | {} */;
  banks: IBankMaster /* | [] */;
  categories: ICategory[] /* | [] */;
}

export interface ILicensesMaster {
  [_id: string]: ILicense;
}

export interface IGroupsMaster {
  [_id: string]: IGroup;
}
export interface IBankMaster {
  [_id: string]: IBank;
}

export interface IGroup {
  _id: string;
  value: {
    english: string;
    arabic: string;
  };
  groupName: string;
}
export interface ICommunication {
  enableCommunication: boolean;
  userProfileId?: string;
}

export interface ICommunicationState {
  saved?: boolean;
}

export interface IRole {
  roleName: string;
  _id: string;
}

export interface IUser {
  roleName: string;
  _id: string;
  email: string;
}

export const workflowType: IWorkflowManagementDetails = {
  userProfileId: "",
  approvalLimit: {
    currencyCode: "",
    maxLimit: 0,
    workflow: [],
  },
  modulesCategory: [
    {
      categoryId: "",
      modules: [
        {
          moduleId: "",
          workflow: [],
        },
      ],
    },
  ],
};

export const workFlowinitialState: IWorkflowManagementData = {
  loading: false,
  success: false,
  data: workflowType,
};

export interface IWorkflowManagementDetails {
  userProfileId: string;
  approvalLimit: IApprovalLimit;
  modulesCategory: IModulesCategory[];
}

export interface IApprovalLimit {
  currencyCode: string;
  maxLimit: number;
  workflow: string[];
}

export interface IWorkflowManagementData {
  success: boolean;
  loading: boolean;
  data: IWorkflowManagementDetails;
}

export interface IModulesCategory {
  categoryId: string;
  modules: ISubModules[];
}

export interface ISubModules {
  moduleId: string;
  workflow: string[];
}

export interface IWorkflowManagementState {
  loading?: boolean;
  success?: boolean;
  load?: boolean;
  saved?: boolean;
}

export interface IReduxBaseAction {
  type: CreateUserProfileActionTypes;
}

export type CreateUserProfileReducerActions =
  | IRedux_getPageData_Action
  | IRedux_getPageDataSuccess_Action
  | IRedux_getPageDataFail_Action
  | IRedux_saveCompanyInfo_Action
  | IRedux_saveCompanyInfoSuccess_Action
  | IRedux_saveCompanyInfoFail_Action
  | IRedux_editCompanyInfo_Action
  | IRedux_resetCompanyInfo_Action
  | IRedux_getRoles_Action
  | IRedux_resetRoles_Action
  | IRedux_getUsers_Action
  | IRedux_resetUsers_Action
  | IRedux_getWorkflowData_Action
  | IRedux_getWorkflowSuccess_Action
  | IRedux_getWorkflowFailed_Action
  | IRedux_updateWorkflowData_Action
  | IRedux_updateWorkflowSuccess_Action
  | IRedux_updateWorkflowFailed_Action
  | IRedux_UpdateClosed_Action;

export interface IRedux_getPageData_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_PAGE_DATA;
}
export interface IRedux_getPageDataSuccess_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS;
  pageData: IPageData;
}
export interface IRedux_getPageDataFail_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED;
}
export interface IRedux_saveCompanyInfo_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO;
}
export interface IRedux_saveCompanyInfoSuccess_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS;
  saveCompanyInfo: ICompanyInfo;
}
export interface IRedux_saveCompanyInfoFail_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED;
  saveCompanyInfo: ICompanyInfo;
}
export interface IRedux_editCompanyInfo_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.EDIT_COMPANY_INFO;
}

export interface IRedux_resetCompanyInfo_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.RESET_COMPANY_INFO;
}
export interface IRedux_getRoles_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_ROLES;
  roles: IRole[];
}
export interface IRedux_resetRoles_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.RESET_ROLES;
}
export interface IRedux_getUsers_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_USERS;
  users: IUser[];
}
export interface IRedux_resetUsers_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.RESET_USERS;
}

export type SignInReducerActions =
  | IRedux_saveSignIn_Action
  | IRedux_saveSignInSuccess_Action
  | IRedux_saveSignInFail_Action
  | IRedux_editSignIn_Action
  | IRedux_resetSignIn_Action
  | IRedux_twoStepSwitch_Action;

export interface IRedux_saveSignIn_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO;
}
export interface IRedux_saveSignInSuccess_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS;
  saveSignInInfo: ISignIn;
}
export interface IRedux_saveSignInFail_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED;
  saveSignInInfo: ISignIn;
}
export interface IRedux_editSignIn_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.EDIT_SIGN_IN;
}
export interface IRedux_resetSignIn_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.RESET_SIGN_IN;
}
export interface IRedux_twoStepSwitch_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.TWOSTEP_SWITCHED;
  checked: boolean;
}

export type BankAccountsReducerActions =
  | IRedux_saveBankAccounts_Action
  | IRedux_saveBankAccountsSuccess_Action
  | IRedux_saveBankAccountsFail_Action
  | IRedux_editBankAccount_Action
  | IRedux_updateBankAccountsSuccess_Action
  | IRedux_resetBankAccounts_Action
  | IRedux_addBankAccount_Action
  | IRedux_closeBankForm_Action
  | IRedux_openBankForm_Action
  | IRedux_loadBankAccounts_Action;

export interface IRedux_saveBankAccounts_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS;
}
export interface IRedux_saveBankAccountsSuccess_Action
  extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_SUCCESS;
  saveBankAccounts: IBank;
}
export interface IRedux_saveBankAccountsFail_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED;
  saveBankAccounts: IBank;
}
export interface IRedux_editBankAccount_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.EDIT_BANK_ACCOUNTS;
  bank: IBank;
}
export interface IRedux_updateBankAccountsSuccess_Action
  extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.UPDATE_BANK_ACCOUNTS_SUCCESS;
  updatedBankAcc: IBank;
}
export interface IRedux_resetBankAccounts_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.RESET_BANK_ACCOUNTS;
}

export interface IRedux_addBankAccount_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.ADD_BANK_ACCOUNT;
}
export interface IRedux_closeBankForm_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.CLOSE_BANK_FORM;
}
export interface IRedux_openBankForm_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.OPEN_BANK_FORM;
}
export interface IRedux_loadBankAccounts_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.LOAD_BANK_ACCOUNTS;
  saveBankAccounts: IBank;
}

export type WorkflowManagementReducerActions =
  | IRedux_saveWorkflowManagement_Action
  | IRedux_saveWorkflowManagementSuccess_Action
  | IRedux_saveWorkflowManagementFail_Action
  | IRedux_editWorkflowManagement_Action;

export interface IRedux_saveWorkflowManagement_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT;
}
export interface IRedux_saveWorkflowManagementSuccess_Action
  extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_SUCCESS;
  saveWFManagement: IWorkflowManagement;
}
export interface IRedux_saveWorkflowManagementFail_Action
  extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_FAILED;
  saveWFManagement: IWorkflowManagement;
}
export interface IRedux_editWorkflowManagement_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.EDIT_WORKFORCE_MANAGEMENT;
  saveWFManagement: IWorkflowManagement;
}

export type communicationReducerActions =
  | IRedux_saveCommunication_Action
  | IRedux_saveCommunicationSuccess_Action
  | IRedux_saveCommunicationFail_Action;

export interface IRedux_saveCommunication_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_COMMUNICATION;
}
export interface IRedux_saveCommunicationSuccess_Action
  extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_SUCCESS;
  saveCommunication: boolean;
}
export interface IRedux_saveCommunicationFail_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED;
  //saveCommunication: IWorkflowManagement;
  saveCommunication: boolean;
}

export interface IReduxCreateUserProfileState {
  userProfile: AllStates;
}

export interface AllStates {
  createUserPageData: IPageData;
  companyInfoData: ICompanyInfoState;
  signInInfoData: ISignInState;
  bankAccountsInfoData: IBankState;
  workforceMngmntData: IWorkflowManagementState;
  commmunicationData: ICommunicationState;
  roles: [IRole];
  users: [IUser];
  getWorkflowData: IWorkflowManagementData;
  updateWorkflowData: IWorkflowManagementData;
  getAllProfileUsers: IProfileUsersData;
}

export interface IRedux_getWorkflowData_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_WORKFLOW_DATA;
}
export interface IRedux_getWorkflowSuccess_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_WORKFLOW_SUCCEEDED;
  getWorkflowData: IWorkflowManagementData;
}
export interface IRedux_getWorkflowFailed_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.GET_WORKFLOW_FAILED;
  getWorkflowData: IWorkflowManagementData;
}

export interface IRedux_updateWorkflowData_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.UPDATE_WORKFLOW_DATA;
}
export interface IRedux_updateWorkflowSuccess_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.UPDATE_WORKFLOW_SUCCEEDED;
  updateWorkflowData: IWorkflowManagementData;
}
export interface IRedux_updateWorkflowFailed_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.UPDATE_WORKFLOW_FAILED;
  updateWorkflowData: IWorkflowManagementData;
}

export interface IRedux_UpdateClosed_Action extends IReduxBaseAction {
  type: CreateUserProfileActionTypes.UPDATE_CLOSE;
}

export interface ISideMenu {
  id: number;
  name: string;
  link: string;
}

export const SideMenuList: ISideMenu[] = [
  { id: 1, name: "Company Info", link: "companyInfo" },
  { id: 2, name: "Sign in & Security", link: "signInSecurity" },
  { id: 3, name: "Bank Accounts", link: "bankAccounts" },
  { id: 4, name: "Role Management", link: "roleManagement" },
  { id: 5, name: "Workflow Management", link: "workflowManagement" },
  { id: 6, name: "User Management", link: "userManagement" },
  { id: 7, name: "Communications", link: "communications" },
  { id: 8, name: "Data & Privacy", link: "dataPrivacy" },
];

export const CONST_BUSINESS_TYPES = [
  { label: "Oil & Paints", value: "Oil & Paints" },
  { label: "Conglomerates", value: "Conglomerates" },
  { label: "Financials", value: "Financials" },
  { label: "Oil & Gas", value: "Oil & Gas" },
];

export const CONST_ERP_TYPES = [
  { label: "Axapta", value: "Axapta" },
  { label: "SAP", value: "SAP" },
  {
    label: "Oracle Financials",
    value: "Oracle Financials",
  },
  {
    label: "Microsoft Dynamics",
    value: "Microsoft Dynamics",
  },
];
