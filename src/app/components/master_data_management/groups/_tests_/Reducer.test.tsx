import {
  getGroups_reducer,
  updateGroups_reducer,
  saveGroups_reducer,
} from "../Groups.reducer";
import {
  GroupsActionTypes,
  IGroupsData,
  initialState,
  getGroupsInitialState,
} from "../Groups.actionTypes";

describe("<Groups /> reducer", () => {
  const data = {
    _id: "5e96f4f5a9f75d6838ca412e",
    english: "modules",
    arabic: "الوحدات",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
    isActive: true,
  };
  const mockData: IGroupsData = {
    loading: false,
    success: true,
    data: data,
  };

  it("Groups reducer return the initial state", () => {
    expect(
      getGroups_reducer(undefined, {
        type: GroupsActionTypes.GET_INITIAL_STATE,
      })
    ).toEqual(getGroupsInitialState);
  });

  it('Groups reducer handle "GROUPS_DATA" action', () => {
    expect(
      getGroups_reducer(initialState, {
        type: GroupsActionTypes.GROUPS_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Groups reducer handle "GROUPS_DATA_SUCCEEDED" action', () => {
    expect(
      getGroups_reducer(initialState, {
        type: GroupsActionTypes.GROUPS_DATA_SUCCEEDED,
        GetGroups: { ...mockData, data: [data] },
      })
    ).toEqual({
      loading: false,
      ...mockData,
      data: [mockData.data],
    });
  });

  it('Groups reducer handle "GROUPS_DATA_FAILED" action', () => {
    const mockData: IGroupsData = {
      loading: false,
      success: false,
      data: [],
    };

    expect(
      getGroups_reducer(initialState, {
        type: GroupsActionTypes.GROUPS_DATA_FAILED,
        GetGroups: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Groups reducer handle "UPDATE_GROUPS_DATA" action', () => {
    expect(
      updateGroups_reducer(initialState, {
        type: GroupsActionTypes.UPDATE_GROUPS_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Groups reducer handle "UPDATE_GROUPS_SUCCEEDED" action', () => {
    expect(
      updateGroups_reducer(initialState, {
        type: GroupsActionTypes.UPDATE_GROUPS_SUCCEEDED,
        EditGroups: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Groups reducer handle "UPDATE_GROUPS_FAILED" action', () => {
    const mockData: IGroupsData = {
      loading: false,
      success: false,
      data: [],
    };
    expect(
      updateGroups_reducer(initialState, {
        type: GroupsActionTypes.UPDATE_GROUPS_FAILED,
        EditGroups: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Groups reducer handle "SAVE_GROUPS_DATA" action', () => {
    expect(
      saveGroups_reducer({}, { type: GroupsActionTypes.SAVE_GROUPS_DATA })
    ).toEqual({
      loading: true,
    });
  });

  it('Groups reducer handle "SAVE_GROUPS_SUCCEEDED" action', () => {
    expect(
      saveGroups_reducer(
        {},
        {
          type: GroupsActionTypes.SAVE_GROUPS_SUCCEEDED,
          SaveGroups: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Groups reducer handle "SAVE_GROUPS_FAILED" action', () => {
    const mockData = { loading: false, success: false, data: [] };
    expect(
      saveGroups_reducer(
        {},
        {
          type: GroupsActionTypes.SAVE_GROUPS_FAILED,
          SaveGroups: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });
});
