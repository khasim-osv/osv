import {
  get_pageData,
  getUserProfileData,
  save_companyInfo,
  save_signInInfo,
  save_bankAccouts,
  saveCommunication,
  makeCompanyInfoEditable,
  makeSignInEditable,
  editBankAccount,
  addBankAccount,
  closeBankForm,
  openBankForm,
} from "../CreateUserProfile.action";
import {
  CreateUserProfileActionTypes,
  ICompanyInfo,
  ISignIn,
  IBank,
  ICommunication,
} from "../CreateUserProfile.actionTypes";

describe("<CreateUserProfileComponent /> action", () => {
  it("Create UserProfile page action to get the master data required for the page", () => {
    const expectedAction = {
      type: CreateUserProfileActionTypes.GET_PAGE_DATA,
    };
    expect(get_pageData()).toEqual(expectedAction);
  });

  it("Translation action for getting user profile", () => {
    const _id = "anyId";
    const expectedAction = {
      type: CreateUserProfileActionTypes.GET_USER_PROFILE,
      _id,
    };
    expect(getUserProfileData(_id)).toEqual(expectedAction);
  });

  it("Create user profile action to save company info", () => {
    const mockCompanyInfo: ICompanyInfo = {
      companyName: "Jazeera",
      companyNameAr: "Jazeera",
      groupId: "id",
      address: "Riyadh",
      businessType: "Oil & Paints",
      licenceTypeId: "id",
      erpService: "id",
      communication: false,
    };
    const expectedAction = {
      type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO,
      payload: mockCompanyInfo,
    };
    expect(save_companyInfo(mockCompanyInfo)).toEqual(expectedAction);
  });

  it("Create user profile action to save signin info", () => {
    const mockSignInData: ISignIn = {
      userId: "admin",
      email: "teja@onesingleview.com",
      phCode: "+966",
      phone: "6782728822",
      twoStepVerification: true,
    };
    const expectedAction = {
      type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO,
      payload: mockSignInData,
    };
    expect(save_signInInfo(mockSignInData)).toEqual(expectedAction);
  });
  it("Create user profile action to save bank accounts", () => {
    const mockBankData: IBank = {
      bank: "The Saudi British Bank",
      userID: "Admin",
      password: "123456",
    };
    const expectedAction = {
      type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS,
      payload: mockBankData,
    };
    expect(save_bankAccouts(mockBankData)).toEqual(expectedAction);
  });

  it("Create user profile action to save communication", () => {
    const commn: ICommunication = {
      enableCommunication: true,
    };
    const expectedAction = {
      type: CreateUserProfileActionTypes.SAVE_COMMUNICATION,
      payload: commn,
    };
    expect(saveCommunication(commn)).toEqual(expectedAction);
  });

  it("Create UserProfile page action to get the master data required for the page", () => {
    const expectedAction = {
      type: CreateUserProfileActionTypes.GET_PAGE_DATA,
    };
    expect(get_pageData()).toEqual(expectedAction);
  });

  it("Create UserProfile page action to get the master data required for the page", () => {
    const expectedAction = {
      type: CreateUserProfileActionTypes.EDIT_COMPANY_INFO,
    };
    expect(makeCompanyInfoEditable()).toEqual(expectedAction);
  });

  it("Create UserProfile page action to get the master data required for the page", () => {
    const expectedAction = {
      type: CreateUserProfileActionTypes.EDIT_SIGN_IN,
    };
    expect(makeSignInEditable()).toEqual(expectedAction);
  });
  it("Create UserProfile page action to get the master data required for the page", () => {
    const mockBankData: IBank = {
      bank: "The Saudi British Bank",
      userID: "Admin",
      password: "123456",
    };
    const expectedAction = {
      type: CreateUserProfileActionTypes.EDIT_BANK_ACCOUNTS,
      bank: mockBankData,
    };
    expect(editBankAccount(mockBankData)).toEqual(expectedAction);
  });

  it("Create UserProfile page action to add a bank account", () => {
    const expectedAction = {
      type: CreateUserProfileActionTypes.ADD_BANK_ACCOUNT,
    };
    expect(addBankAccount()).toEqual(expectedAction);
  });
  it("Create UserProfile page action to close bank form", () => {
    const expectedAction = {
      type: CreateUserProfileActionTypes.CLOSE_BANK_FORM,
    };
    expect(closeBankForm()).toEqual(expectedAction);
  });
  it("Create UserProfile page action to open bank form", () => {
    const expectedAction = {
      type: CreateUserProfileActionTypes.OPEN_BANK_FORM,
    };
    expect(openBankForm()).toEqual(expectedAction);
  });
});
