import { connect } from "react-redux";
import CreateGroups from "./CreateGroups.component";
import { save_groups_data, save_closed } from "./Groups.action";
import { Dispatch } from "redux";

import {
  ISearchKey,
  IGroupsDetails,
  IReduxGroupsState,
} from "./Groups.actionTypes";

export const mapStateToProps = (state: IReduxGroupsState) => {
  return {
    saveGroups: state.Groups.SaveGroups,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveGroupsData: (payload: IGroupsDetails) =>
      dispatch(save_groups_data(payload)),
    saveClosed: () => dispatch(save_closed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroups);
