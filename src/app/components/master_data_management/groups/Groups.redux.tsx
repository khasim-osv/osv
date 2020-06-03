import { connect } from "react-redux";
import Groups from "./Groups.component";
import { Dispatch } from "redux";

import {
  get_groups_data,
  update_groups_data,
  edit_closed,
  groups_data_changed,
} from "./Groups.action";

import {
  ISearchKey,
  IGroupsDetails,
  IReduxGroupsState,
  IGroupsData,
} from "./Groups.actionTypes";
export const mapStateToProps = (state: IReduxGroupsState) => {
  return {
    getGroups: state.Groups.GetGroups,
    editGroups: state.Groups.EditGroups,
  };
};
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getGroupsData: (searchKey?: ISearchKey, page?: number, pageSize?: number) =>
      dispatch(get_groups_data(searchKey, page, pageSize)),

    updateGroupsData: (payload: IGroupsDetails) =>
      dispatch(update_groups_data(payload)),

    popupEditClose: () => dispatch(edit_closed()),
    groupsDataChanged: (data: IGroupsDetails) =>
      dispatch(groups_data_changed(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups as any);
