import {
  AllUserProfileActionTypes,
  AllUserProfileReducerActions,
  AllUserProfileData,
  AllUserProfileDetails,
  initialState,
  getAllUserProfileInitialState,
  getLicencesState,
  GetLicencesData,
} from "./AllUserProfiles.actionTypes";

export const getAllUserProfileData_reducer = (
  state: AllUserProfileData = getAllUserProfileInitialState,
  action: AllUserProfileReducerActions
) => {
  switch (action.type) {
    case AllUserProfileActionTypes.ALLUSERPROFILE_DATA:
      return {
        loading: true,
      };
    case AllUserProfileActionTypes.ALLUSERPROFILE_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.GetAllUserProfile,
      };

    case AllUserProfileActionTypes.ALLUSERPROFILE_DATA_FAILED: {
      return {
        loading: false,
        ...action.GetAllUserProfile,
      };
    }
    case AllUserProfileActionTypes.ALLUSERPROFILE_DATA_CHANGED: {
      const newState = { ...state };
      let newData: AllUserProfileDetails[] = [];
      Array.isArray(newState.data) &&
        newState.data.forEach((item: AllUserProfileDetails) => {
          if (
            !Array.isArray(action.payload.data) &&
            item._id === action.payload.data._id
          ) {
            action.payload.operation === "Edit" &&
              newData.push(action.payload.data);
          } else {
            newData.push(item);
          }
          return newData;
        });
      return { ...state, data: newData, loading: false };
    }
    default:
      return state;
  }
};

export const updateAllUserProfileData_reducer = (
  state: AllUserProfileData = initialState,
  action: AllUserProfileReducerActions
) => {
  switch (action.type) {
    case AllUserProfileActionTypes.UPDATE_USERPROFILE_DATA:
      return {
        loading: true,
      };
    case AllUserProfileActionTypes.UPDATE_USERPROFILE_SUCCEEDED: {
      return {
        loading: false,
        ...action.EditUserProfile,
      };
    }
    case AllUserProfileActionTypes.UPDATE_USERPROFILE_FAILED: {
      return {
        loading: false,
        ...action.EditUserProfile,
      };
    }
    case AllUserProfileActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const getLicencesData_reducer = (
  state: GetLicencesData = getLicencesState,
  action: AllUserProfileReducerActions
) => {
  switch (action.type) {
    case AllUserProfileActionTypes.GET_LICENCES_DATA:
      return {
        loading: true,
      };
    case AllUserProfileActionTypes.GET_LICENCES_SUCCEEDED:
      return {
        loading: false,
        ...action.getLicences,
      };

    case AllUserProfileActionTypes.GET_LICENCES_FAILED: {
      return {
        loading: false,
        ...action.getLicences,
      };
    }
    default:
      return state;
  }
};
