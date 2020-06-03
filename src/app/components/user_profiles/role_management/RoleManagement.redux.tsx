import { connect } from "react-redux";
import {
  get_rolemanagement_data,
  update_rolemanagement_data,
  edit_closed,
  get_mastermodules_data,
  get_all_mastermodules_data,
} from "./RoleManagement.action";
import {
  RoleManagementDetails,
  IReduxRoleManagementState,
  ISearchKey,
} from "./RoleManagement.actionTypes";
import RoleManagement from "./RoleManagement.component";
import { Dispatch } from "redux";

export const mapStateToProps = (state: IReduxRoleManagementState) => {
  /*let getRole = { ...state.userProfile.getRole };
  if (
    getRole.data &&
    getRole.data.modules &&
    getRole.data.modules.length > 0 &&
    getRole.data.modules[0].categoryName === "" &&
    state.userProfile.getMasterModules.data
  ) {
    getRole.data.modules = state.userProfile.getMasterModules.data;
  }*/
  return {
    getRoleData: state.userProfile.getRole,
    getRoleMasterData: state.userProfile.getMasterModules,
    getEditData: state.userProfile.editRole,
    getAllRolesData: state.userProfile.getAllRoles,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getRole: (id: number) => dispatch(get_rolemanagement_data(id)),
    saveRole: (payload: RoleManagementDetails) =>
      dispatch(update_rolemanagement_data(payload)),
    editSuccess: () => dispatch(edit_closed()),
    getMasterModules: (userProfileId: string) =>
      dispatch(get_mastermodules_data(userProfileId)),
    getAllRolesMaster: (userProfileId: string) =>
      dispatch(get_all_mastermodules_data(userProfileId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleManagement as any);
