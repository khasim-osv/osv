import {
  UserManagementActionTypes,
  UserManagementReducerActions,
  UserManagementData,
  initialState,
  IRolesMasterData,
  initialStateRoleMaster,
  IProfileUsersData,
  initialStateAllProfileUsers,
} from "./UserManagement.actionTypes";

export const getUserManagementData_reducer = (
  state: UserManagementData = initialState,
  action: UserManagementReducerActions
) => {
  switch (action.type) {
    case UserManagementActionTypes.USERMANAGEMENT_DATA:
      return {
        loading: true,
      };
    case UserManagementActionTypes.USERMANAGEMENT_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.getUser,
      };

    case UserManagementActionTypes.USERMANAGEMENT_DATA_FAILED: {
      return {
        loading: false,
        ...action.getUser,
      };
    }
    default:
      return state;
  }
};

export const updateUserManagementData_reducer = (
  state: UserManagementData = initialState,
  action: UserManagementReducerActions
) => {
  switch (action.type) {
    case UserManagementActionTypes.UPDATE_USERMANAGEMENT_DATA:
      return {
        loading: true,
      };
    case UserManagementActionTypes.UPDATE_USERMANAGEMENT_SUCCEEDED: {
      return {
        loading: false,
        ...action.editUser,
      };
    }
    case UserManagementActionTypes.UPDATE_USERMANAGEMENT_FAILED: {
      return {
        loading: false,
        ...action.editUser,
      };
    }
    case UserManagementActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const getRoleMasterData_reducer = (
  state: IRolesMasterData = initialStateRoleMaster,
  action: UserManagementReducerActions
) => {
  switch (action.type) {
    case UserManagementActionTypes.ROLEMASTER_DATA:
      return {
        loading: true,
      };
    case UserManagementActionTypes.ROLEMASTER_DATA_SUCCEEDED: {
      return {
        loading: false,
        ...action.getRolesMaster,
      };
    }
    case UserManagementActionTypes.ROLEMASTER_DATA_FAILED: {
      return {
        loading: false,
        ...action.getRolesMaster,
      };
    }
    default:
      return state;
  }
};

export const getProfileUsersData_reducer = (
  state: IProfileUsersData = initialStateAllProfileUsers,
  action: UserManagementReducerActions
) => {
  switch (action.type) {
    case UserManagementActionTypes.GET_PROFILEUSERS_DATA:
      return {
        loading: true,
      };
    case UserManagementActionTypes.GET_PROFILEUSERS_SUCCEEDED: {
      return {
        loading: false,
        ...action.getAllProfileUsers,
      };
    }
    case UserManagementActionTypes.GET_PROFILEUSERS_FAILED: {
      return {
        loading: false,
        ...action.getAllProfileUsers,
      };
    }
    default:
      return state;
  }
};
