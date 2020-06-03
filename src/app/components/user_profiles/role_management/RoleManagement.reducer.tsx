import {
  RoleManagementActionTypes,
  RoleManagementReducerActions,
  RoleManagementData,
  initialState,
  IModules,
} from "./RoleManagement.actionTypes";

export const getRoleManagementData_reducer = (
  state: RoleManagementData = initialState,
  action: RoleManagementReducerActions
) => {
  switch (action.type) {
    case RoleManagementActionTypes.ROLEMANAGEMENT_DATA:
      return {
        loading: true,
      };
    case RoleManagementActionTypes.ROLEMANAGEMENT_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.getRole,
      };

    case RoleManagementActionTypes.ROLEMANAGEMENT_DATA_FAILED: {
      return {
        loading: false,
        ...action.getRole,
      };
    }
    default:
      return state;
  }
};

export const getAllRolesManagementData_reducer = (
  state: RoleManagementData = initialState,
  action: RoleManagementReducerActions
) => {
  switch (action.type) {
    case RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA:
      return {
        loading: true,
      };
    case RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.getAllRoles,
      };

    case RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA_FAILED: {
      return {
        loading: false,
        ...action.getAllRoles,
      };
    }
    default:
      return state;
  }
};

export const updateRoleManagementData_reducer = (
  state: RoleManagementData = initialState,
  action: RoleManagementReducerActions
) => {
  switch (action.type) {
    case RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA:
      return {
        loading: true,
      };
    case RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_SUCCEEDED: {
      return {
        loading: false,
        ...action.editRole,
      };
    }
    case RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_FAILED: {
      return {
        loading: false,
        ...action.editRole,
      };
    }
    case RoleManagementActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const getMasterModulesData_reducer = (
  state: IModules[] = initialState.data.modulesCategory,
  action: RoleManagementReducerActions
) => {
  switch (action.type) {
    case RoleManagementActionTypes.GET_MASTERMODULES_DATA:
      return {
        loading: true,
      };
    case RoleManagementActionTypes.GET_MASTERMODULES_SUCCEEDED:
      return {
        loading: false,
        ...action.getMasterModules,
      };
    case RoleManagementActionTypes.GET_MASTERMODULES_FAILED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
