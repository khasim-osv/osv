import {
  AllUserProfileActionTypes,
  AllUserProfileDetails,
} from "./AllUserProfiles.actionTypes";
import { ISearchKey } from "../../../common/search/search.component";

export function get_allUserProfile_data(
  searchKey?: ISearchKey,
  page?: number,
  pageSize?: number
) {
  return {
    type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA,
    payload: { ...searchKey, page, pageSize },
  };
}

export function update_userProfile_data(
  userProfileData: AllUserProfileDetails
) {
  return {
    type: AllUserProfileActionTypes.UPDATE_USERPROFILE_DATA,
    payload: userProfileData,
  };
}

export function edit_closed() {
  return {
    type: AllUserProfileActionTypes.EDIT_CLOSED,
  };
}

export function userProfile_data_changed(
  userProfileData: AllUserProfileDetails
) {
  return {
    type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA_CHANGED,
    payload: userProfileData,
  };
}

export function get_licences_data() {
  return {
    type: AllUserProfileActionTypes.GET_LICENCES_DATA,
  };
}
