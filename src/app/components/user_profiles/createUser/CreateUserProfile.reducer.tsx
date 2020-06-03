import {
  CreateUserProfileActionTypes,
  defaultCompanyInfoState,
  defaultSignInState,
  defaultBankAccountsState,
  IPageData,
  ICompanyInfoState,
  ISignInState,
  CreateUserProfileReducerActions,
  SignInReducerActions,
  BankAccountsReducerActions,
  IBankState,
  WorkflowManagementReducerActions,
  IWorkflowManagementState,
  ICommunicationState,
  communicationReducerActions,
  IRole,
  IUser,
  IWorkflowManagementData,
  IWorkflowManagementDetails,
  workFlowinitialState,
} from "./CreateUserProfile.actionTypes";

export const getPageData_reducer = (
  state: IPageData = { licenses: {}, groups: {}, banks: {}, categories: [] },
  action: CreateUserProfileReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.GET_PAGE_DATA:
      return {
        loading: true,
        ...state,
      };
    case CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS:
      return {
        loading: false,
        ...action.pageData,
      };

    case CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED: {
      return {
        loading: false,
        ...state,
      };
    }
    default:
      return state;
  }
};

export const saveCompanyInfo_reducer = (
  state: ICompanyInfoState = defaultCompanyInfoState,
  action: CreateUserProfileReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.SAVE_COMPANY_INFO:
      return {
        loading: true,
      };
    case CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS:
      return {
        loading: false,
        saved: true,
        ...action.saveCompanyInfo,
      };

    case CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED: {
      return {
        loading: false,
        saved: false,
        ...action.saveCompanyInfo,
      };
    }
    case CreateUserProfileActionTypes.EDIT_COMPANY_INFO: {
      return {
        ...state,
        editState: true,
        load: true,
      };
    }
    case CreateUserProfileActionTypes.RESET_COMPANY_INFO:
      return defaultCompanyInfoState;
    default:
      return state;
  }
};

export const saveSignInInfo_reducer = (
  state: ISignInState = defaultSignInState,
  action: SignInReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.SAVE_SIGNIN_INFO:
      return {
        loading: true,
      };
    case CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS:
      return {
        loading: false,
        saved: true,
        ...action.saveSignInInfo,
      };

    case CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED: {
      return {
        loading: false,
        saved: false,
        ...action.saveSignInInfo,
      };
    }
    case CreateUserProfileActionTypes.EDIT_SIGN_IN: {
      return {
        ...state,
        editState: true,
        load: true,
      };
    }
    case CreateUserProfileActionTypes.RESET_SIGN_IN:
      return defaultSignInState;
    default:
      return state;
  }
};

export const saveBankAccouts_reducer = (
  state: IBankState = defaultBankAccountsState,
  action: BankAccountsReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS:
      return {
        loading: true,
        ...state,
      };
    case CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_SUCCESS:
      return {
        loading: false,
        saved: true,
        // ...action.saveBankAccounts,
        banks: [action.saveBankAccounts].concat(state.banks),
        // banks: [action.saveBankAccounts],
      };

    case CreateUserProfileActionTypes.UPDATE_BANK_ACCOUNTS_SUCCESS:
      return {
        loading: false,
        saved: true,
        banks: state.banks.map((bank) =>
          action.updatedBankAcc._id === bank._id ? action.updatedBankAcc : bank
        ),
      };
    case CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED: {
      return {
        loading: false,
        saved: false,
        ...action.saveBankAccounts,
      };
    }
    case CreateUserProfileActionTypes.LOAD_BANK_ACCOUNTS:
      return {
        ...state,
        load: true,
        saved: true,
        ...action.saveBankAccounts,
      };
    case CreateUserProfileActionTypes.EDIT_BANK_ACCOUNTS: {
      console.log("action.bank", action.bank);
      return {
        //...action.saveBankAccounts,
        ...state,
        load: true,
        showBankForm: true,
        selectedBank: action.bank,
      };
    }

    case CreateUserProfileActionTypes.ADD_BANK_ACCOUNT: {
      return {
        //  ...action.saveCompanyInfo,
        ...state,
        showBankForm: true,
        // banks:Object.assign([{a:2}],action.bank)
        //banks:[action.bank].concat(state.banks)
      };
    }
    case CreateUserProfileActionTypes.CLOSE_BANK_FORM: {
      return {
        //  ...action.saveCompanyInfo,
        ...state,
        showBankForm: false,
      };
    }
    case CreateUserProfileActionTypes.OPEN_BANK_FORM: {
      return {
        //  ...action.saveCompanyInfo,
        ...state,
        //...defaultBankAccountsState,
        showBankForm: true,
        selectedBank: {
          bankId: "",
          accountId: "",
          password: "",
          /*biometric:""*/
        },
      };
    }

    case CreateUserProfileActionTypes.RESET_BANK_ACCOUNTS: {
      return defaultBankAccountsState;
    }
    default:
      return state;
  }
};

export const saveWFManagement_reducer = (
  state: IWorkflowManagementState = {},
  action: WorkflowManagementReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT:
      return {
        loading: true,
      };
    case CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_SUCCESS:
      return {
        loading: false,
        saved: true,
        ...action.saveWFManagement,
      };

    case CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_FAILED: {
      return {
        loading: false,
        saved: false,
        ...action.saveWFManagement,
      };
    }
    case CreateUserProfileActionTypes.EDIT_WORKFORCE_MANAGEMENT: {
      return {
        saved: !state.saved,
        ...action.saveWFManagement,
      };
    }
    default:
      return state;
  }
};
export const saveCommunication_reducer = (
  state: ICommunicationState = {},
  action: communicationReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.SAVE_COMMUNICATION:
      return {
        loading: true,
      };
    case CreateUserProfileActionTypes.SAVE_COMMUNICATION_SUCCESS:
      return {
        loading: false,
        saved: true,
        // ...action.saveCommunication,
      };

    case CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED: {
      return {
        loading: false,
        saved: false,
        // ...action.saveCommunication,
      };
    }
    default:
      return state;
  }
};

export const getRoles_reducer = (
  state: IRole[] = [],
  action: CreateUserProfileReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.GET_ROLES: {
      // return Object.assign([], action.roles);
      return [...action.roles];
    }
    case CreateUserProfileActionTypes.RESET_ROLES: {
      return [];
    }
    default:
      return state;
  }
};
export const getUsers_reducer = (
  state: IUser[] = [],
  action: CreateUserProfileReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.GET_USERS: {
      //   return Object.assign([], action.users);
      return [...action.users];
    }
    case CreateUserProfileActionTypes.RESET_USERS: {
      return [];
    }
    default:
      return state;
  }
};

export const getWorkflowData_reducer = (
  state: IWorkflowManagementData = workFlowinitialState,
  action: CreateUserProfileReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.GET_WORKFLOW_DATA:
      return {
        loading: true,
      };
    case CreateUserProfileActionTypes.GET_WORKFLOW_SUCCEEDED:
      return {
        loading: false,
        ...action.getWorkflowData,
      };

    case CreateUserProfileActionTypes.GET_WORKFLOW_FAILED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const updateWorkflowData_reducer = (
  state: IWorkflowManagementData = workFlowinitialState,
  action: CreateUserProfileReducerActions
) => {
  switch (action.type) {
    case CreateUserProfileActionTypes.UPDATE_WORKFLOW_DATA:
      return {
        loading: true,
      };
    case CreateUserProfileActionTypes.UPDATE_WORKFLOW_SUCCEEDED:
      return {
        loading: false,
        ...action.updateWorkflowData,
      };

    case CreateUserProfileActionTypes.UPDATE_WORKFLOW_FAILED: {
      return {
        loading: false,
      };
    }
    case CreateUserProfileActionTypes.UPDATE_CLOSE: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
export const breadcrumb_reducer = (state = [], action) => {
  console.log("breadcrumb_reducer", action);
  switch (action.type) {
    case "SET_BREADCRUMB_ITEMS":
      return action.items;
    default:
      return state;
  }
};
