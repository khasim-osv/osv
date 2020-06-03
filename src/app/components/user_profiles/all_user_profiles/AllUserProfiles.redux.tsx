import { connect } from "react-redux";
import { Dispatch } from "redux";
import AllUserProfiles from "./AllUserProfiles.component";
import {
  get_allUserProfile_data,
  update_userProfile_data,
  edit_closed,
  userProfile_data_changed,
  get_licences_data,
} from "./AllUserProfiles.action";
import {
  AllUserProfileDetails,
  IReduxAllUserProfileState,
} from "./AllUserProfiles.actionTypes";
import { ISearchKey } from "../../../common/search/search.component";

export const mapStateToProps = (state: IReduxAllUserProfileState) => {
  return {
    getAllUserProfileData: state.userProfile.GetAllUserProfile,
    editUserProfileData: state.userProfile.EditUserProfile,
    getLicencesData: state.userProfile.getLicences,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAllUserProfile: (
      searchKey?: ISearchKey,
      page?: number,
      pageSize?: number
    ) => dispatch(get_allUserProfile_data(searchKey, page, pageSize)),
    updateUserProfile: (payload: AllUserProfileDetails) =>
      dispatch(update_userProfile_data(payload)),
    popupEditClose: () => dispatch(edit_closed()),
    userProfileDataChanged: (data: AllUserProfileDetails) =>
      dispatch(userProfile_data_changed(data)),
    getLicences: () => dispatch(get_licences_data()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUserProfiles as any);
