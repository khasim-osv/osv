import {
  get_groups_data,
  update_groups_data,
  save_groups_data,
} from "../Groups.action";
import { GroupsActionTypes, IGroupsDetails } from "../Groups.actionTypes";

describe("<Groups /> action", () => {
  const mockData: IGroupsDetails = {
    _id: "2323232323",
    english: "modules",
    arabic: "الوحدات",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    isActive: true,
  };
  it("Groups action for search results", () => {
    const searchKey = { search: "modules" };
    const page = 1;
    const pageSize = 3;
    const expectedAction = {
      type: GroupsActionTypes.GROUPS_DATA,
      payload: {
        search: "modules",
        page: 1,
        pageSize: 3,
      },
    };
    expect(get_groups_data(searchKey, page, pageSize)).toEqual(expectedAction);
  });
  it("Groups action to get data", () => {
    const searchKey = { search: "modules" };
    const page = 1;
    const pageSize = 3;
    const expectedAction = {
      type: GroupsActionTypes.GROUPS_DATA,
      payload: {
        search: "modules",
        page: 1,
        pageSize: 3,
      },
    };
    expect(get_groups_data(searchKey, page, pageSize)).toEqual(expectedAction);
  });

  it("Groups action to edit data", () => {
    const editData = {
      _id: "5e96f4f5a9f75d6838ca412e",
      ...mockData,
    };
    const expectedAction = {
      type: GroupsActionTypes.UPDATE_GROUPS_DATA,
      payload: editData,
    };
    expect(update_groups_data(editData)).toEqual(expectedAction);
  });

  it("Groups action to save data", () => {
    const expectedAction = {
      type: GroupsActionTypes.SAVE_GROUPS_DATA,
      payload: mockData,
    };
    expect(save_groups_data(mockData)).toEqual(expectedAction);
  });
});
