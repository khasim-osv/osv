import {
  IMasterModules,
  Modules,
} from "../role_management/RoleManagement.actionTypes";

export enum UserManagementActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  USERMANAGEMENT_DATA = "USERMANAGEMENT_DATA",
  USERMANAGEMENT_DATA_SUCCEEDED = "USERMANAGEMENT_DATA_SUCCEEDED",
  USERMANAGEMENT_DATA_FAILED = "USERMANAGEMENT_DATA_FAILED",
  UPDATE_USERMANAGEMENT_DATA = "UPDATE_USERMANAGEMENT_DATA",
  UPDATE_USERMANAGEMENT_SUCCEEDED = "UPDATE_USERMANAGEMENT_SUCCEEDED",
  UPDATE_USERMANAGEMENT_FAILED = "UPDATE_USERMANAGEMENT_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  ROLEMASTER_DATA = "ROLEMASTER_DATA",
  ROLEMASTER_DATA_SUCCEEDED = "ROLEMASTER_DATA_SUCCEEDED",
  ROLEMASTER_DATA_FAILED = "ROLEMASTER_DATA_SUCCEEDED",
  GET_PROFILEUSERS_DATA = "GET_PROFILEUSERS_DATA",
  GET_PROFILEUSERS_SUCCEEDED = "GET_PROFILEUSERS_SUCCEEDED",
  GET_PROFILEUSERS_FAILED = "GET_PROFILEUSERS_FAILED",
}

export interface UserManagementData {
  loading: boolean;
  success: boolean;
  data: UserManagementDetails;
  operation?: string;
}

export const userManagementType: UserManagementDetails = {
  _id: "",
  name: "",
  email: "",
  countryCode: "",
  mobile: "",
  roleId: "",
  nationalId: "",
  fundTransferLimit: {
    currency: "",
    amount: 0,
  },
  modulesCategory: [
    {
      categoryId: "",
      modules: [
        {
          moduleId: "",
          workflow: "",
        },
      ],
    },
  ],
  userProfileId: "",
  success: false,
};

export const initialState: UserManagementData = {
  loading: false,
  success: false,
  data: userManagementType,
  operation: "",
};

export const roleMasterType = [
  {
    _id: "",
    roleName: "",
  },
];

export const initialStateRoleMaster: IRolesMasterData = {
  loading: false,
  success: false,
  data: roleMasterType,
};

export interface IState {}

export interface IFundTransferLimit {
  currency: string;
  amount: number;
}

export interface IModulesCategory {
  categoryId: string;
  categoryName?: string;
  modules: ISubModules[];
}

export interface IModCategory {
  modulesCategory: IModulesCategory[];
}

export interface IToolTipUser {
  user: string;
  id: string;
}

export interface ISubModules {
  moduleId: string;
  moduleName?: string;
  approval?: string;
  workflow: string;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  modules: Modules[];
}

export interface UserManagementDetails {
  _id?: string;
  name: string;
  email: string;
  countryCode?: string;
  mobile: string;
  roleId: string;
  nationalId: string;
  fundTransferLimit: IFundTransferLimit;
  modulesCategory: IModulesCategory[];
  userProfileId: string;
  success?: boolean;
}

export interface AllStates {
  getUser: UserManagementData;
  editUser: UserManagementData;
  getRolesMaster: IRolesMasterData;
  getMasterModules: IMasterModules;
  getAllProfileUsers: IProfileUsersData;
}

export interface IRolesMaster {
  _id: string;
  roleName: string;
}

export interface IRolesMasterData {
  loading: boolean;
  success: boolean;
  data: IRolesMaster[];
}

export interface IReduxUserManagementState {
  userProfile: AllStates;
}

export interface IProfileUsers {
  _id: string;
  name: string;
  modulesCategory: IModulesCategory[];
}

export interface IProfileUsersData {
  loading: boolean;
  success: boolean;
  data: IProfileUsers[];
}

export const initialStateAllProfileUsers: IProfileUsersData = {
  loading: false,
  success: false,
  data: [{ _id: "", name: "", modulesCategory: [] }],
};

export interface IReduxBaseAction {
  type: UserManagementActionTypes;
}

export type UserManagementReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_UserManagementData_Action
  | IRedux_UserManagementData_Succeeded_Action
  | IRedux_UserManagementData_Failed_Action
  | IRedux_UpdateUserManagementData_Action
  | IRedux_UpdateUserManagementData_Succeeded_Action
  | IRedux_UpdateUserManagementData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_RoleMasterData_Action
  | IRedux_RoleMasterData_Succeeded_Action
  | IRedux_RoleMasterData_Failed_Action
  | IRedux_ProfileUsersData_Action
  | IRedux_ProfileUsers_Succeeded_Action
  | IRedux_ProfileUsers_Failed_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_UserManagementData_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.USERMANAGEMENT_DATA;
}
export interface IRedux_UserManagementData_Succeeded_Action
  extends IReduxBaseAction {
  type: UserManagementActionTypes.USERMANAGEMENT_DATA_SUCCEEDED;
  getUser: UserManagementData;
}

export interface IRedux_UserManagementData_Failed_Action
  extends IReduxBaseAction {
  type: UserManagementActionTypes.USERMANAGEMENT_DATA_FAILED;
  getUser: UserManagementData;
}

export interface IRedux_UpdateUserManagementData_Action
  extends IReduxBaseAction {
  type: UserManagementActionTypes.UPDATE_USERMANAGEMENT_DATA;
}
export interface IRedux_UpdateUserManagementData_Succeeded_Action
  extends IReduxBaseAction {
  type: UserManagementActionTypes.UPDATE_USERMANAGEMENT_SUCCEEDED;
  editUser: UserManagementData;
}

export interface IRedux_UpdateUserManagementData_Failed_Action
  extends IReduxBaseAction {
  type: UserManagementActionTypes.UPDATE_USERMANAGEMENT_FAILED;
  editUser: UserManagementData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.EDIT_CLOSED;
}

export interface IRedux_RoleMasterData_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.ROLEMASTER_DATA;
}
export interface IRedux_RoleMasterData_Succeeded_Action
  extends IReduxBaseAction {
  type: UserManagementActionTypes.ROLEMASTER_DATA_SUCCEEDED;
  getRolesMaster: IRolesMasterData;
}

export interface IRedux_RoleMasterData_Failed_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.ROLEMASTER_DATA_FAILED;
  getRolesMaster: IRolesMasterData;
}

export interface IRedux_ProfileUsersData_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.GET_PROFILEUSERS_DATA;
}
export interface IRedux_ProfileUsers_Succeeded_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.GET_PROFILEUSERS_SUCCEEDED;
  getAllProfileUsers: IProfileUsersData;
}

export interface IRedux_ProfileUsers_Failed_Action extends IReduxBaseAction {
  type: UserManagementActionTypes.GET_PROFILEUSERS_FAILED;
  getAllProfileUsers: IProfileUsersData;
}
