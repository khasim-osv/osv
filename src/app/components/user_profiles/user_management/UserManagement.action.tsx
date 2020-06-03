import {
  UserManagementActionTypes,
  UserManagementDetails,
} from "./UserManagement.actionTypes";

export function get_usermanagement_data(id: number) {
  return {
    type: UserManagementActionTypes.USERMANAGEMENT_DATA,
    payload: { id },
  };
}

export function update_usermanagement_data(
  userManagementData: UserManagementDetails
) {
  return {
    type: UserManagementActionTypes.UPDATE_USERMANAGEMENT_DATA,
    payload: userManagementData,
  };
}

export function edit_closed() {
  return {
    type: UserManagementActionTypes.EDIT_CLOSED,
  };
}

export function get_rolemaster_data(userProfileId: string) {
  return {
    type: UserManagementActionTypes.ROLEMASTER_DATA,
    payload: { userProfileId },
  };
}

export function get_profileusers_data(userProfileId: string) {
  return {
    type: UserManagementActionTypes.GET_PROFILEUSERS_DATA,
    payload: { userProfileId },
  };
}
