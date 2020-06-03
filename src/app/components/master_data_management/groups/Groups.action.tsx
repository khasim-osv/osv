import {
  GroupsActionTypes,
  ISearchKey,
  IGroupsDetails,
} from "./Groups.actionTypes";

export function get_groups_data(
  searchKey?: ISearchKey,
  page?: number,
  pageSize?: number
) {
  return {
    type: GroupsActionTypes.GROUPS_DATA,
    payload: { ...searchKey, page, pageSize },
  };
}

export function update_groups_data(groupsData: IGroupsDetails) {
  {
    return {
      type: GroupsActionTypes.UPDATE_GROUPS_DATA,
      payload: groupsData,
    };
  }
}

export function save_groups_data(groupsData: IGroupsDetails) {
  return {
    type: GroupsActionTypes.SAVE_GROUPS_DATA,
    payload: groupsData,
  };
}

export function edit_closed() {
  return {
    type: GroupsActionTypes.EDIT_CLOSED,
  };
}

export function save_closed() {
  return {
    type: GroupsActionTypes.SAVE_CLOSED,
  };
}
export function groups_data_changed(data: IGroupsDetails) {
  return {
    type: GroupsActionTypes.GROUPS_DATA_CHANGED,
    payload: data,
  };
}
