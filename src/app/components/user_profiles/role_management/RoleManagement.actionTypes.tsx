export enum RoleManagementActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  ROLEMANAGEMENT_DATA = "ROLEMANAGEMENT_DATA",
  ROLEMANAGEMENT_DATA_SUCCEEDED = "ROLEMANAGEMENT_DATA_SUCCEEDED",
  ROLEMANAGEMENT_DATA_FAILED = "ROLEMANAGEMENT_DATA_FAILED",
  ALLROLESMANAGEMENT_DATA = "ALLROLESMANAGEMENT_DATA",
  ALLROLESMANAGEMENT_DATA_SUCCEEDED = "ALLROLESMANAGEMENT_DATA_SUCCEEDED",
  ALLROLESMANAGEMENT_DATA_FAILED = "ALLROLESMANAGEMENT_DATA_FAILED",
  UPDATE_ROLEMANAGEMENT_DATA = "UPDATE_ROLEMANAGEMENT_DATA",
  UPDATE_ROLEMANAGEMENT_SUCCEEDED = "UPDATE_ROLEMANAGEMENT_SUCCEEDED",
  UPDATE_ROLEMANAGEMENT_FAILED = "UPDATE_ROLEMANAGEMENT_FAILED",
  GET_MASTERMODULES_DATA = "GET_MASTERMODULES_DATA",
  GET_MASTERMODULES_SUCCEEDED = "GET_MASTERMODULES_SUCCEEDED",
  GET_MASTERMODULES_FAILED = "GET_MASTERMODULES_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
}

export interface RoleManagementData {
  loading: boolean;
  success: boolean;
  data: RoleManagementDetails;
  operation?: string;
}

export const roleManagementType: RoleManagementDetails = {
  _id: "",
  roleName: "",
  modulesCategory: [
    {
      _id: "",
      categoryName: "",
      modules: [
        {
          _id: "",
          moduleName: "",
        },
      ],
    },
  ],
  userProfileId: "",
  isActive: true,
  success: false,
};

export const initialState: RoleManagementData = {
  loading: false,
  success: false,
  data: roleManagementType,
  operation: "",
};

export interface Modules {
  _id: string;
  moduleName?: string;
  workflow?: string[];
}

export interface IModules {
  _id: string;
  categoryName?: string;
  modules?: Modules[];
}

export interface IMasterModules {
  loading?: boolean;
  success?: boolean;
  data: IModules[];
}

export interface RoleManagementDetails {
  _id?: string;
  roleName: string;
  modulesCategory: IModules[];
  isActive: boolean;
  userProfileId: string;
  success?: boolean;
}

export interface AllStates {
  getRole: RoleManagementData;
  editRole: RoleManagementData;
  getMasterModules: IMasterModules;
  getRoles: RoleManagementData;
  getAllRoles: RoleManagementData;
}
export interface IReduxRoleManagementState {
  userProfile: AllStates;
}
export interface ISearchKey {
  search: string;
}
export interface ISearchState {
  valueToBeSearched: string;
  filteredData: RoleManagementDetails | RoleManagementDetails[];
  groupName: boolean;
}
export interface IReduxBaseAction {
  type: RoleManagementActionTypes;
}

export type RoleManagementReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_RoleManagementData_Action
  | IRedux_RoleManagementData_Succeeded_Action
  | IRedux_RoleManagementData_Failed_Action
  | IRedux_AllRolesManagementData_Action
  | IRedux_AllRolesManagementData_Succeeded_Action
  | IRedux_AllRolesManagementData_Failed_Action
  | IRedux_UpdateRoleManagementData_Action
  | IRedux_UpdateRoleManagementData_Succeeded_Action
  | IRedux_UpdateRoleManagementData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_MasterModulesData_Action
  | IRedux_MasterModulesData_Succeeded_Action
  | IRedux_MasterModulesData_Failed_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: RoleManagementActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_RoleManagementData_Action extends IReduxBaseAction {
  type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA;
}
export interface IRedux_RoleManagementData_Succeeded_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_SUCCEEDED;
  getRole: RoleManagementData;
}

export interface IRedux_RoleManagementData_Failed_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_FAILED;
  getRole: RoleManagementData;
}

export interface IRedux_AllRolesManagementData_Action extends IReduxBaseAction {
  type: RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA;
}
export interface IRedux_AllRolesManagementData_Succeeded_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA_SUCCEEDED;
  getAllRoles: RoleManagementData;
}

export interface IRedux_AllRolesManagementData_Failed_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA_FAILED;
  getAllRoles: RoleManagementData;
}

export interface IRedux_UpdateRoleManagementData_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA;
}
export interface IRedux_UpdateRoleManagementData_Succeeded_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_SUCCEEDED;
  editRole: RoleManagementData;
}

export interface IRedux_UpdateRoleManagementData_Failed_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_FAILED;
  editRole: RoleManagementData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: RoleManagementActionTypes.EDIT_CLOSED;
}

export interface IRedux_MasterModulesData_Action extends IReduxBaseAction {
  type: RoleManagementActionTypes.GET_MASTERMODULES_DATA;
}
export interface IRedux_MasterModulesData_Succeeded_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.GET_MASTERMODULES_SUCCEEDED;
  getMasterModules: IMasterModules;
}

export interface IRedux_MasterModulesData_Failed_Action
  extends IReduxBaseAction {
  type: RoleManagementActionTypes.GET_MASTERMODULES_FAILED;
  getMasterModules: IMasterModules;
}
