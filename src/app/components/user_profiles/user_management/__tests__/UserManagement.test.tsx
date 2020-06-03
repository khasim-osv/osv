import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserManagement, { IProps } from "../UserManagement.component";
import {
  UserManagementDetails,
  UserManagementData,
  IRolesMasterData,
} from "../UserManagement.actionTypes";
import { IMasterModules } from "../../role_management/RoleManagement.actionTypes";
import {
  userMock,
  userMockData,
  moduleMasterMock,
  moduleMasterMockData,
  roleMasterData,
} from "./mock";

const props: IProps = {
  getUser: jest.fn(),
  getUserData: userMockData,
  getEditData: userMockData,
  saveUser: jest.fn(),
  editSuccess: jest.fn(),
  getRoleMaster: jest.fn(),
  getRolesMaster: roleMasterData,
  getMasterModules: jest.fn(),
  getModulesMasterData: moduleMasterMockData,
};

afterEach(cleanup);

describe("User profile <UserManagement /> component", () => {
  const { container, getByText, rerender } = render(
    <UserManagement {...props} />
  );

  it("Edit user management", async () => {
    const name: HTMLInputElement | null = container.querySelector(
      'input[name="name"]'
    );
    const email: HTMLInputElement | null = container.querySelector(
      'input[name="email"]'
    );
    const countryCode: HTMLInputElement | null = container.querySelector(
      'input[name="countryCode"]'
    );
    const mobile: HTMLInputElement | null = container.querySelector(
      'input[name="mobile"]'
    );
    const role: HTMLInputElement | null = container.querySelector(
      'input[name="roleId"]'
    );
    const nationalId: HTMLInputElement | null = container.querySelector(
      'input[name="nationalId"]'
    );
    const fundTransferLimitCurrency: HTMLInputElement | null = container.querySelector(
      'input[name="fundTransferLimit.currency"]'
    );
    const fundTransferLimitAmt: HTMLInputElement | null = container.querySelector(
      'input[name="fundTransferLimit.amount"]'
    );
  });
});
