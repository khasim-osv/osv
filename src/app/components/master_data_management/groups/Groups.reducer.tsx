import {
  GroupsActionTypes,
  GroupsReducerActions,
  IGroupsData,
  IGroupsDetails,
  initialState,
  getGroupsInitialState,
} from "./Groups.actionTypes";

export const getGroups_reducer = (
  state: IGroupsData = getGroupsInitialState,
  action: GroupsReducerActions
) => {
  switch (action.type) {
    case GroupsActionTypes.GROUPS_DATA:
      return {
        loading: true,
      };
    case GroupsActionTypes.GROUPS_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.GetGroups,
      };

    case GroupsActionTypes.GROUPS_DATA_FAILED: {
      return {
        loading: false,
        ...action.GetGroups,
      };
    }
    case GroupsActionTypes.GROUPS_DATA_CHANGED: {
      const newState = { ...state };
      let newData: IGroupsDetails[] = [];
      Array.isArray(newState.data) &&
        newState.data.forEach((item: IGroupsDetails) => {
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

export const updateGroups_reducer = (
  state: IGroupsData = initialState,
  action: GroupsReducerActions
) => {
  switch (action.type) {
    case GroupsActionTypes.UPDATE_GROUPS_DATA:
      return {
        loading: true,
      };
    case GroupsActionTypes.UPDATE_GROUPS_SUCCEEDED: {
      return {
        loading: false,
        ...action.EditGroups,
      };
    }
    case GroupsActionTypes.UPDATE_GROUPS_FAILED: {
      return {
        loading: false,
        ...action.EditGroups,
      };
    }
    case GroupsActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const saveGroups_reducer = (
  state: {} = {},
  action: GroupsReducerActions
) => {
  switch (action.type) {
    case GroupsActionTypes.SAVE_GROUPS_DATA:
      return {
        loading: true,
      };
    case GroupsActionTypes.SAVE_GROUPS_SUCCEEDED: {
      return {
        loading: false,
        ...action.SaveGroups,
      };
    }
    case GroupsActionTypes.SAVE_GROUPS_FAILED: {
      return {
        loading: false,
        ...action.SaveGroups,
      };
    }
    case GroupsActionTypes.SAVE_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
