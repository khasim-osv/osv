import {
  IModules,
  IMasterModules,
} from "../../role_management/RoleManagement.actionTypes";
import {
  UserManagementDetails,
  UserManagementData,
  IRolesMasterData,
} from "../UserManagement.actionTypes";

export const moduleMasterMock: IModules[] = [
  {
    _id: "5e9c27636e9fb152343bfe7f",
    categoryName: "Account Management",
    modules: [
      {
        _id: "5eb5371efd94a66f68639abe",
        moduleName: "Account validations",
      },
    ],
  },
  {
    _id: "5ea002dc6a68db8ced6f4553",
    categoryName: "Cash Management",
    modules: [
      {
        _id: "5eb53774fd94a66f68639ac2",
        moduleName: "Balance enquiry",
      },
    ],
  },
  {
    _id: "5ea002cd6a68db8ced6f4552",
    categoryName: "Funds Transfers",
    modules: [
      {
        _id: "5eb5374ffd94a66f68639ac0",
        moduleName: "Fund transfer",
      },
    ],
  },
];

export const moduleMasterMockData: IMasterModules = {
  success: true,
  loading: false,
  data: moduleMasterMock,
};

export const userMock: UserManagementDetails = {
  fundTransferLimit: { currency: "SAR", amount: 1000 },
  _id: "5ebffc160b18b22fb0170ee1",
  userProfileId: "5ebd4f811a91901bfc326087",
  countryCode: "+966",
  email: "khasim@osv.com",
  mobile: "1234567890",
  modulesCategory: [
    {
      categoryId: "5e9c27636e9fb152343bfe7f",
      approval: "reviewer",
    },
    {
      categoryId: "5ea002cd6a68db8ced6f4552",
      approval: "reviewer",
    },
    {
      categoryId: "5ea002dc6a68db8ced6f4553",
      approval: "approver",
    },
  ],
  name: "khasim",
  nationalId: "QWERY456",
  roleId: "5ebe7b4c0b18b22fb0ca8055",
};

export const userMockData: UserManagementData = {
  success: true,
  loading: false,
  data: userMock,
};

export const roleMasterData: IRolesMasterData = {
  success: true,
  loading: false,
  data: [{ _id: "5ebe7b4c0b18b22fb0ca8055", roleName: "CEO" }],
};
