import { connect } from "react-redux";
import {
  get_usermanagement_data,
  update_usermanagement_data,
  edit_closed,
  get_rolemaster_data,
  get_profileusers_data,
} from "./UserManagement.action";
import { get_mastermodules_data } from "../role_management/RoleManagement.action";
import {
  UserManagementDetails,
  IReduxUserManagementState,
} from "./UserManagement.actionTypes";
import UserManagement from "./UserManagement.component";
import { Dispatch } from "redux";

export const mapStateToProps = (state: IReduxUserManagementState) => {
  return {
    getUserData: state.userProfile.getUser,
    getEditData: state.userProfile.editUser,
    getRolesMaster: state.userProfile.getRolesMaster,
    getModulesMasterData: state.userProfile.getMasterModules,
    getAllProfileUsersData: state.userProfile.getAllProfileUsers,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUser: (id: number) => dispatch(get_usermanagement_data(id)),
    saveUser: (payload: UserManagementDetails) =>
      dispatch(update_usermanagement_data(payload)),
    editSuccess: () => dispatch(edit_closed()),
    getRoleMaster: (userprofileId: string) =>
      dispatch(get_rolemaster_data(userprofileId)),
    getMasterModules: (userProfileId: string, roleId: string) =>
      dispatch(get_mastermodules_data(userProfileId, roleId)),
    getAllProfileUsers: (userProfileId: string) =>
      dispatch(get_profileusers_data(userProfileId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement as any);
