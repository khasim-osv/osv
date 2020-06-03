import { put, takeLatest } from "redux-saga/effects";
import {
  saveCompanyInfoWatcher,
  saveCompanyInfo,
  saveSignInInfoWatcher,
  saveSignInInInfo,
  saveBankAccountsInfoWatcher,
  saveBankAccountsInfo,
  saveCommunication,
  saveCommunicationWatcher,
  getPageDataWatcher,
  getPageData,
  getUserProfileWatcher,
  getUserProfile,
} from "../CreateUserProfile.saga";
import {
  CreateUserProfileActionTypes,
  defaultCompanyInfoState,
  defaultSignInState,
  defaultBankAccountsState,
} from "../CreateUserProfile.actionTypes";

export interface IProps {
  payload: any;
  action: any;
  type: any;
}

describe("<CreateUserProfile /> saga", () => {
  it('CreateUserProfile saga dispatch action "SAVE_COMPANY_INFO" ', () => {
    const generator = saveCompanyInfoWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        CreateUserProfileActionTypes.SAVE_COMPANY_INFO,
        saveCompanyInfo
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_COMPANY_INFO_SUCCESS"', () => {
    const mockResponse: any = [];

    const generator = saveCompanyInfo({ payload: defaultCompanyInfoState });

    generator.next();

    const response = { data: { data: mockResponse }, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS,
        saveCompanyInfo: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_COMPANY_INFO_FAILED"', () => {
    const mockResponse: any = [];

    const generator = saveCompanyInfo({
      payload: defaultCompanyInfoState,
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: false },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED,
        saveCompanyInfo: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_COMPANY_INFO" on error thrown', () => {
    const generator = saveCompanyInfo({
      payload: defaultCompanyInfoState,
    });

    generator.next();

    const nextResponse = generator.throw("error");

    // const nextResponse = generator.next().value;

    expect(nextResponse.value).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED,
        saveCompanyInfo: { success: false, data: [] },
      })
    );
  });
  it('CreateUserProfile saga dispatch action "SAVE_SIGNIN_INFO" ', () => {
    const generator = saveSignInInfoWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        CreateUserProfileActionTypes.SAVE_SIGNIN_INFO,
        saveSignInInInfo
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_SIGNIN_INFO_SUCCESS"', () => {
    const mockResponse: any = [];

    const generator = saveSignInInInfo({
      payload: defaultSignInState,
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS,
        saveSignInInfo: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_SIGNIN_INFO_FAILED"', () => {
    const mockResponse: any = [];

    const generator = saveSignInInInfo({
      payload: defaultSignInState,
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: false },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED,
        saveSignInInfo: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_SIGNIN_INFO" on error thrown', () => {
    const generator = saveSignInInInfo({
      payload: defaultSignInState,
    });

    generator.next();

    const nextResponse = generator.throw("error");

    // const nextResponse = generator.next().value;

    expect(nextResponse.value).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED,
        saveSignInInfo: { success: false, data: [] },
      })
    );
  });
  it('CreateUserProfile saga dispatch action "SAVE_BANK_ACCOUNTS" ', () => {
    const generator = saveBankAccountsInfoWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS,
        saveBankAccountsInfo
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_BANK_ACCOUNTS_SUCCESS"', () => {
    const mockResponse: any = [];

    const generator = saveBankAccountsInfo({
      type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS,
      payload: defaultBankAccountsState,
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_SUCCESS;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_SUCCESS,
        saveBankAccounts: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_BANK_ACCOUNTS_FAILED"', () => {
    const mockResponse: any = [];

    const generator = saveBankAccountsInfo({
      payload: defaultBankAccountsState,
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: false },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED,
        saveBankAccounts: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_BANK_ACCOUNTS" on error thrown', () => {
    const generator = saveBankAccountsInfo({
      payload: defaultBankAccountsState,
    });

    generator.next();

    const nextResponse = generator.throw("error");

    // const nextResponse = generator.next().value;

    expect(nextResponse.value).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED,
        saveBankAccounts: { success: false, data: [] },
      })
    );
  });

  it('CreateUserProfile saga dispatch action "SAVE_COMMUNICATION" ', () => {
    const generator = saveCommunicationWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        CreateUserProfileActionTypes.SAVE_COMMUNICATION,
        saveCommunication
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_COMMUNICATION_SUCCESS"', () => {
    const mockResponse: any = [];

    const generator = saveCommunication({
      type: CreateUserProfileActionTypes.SAVE_COMMUNICATION,
      payload: {},
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_COMMUNICATION_SUCCESS;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_SUCCESS,
        saveCommunication: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_COMMUNICATION_FAILED"', () => {
    const mockResponse: any = [];

    const generator = saveCommunication({
      payload: {},
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: false },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED,
        saveCommunication: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('CreateUserProfile saga dispatch action "SAVE_COMMUNICATION" on error thrown', () => {
    const generator = saveCommunication({
      payload: {},
    });

    generator.next();

    const nextResponse = generator.throw("error");

    // const nextResponse = generator.next().value;

    expect(nextResponse.value).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED,
        saveCommunication: { success: false, data: [] },
      })
    );
  });

  it('CreateUserProfile saga dispatch action "GET_PAGE_DATA" ', () => {
    const generator = getPageDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(CreateUserProfileActionTypes.GET_PAGE_DATA, getPageData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("CreateUserProfile saga dispatch action getPageData method", () => {
    const mockResponse: any = [];

    const generator = getPageData();

    //generator.next();

    let response = { data: { data: [] }, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.RESET_COMPANY_INFO;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.RESET_COMPANY_INFO,
      })
    );
    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.RESET_SIGN_IN;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.RESET_SIGN_IN,
      })
    );
    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.RESET_BANK_ACCOUNTS;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.RESET_BANK_ACCOUNTS,
      })
    );
    nextResponse.payload.action.type = CreateUserProfileActionTypes.RESET_ROLES;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.RESET_ROLES,
      })
    );
    nextResponse.payload.action.type = CreateUserProfileActionTypes.RESET_USERS;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.RESET_USERS,
      })
    );

    // generator.next();

    // nextResponse: any = generator.next(response).value;

    nextResponse = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS,
        // pageData: mockResponse,
      })
    );
    response = { data: { data: [] }, success: false };
    nextResponse = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED;
    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED,
        // pageData: mockResponse,
      })
    );
    //expect(generator.next().done).toBeTruthy();
  });

  it("CreateUserProfile saga dispatch action getPageData method on error thrown", () => {
    const generator = getPageData();
    generator.next();
    const nextResponse = generator.throw("error");

    expect(nextResponse.value).toEqual(
      put({
        type: CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED,
      })
    );
  });
});

describe("getUserProfileWatcher saga", () => {
  it("CreateUserProfile saga dispatch action getUserProfileWatcher ", () => {
    const generator = getUserProfileWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(CreateUserProfileActionTypes.GET_USER_PROFILE, getUserProfile)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("CreateUserProfile saga dispatch action getUserProfile", () => {
    const mockResponse: any = [];

    const generator = getUserProfile({
      _id: "0",
      /* type: CreateUserProfileActionTypes.GET_USER_PROFILE,
      payload: {}, */
    });

    /* let someResp =  */ generator.next();

    let response = {
      data: {
        pageData: mockResponse,
        success: true,
        companyInfoData: defaultCompanyInfoState,
        signInInfoData: defaultSignInState,
        bankAccounts: defaultBankAccountsState,
        roles: [],
        users: [],
      },
    };
    let nextResponse: any = generator.next(response).value;

    console.log("nextResponse value", nextResponse);
    /* nextResponse.payload.action.type =
      CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS; */

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS,
        pageData: mockResponse,
      })
    );
    expect(generator.next().value).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS,
        saveCompanyInfo: {
          ...defaultCompanyInfoState,
          load: true,
        },
      })
    );
    expect(generator.next().value).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS,
        saveSignInInfo: {
          ...defaultSignInState,
          load: true,
        },
      })
    );
    expect(generator.next().value).toEqual(
      put({
        type: CreateUserProfileActionTypes.LOAD_BANK_ACCOUNTS,
        saveBankAccounts: defaultBankAccountsState,
      })
    );
    expect(generator.next().value).toEqual(
      put({
        type: CreateUserProfileActionTypes.GET_ROLES,
        roles: [],
      })
    );
    expect(generator.next().value).toEqual(
      put({
        type: CreateUserProfileActionTypes.GET_USERS,
        users: [],
      })
    );
    expect(generator.next().value).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_SUCCESS,
        saveWFManagement: { success: true, load: true },
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it("CreateUserProfile saga dispatch action getUserProfile on failure", () => {
    const generator = getUserProfile({
      _id: "0",
      /* type: CreateUserProfileActionTypes.GET_USER_PROFILE,
      payload: {}, */
    });

    generator.next();

    let nextResponse = generator.throw("error");
    expect(nextResponse.value).toEqual(
      put({
        type: CreateUserProfileActionTypes.GET_USER_PROFILE_FAILED,
        pageData: { success: false, data: [] },
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
