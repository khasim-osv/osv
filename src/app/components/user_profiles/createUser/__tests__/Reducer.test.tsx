import {
  saveCompanyInfo_reducer,
  saveSignInInfo_reducer,
  saveBankAccouts_reducer,
  saveCommunication_reducer,
  getPageData_reducer,
  getRoles_reducer,
  getUsers_reducer,
} from "../CreateUserProfile.reducer";
import {
  defaultCompanyInfoState,
  defaultSignInState,
  defaultBankAccountsState,
  CreateUserProfileActionTypes,
  IPageData,
} from "../CreateUserProfile.actionTypes";

describe("CreateUserProfile  saveCompanyInfo_reducer", () => {
  it("CreateUP reducer case SAVE_COMPANY_INFO", () => {
    expect(
      saveCompanyInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO,
      })
    ).toEqual({
      loading: true,
    });
  });
  it("CreateUP reducer case SAVE_COMPANY_INFO_SUCCESS", () => {
    let saveCompanyInfo = defaultCompanyInfoState;
    expect(
      saveCompanyInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS,
        saveCompanyInfo,
      })
    ).toEqual({
      loading: false,
      saved: true,
      ...saveCompanyInfo,
    });
  });
  it("CreateUP reducer case SAVE_COMPANY_INFO_FAILED", () => {
    let saveCompanyInfo = defaultCompanyInfoState;
    expect(
      saveCompanyInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED,
        saveCompanyInfo,
      })
    ).toEqual({
      loading: false,
      saved: false,
      ...saveCompanyInfo,
    });
  });
  it("CreateUP reducer case EDIT_COMPANY_INFO", () => {
    expect(
      saveCompanyInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.EDIT_COMPANY_INFO,
      })
    ).toEqual({
      ...defaultCompanyInfoState,
      saved: undefined,
    });
  });
  it("CreateUP reducer case RESET_COMPANY_INFO", () => {
    expect(
      saveCompanyInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.RESET_COMPANY_INFO,
      })
    ).toEqual(defaultCompanyInfoState);
  });
});

describe("CreateUserProfile  saveSignInInfo_reducer", () => {
  it("CreateUP reducer case SAVE_SIGNIN_INFO", () => {
    expect(
      saveSignInInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO,
      })
    ).toEqual({
      loading: true,
    });
  });
  it("CreateUP reducer case SAVE_SIGNIN_INFO", () => {
    let saveSignInInfo = defaultSignInState;
    expect(
      saveSignInInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS,
        saveSignInInfo,
      })
    ).toEqual({
      loading: false,
      saved: true,
      ...saveSignInInfo,
    });
  });
  it("CreateUP reducer case SAVE_SIGNIN_INFO_FAILED", () => {
    let saveSignInInfo = defaultSignInState;
    expect(
      saveSignInInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED,
        saveSignInInfo,
      })
    ).toEqual({
      loading: false,
      saved: false,
      ...saveSignInInfo,
    });
  });
  it("CreateUP reducer case EDIT_SIGN_IN", () => {
    expect(
      saveSignInInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.EDIT_SIGN_IN,
      })
    ).toEqual({
      ...defaultSignInState,
      saved: undefined,
    });
  });
  it("CreateUP reducer case RESET_SIGN_IN", () => {
    expect(
      saveSignInInfo_reducer(undefined, {
        type: CreateUserProfileActionTypes.RESET_SIGN_IN,
      })
    ).toEqual(defaultSignInState);
  });
});

describe("CreateUserProfile  saveBankAccouts_reducer", () => {
  it("CreateUP reducer case SAVE_BANK_ACCOUNTS", () => {
    expect(
      saveBankAccouts_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS,
      })
    ).toEqual({
      loading: true,
      ...defaultBankAccountsState,
    });
  });
  it("CreateUP reducer case SAVE_BANK_ACCOUNTS_SUCCESS", () => {
    /* let saveBankAccounts = {
      ...defaultBankAccountsState,
      userID: "",
      password: "",
    }; */
    let saveBankAccounts = {
      ...defaultBankAccountsState,
      bankId: "",
      accountId: "",
      password: "",
    };
    expect(
      saveBankAccouts_reducer(defaultBankAccountsState, {
        type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_SUCCESS,
        saveBankAccounts,
        //  banks: [saveBankAccounts].concat(defaultBankAccountsState.banks),
      })
    ).toEqual({
      //  ...saveBankAccounts,
      banks: [saveBankAccounts],
      loading: false,
      saved: true,
    });
  });
  it("CreateUP reducer case SAVE_BANK_ACCOUNTS_FAILED", () => {
    let saveBankAccounts = {
      ...defaultBankAccountsState,
      bankId: "",
      accountId: "",
      password: "",
    };
    expect(
      saveBankAccouts_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED,
        saveBankAccounts,
      })
    ).toEqual({
      loading: false,
      saved: false,
      ...saveBankAccounts,
    });
  });
  it("CreateUP reducer case EDIT_BANK_ACCOUNTS", () => {
    expect(
      saveBankAccouts_reducer(defaultBankAccountsState, {
        type: CreateUserProfileActionTypes.EDIT_BANK_ACCOUNTS,
        bank: defaultBankAccountsState.selectedBank,
      })
    ).toEqual({
      ...defaultBankAccountsState,
      showBankForm: true,
      selectedBank: defaultBankAccountsState.selectedBank,
      load: true,
    });
  });
  it("CreateUP reducer case RESET_BANK_ACCOUNTS", () => {
    expect(
      saveBankAccouts_reducer(undefined, {
        type: CreateUserProfileActionTypes.RESET_BANK_ACCOUNTS,
      })
    ).toEqual(defaultBankAccountsState);
  });
  it("CreateUP reducer case ADD_BANK_ACCOUNT", () => {
    expect(
      saveBankAccouts_reducer(undefined, {
        type: CreateUserProfileActionTypes.ADD_BANK_ACCOUNT,
      })
    ).toEqual({ ...defaultBankAccountsState, showBankForm: true });
  });
  it("CreateUP reducer case CLOSE_BANK_FORM", () => {
    expect(
      saveBankAccouts_reducer(undefined, {
        type: CreateUserProfileActionTypes.CLOSE_BANK_FORM,
      })
    ).toEqual({ ...defaultBankAccountsState, showBankForm: false });
  });
  it("CreateUP reducer case OPEN_BANK_FORM", () => {
    expect(
      saveBankAccouts_reducer(undefined, {
        type: CreateUserProfileActionTypes.OPEN_BANK_FORM,
      })
    ).toEqual({
      ...defaultBankAccountsState,
      showBankForm: true,
      selectedBank: {
        bankId: "",
        accountId: "",
        password: "",
        /*biometric:""*/
      },
    });
  });
});

describe("CreateUserProfile  saveCommunication_reducer", () => {
  it("CreateUP reducer case SAVE_BANK_ACCOUNTS", () => {
    expect(
      saveCommunication_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_COMMUNICATION,
      })
    ).toEqual({
      loading: true,
    });
  });
  it("CreateUP reducer case SAVE_COMMUNICATION_SUCCESS", () => {
    expect(
      saveCommunication_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_SUCCESS,
        saveCommunication: true,
      })
    ).toEqual({
      loading: false,
      saved: true,
    });
  });
  it("CreateUP reducer case SAVE_COMMUNICATION_FAILED", () => {
    expect(
      saveCommunication_reducer(undefined, {
        type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED,
        saveCommunication: true,
      })
    ).toEqual({
      loading: false,
      saved: false,
    });
  });
});

describe("CreateUserProfile  getPageData_reducer", () => {
  const defaultState: IPageData = {
    licenses: {},
    groups: {},
    banks: {},
    categories: [],
  };

  it("GET_PAGE_DATA", () => {
    expect(
      getPageData_reducer(undefined, {
        type: CreateUserProfileActionTypes.GET_PAGE_DATA,
      })
    ).toEqual({
      loading: true,
      ...defaultState,
    });
  });
  it("GET_PAGE_DATA_SUCCESS", () => {
    expect(
      getPageData_reducer(undefined, {
        type: CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS,
        pageData: defaultState,
      })
    ).toEqual({
      loading: false,
      ...defaultState,
    });
  });
  it("GET_PAGE_DATA_FAILED", () => {
    expect(
      getPageData_reducer(undefined, {
        type: CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED,
      })
    ).toEqual({
      loading: false,
      ...defaultState,
    });
  });
});

describe("CreateUserProfile  getRoles_reducer", () => {
  it("GET_ROLES", () => {
    expect(
      getRoles_reducer(undefined, {
        type: CreateUserProfileActionTypes.GET_ROLES,
        roles: [],
      })
    ).toEqual([]);
  });
  it("RESET_ROLES", () => {
    expect(
      getRoles_reducer(undefined, {
        type: CreateUserProfileActionTypes.RESET_ROLES,
      })
    ).toEqual([]);
  });
});

describe("CreateUserProfile  getUsers_reducer", () => {
  it("GET_USERS", () => {
    expect(
      getUsers_reducer(undefined, {
        type: CreateUserProfileActionTypes.GET_USERS,
        users: [],
      })
    ).toEqual([]);
  });
  it("RESET_USERS", () => {
    expect(
      getUsers_reducer(undefined, {
        type: CreateUserProfileActionTypes.RESET_USERS,
      })
    ).toEqual([]);
  });
});
