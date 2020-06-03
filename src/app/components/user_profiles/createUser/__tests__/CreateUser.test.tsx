import React from "react";
import "@testing-library/jest-dom/extend-expect";
//import { render, fireEvent, screen, wait, cleanup } from "./test-utils";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
//import CreateUserProfile, { IProps } from "../CreateUserProfile.component";
import CompanyInfo from "../CompanyInfo.component";
import SignInSecurity from "../SignInSecurity.component";
import BankAccounts from "../BankAccounts.component";
import { toast, ToastContainer } from "react-toastify";

import {
  defaultCompanyInfoState,
  defaultSignInState,
  defaultBankAccountsState,
} from "../CreateUserProfile.actionTypes";

const props = {
  //saveLicense: { success: boolean };
  saveCompanyInfo: jest.fn(),
  getPageData: jest.fn(),
  getUserProfileData: jest.fn(),
  saveClosed: jest.fn(),
  pageData: { licenses: {}, groups: [], banks: [], categories: [] },
  roles: [],
  users: [],
  companyInfoData: defaultCompanyInfoState,
  signInInfoData: defaultSignInState,
  bankAccountsInfoData: defaultBankAccountsState,
  workforceMngmntData: {},
  saveSignInInfo: jest.fn(),
  saveBankAccounts: jest.fn(),
  saveWFManagement: jest.fn(),
  saveCommunication: jest.fn(),
  commmunicationData: { saved: false },
  makeCompanyInfoEditable: jest.fn(),
  makeSignInEditable: jest.fn(),
  editBankAccount: jest.fn(),
  makeWFManagementEditable: jest.fn(),
  addBankAccount: jest.fn(),
  closeBankForm: jest.fn(),
  openBankForm: jest.fn(),
  twoStepSwitched: jest.fn(),
};

afterEach(cleanup);

describe("Create User Profile page CompanyInfo component  test cases", () => {
  const props = {
    licenses: { "0": { _id: "0", licenseName: "Basic" } },
    groups: {
      "0": {
        _id: "0",
        groupName: "Al-Jazeera",
        value: { english: "Al-Jazeera", arabic: "Al-Jazeera" },
      },
    },
    saveCompanyInfo: jest.fn(),
    companyInfoData: defaultCompanyInfoState,
    makeCompanyInfoEditable: jest.fn(),
  };

  test("component renders and throws required validations", async () => {
    const { container, getByText, rerender } = render(
      <>
        <CompanyInfo {...props} />
        {/*  <ToastContainer
          className="toastContainer"
          toastClassName="toastBody"
          hideProgressBar={true}
        /> */}
      </>
    );

    expect(getByText("Company Info")).toBeInTheDocument();

    const licenceTypeId = container.querySelector(
      'input[name="licenceTypeId"]'
    );
    await wait(() => {
      licenceTypeId &&
        fireEvent.change(licenceTypeId, { target: { value: "0" } });
    });

    const submitButton = container.querySelector('button[type="submit"]');

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    expect(getByText("License Type is required")).toBeInTheDocument();
  });

  test("component responds on data save", async () => {
    const { container, getByText, rerender } = render(
      <CompanyInfo {...props} />
    );

    const companyName = container.querySelector('input[name="companyName"]');
    const companyNameAr = container.querySelector(
      'input[name="companyNameAr"]'
    );
    const licenceTypeId = container.querySelector(
      'input[name="licenceTypeId"]'
    );
    const groupId = container.querySelector('input[name="groupId"]');
    const businessType = container.querySelector('input[name="businessType"]');

    await wait(() => {
      companyName &&
        fireEvent.change(companyName, {
          target: {
            value: "Jazeera",
          },
        });
    });
    await wait(() => {
      companyNameAr &&
        fireEvent.change(companyNameAr, {
          target: {
            value: "الجزيرة",
          },
        });
    });
    await wait(() => {
      licenceTypeId &&
        fireEvent.change(licenceTypeId, { target: { value: "0" } });
    });
    await wait(() => {
      groupId && fireEvent.change(groupId, { target: { value: "0" } });
    });
    await wait(() => {
      businessType &&
        fireEvent.change(businessType, { target: { value: "Conglomerates" } });
    });

    const submitButton = container.querySelector('button[type="submit"]');

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    rerender(
      <>
        <CompanyInfo
          {...props}
          companyInfoData={{
            companyName: "Jazeera",
            companyNameAr: "الجزيرة",
            groupId: "",
            address: "",
            businessType: "",
            licenceTypeId: "0",
            erpService: "",
            saved: true,
            load: false,
            company: {
              english: "Jazeera",
              arabic: "الجزيرة",
            },
            communication: false,
          }}
        />
        <ToastContainer
          className="toastContainer"
          toastClassName="toastBody"
          hideProgressBar={true}
        />
      </>
    );

    expect(getByText("Jazeera")).toBeInTheDocument();

    rerender(
      <>
        <CompanyInfo
          {...props}
          companyInfoData={{
            companyName: "Jazeera",
            companyNameAr: "الجزيرة",
            groupId: "",
            address: "",
            businessType: "",
            licenceTypeId: "0",
            erpService: "",
            saved: false,
            load: false,
            company: {
              english: "Jazeera",
              arabic: "الجزيرة",
            },
            communication: false,
          }}
        />
        <ToastContainer
          className="toastContainer"
          toastClassName="toastBody"
          hideProgressBar={true}
        />
      </>
    );
  });

  test("companyInfo   on edit ", async () => {
    const { container, getByText, rerender } = render(
      <CompanyInfo
        {...props}
        companyInfoData={{
          companyName: "Jazeera",
          companyNameAr: "الجزيرة",
          groupId: "",
          address: "",
          businessType: "",
          licenceTypeId: "0",
          erpService: "",
          saved: true,
          load: true,
          company: {
            english: "Jazeera",
            arabic: "الجزيرة",
          },
          communication: false,
        }}
      />
    );

    expect(getByText("Jazeera")).toBeInTheDocument();

    let editBtn = container.querySelector(".editBtn");
    let companyName = container.querySelector('input[name="companyName"]');

    expect(editBtn).toBeInTheDocument();
    expect(companyName).not.toBeInTheDocument();

    await wait(() => {
      editBtn && fireEvent.click(editBtn);
    });

    rerender(
      <CompanyInfo
        {...props}
        companyInfoData={{
          companyName: "Jazeera",
          companyNameAr: "الجزيرة",
          groupId: "",
          address: "",
          businessType: "",
          licenceTypeId: "0",
          erpService: "",
          saved: true,
          load: true,
          company: {
            english: "Jazeera",
            arabic: "الجزيرة",
          },
          communication: false,
          editState: true,
        }}
      />
    );

    await wait(() => {
      companyName = container.querySelector('input[name="companyName"]');
      expect(companyName).toBeInTheDocument();
    });
  });
});

describe("Create User Profile page SignIn component  test cases", () => {
  const props = {
    saveSignInInfo: jest.fn(),
    signInInfoData: defaultSignInState,
    makeSignInEditable: jest.fn(),
    disabled: false,
    twoStepSwitched: jest.fn(),
  };

  test("component renders and throws required validations", async () => {
    const { container, getByText, rerender } = render(
      <SignInSecurity {...props} />
    );

    expect(getByText("Sign In & Security")).toBeInTheDocument();

    const submitButton = container.querySelector('button[type="submit"]');

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    expect(getByText("User Id is required")).toBeInTheDocument();
  });

  test("component responds on data save", async () => {
    const { container, getByText, rerender } = render(
      <SignInSecurity {...props} />
    );

    const userId = container.querySelector('input[name="userId"]');
    const email = container.querySelector('input[name="email"]');
    const phone = container.querySelector('input[name="phone"]');

    await wait(() => {
      userId &&
        fireEvent.change(userId, {
          target: {
            value: "admin",
          },
        });
    });

    await wait(() => {
      email &&
        fireEvent.change(email, {
          target: {
            value: "teja@onesingleview.com",
          },
        });
    });
    await wait(() => {
      phone &&
        fireEvent.change(phone, {
          target: {
            value: "92882777222",
          },
        });
    });

    const submitButton = container.querySelector('button[type="submit"]');

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    rerender(
      <SignInSecurity
        {...props}
        signInInfoData={{
          userId: "admin",
          email: "teja@onesingleview.com",
          saved: true,
          phCode: "+966",
          phone: "122333333",
          twoStepVerification: true,
        }}
      />
    );

    expect(getByText("admin")).toBeInTheDocument();
  });
});

describe("Create User Profile page Add Bank Accounts component  test cases", () => {
  const props = {
    banks: {
      "0": {
        _id: "0",
        bank: "Saudi Investment Bank",
        bankId: "9999",
        accountId: "1234",
        password: "1234",
      },
    },
    saveBankAccounts: jest.fn(),
    bankAccountsData: {
      ...defaultBankAccountsState,
    },
    editBankAccount: jest.fn(),
    addBankAccount: jest.fn(),
    closeBankForm: jest.fn(),
    openBankForm: jest.fn(),
    disabled: false,
    load: false,
  };

  test("component renders and throws required validations", async () => {
    const { container, getByText } = render(<BankAccounts {...props} />);

    expect(getByText("Bank accounts")).toBeInTheDocument();

    const submitButton = container.querySelector('button[type="submit"]');

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    expect(getByText("Bank is required")).toBeInTheDocument();
    expect(getByText("User Id is required")).toBeInTheDocument();
    expect(getByText("Password is required")).toBeInTheDocument();
  });

  test("component responds on data save", async () => {
    const { container, rerender } = render(
      <>
        <BankAccounts {...props} />
        <ToastContainer
          className="toastContainer"
          toastClassName="toastBody"
          hideProgressBar={true}
        />
      </>
    );

    const bank = container.querySelector('input[name="bank"]');
    const userID = container.querySelector('input[name="userID"]');
    const password = container.querySelector('input[name="password"]');

    await wait(() => {
      bank && fireEvent.change(bank, { target: { value: "0" } });
    });
    await wait(() => {
      userID &&
        fireEvent.change(userID, {
          target: {
            value: "admin",
          },
        });
    });

    await wait(() => {
      password &&
        fireEvent.change(password, {
          target: {
            value: "123456",
          },
        });
    });

    const submitButton = container.querySelector('button[type="submit"]');

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    rerender(
      <BankAccounts
        {...props}
        bankAccountsData={{
          ...defaultBankAccountsState,
          saved: true,
        }}
      />
    );

    //saved failed case
    rerender(
      <BankAccounts
        {...props}
        bankAccountsData={{
          ...defaultBankAccountsState,
          saved: false,
        }}
      />
    );

    //expect(getByText("admin")).toBeInTheDocument();
  });

  test("close and add bank account on click functionality", async () => {
    const { container, getByText, rerender } = render(
      <BankAccounts
        {...props}
        bankAccountsData={{
          ...defaultBankAccountsState,
          banks: [
            {
              _id: "0",
              bankId: "SIU",
              accountId: "4555",
              password: "1233",
              userProfileId: "1234",
            },
          ],
          showBankForm: true,
          saved: true,
        }}
      />
    );

    let bank = container.querySelector('input[name="bankId"]');
    const close = container.querySelector(".closeBtn");
    let addBankLink = container.querySelector(".addMoreAcc");
    let editBankLink = container.querySelector(".editBtn");

    await wait(() => {
      expect(bank).toBeInTheDocument();
      expect(close).toBeInTheDocument();
      expect(editBankLink).toBeInTheDocument();
      expect(addBankLink).not.toBeInTheDocument();
      editBankLink && fireEvent.click(editBankLink);
    });
    await wait(() => {
      close && fireEvent.click(close);
    });

    rerender(
      <BankAccounts
        {...props}
        bankAccountsData={{
          ...defaultBankAccountsState,
          banks: [
            {
              _id: "0",
              bankId: "SIU",
              accountId: "4555",
              password: "1233",
              userProfileId: "1234",
            },
          ],
          showBankForm: false,
          saved: true,
        }}
      />
    );
    await wait(() => {
      bank = container.querySelector('input[name="bankId"]');
      addBankLink = container.querySelector(".addMoreAcc");
      expect(bank).not.toBeInTheDocument();
      //expect(getByText("Add more bank accounts")).toBeInTheDocument();
      expect(addBankLink).toBeInTheDocument();
      addBankLink && fireEvent.click(addBankLink);
    });
  });
});
