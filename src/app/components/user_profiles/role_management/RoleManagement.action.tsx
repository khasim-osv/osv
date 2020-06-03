import {
  RoleManagementActionTypes,
  RoleManagementDetails,
} from "./RoleManagement.actionTypes";
import { ISearchKey } from "app/components/master_data_management/error_codes/ErrorCodes.actionTypes";

export function get_rolemanagement_data(id: number) {
  return {
    type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA,
    payload: { id },
  };
}

export function update_rolemanagement_data(
  roleManagementData: RoleManagementDetails
) {
  return {
    type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA,
    payload: roleManagementData,
  };
}

export function edit_closed() {
  return {
    type: RoleManagementActionTypes.EDIT_CLOSED,
  };
}

export function get_mastermodules_data(userProfileId: string, roleId?: string) {
  const req = roleId ? { userProfileId, roleId } : { userProfileId };
  return {
    type: RoleManagementActionTypes.GET_MASTERMODULES_DATA,
    payload: req,
  };
}

export function get_all_mastermodules_data(userProfileId: string) {
  return {
    type: RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA,
    payload: { userProfileId },
  };
}
