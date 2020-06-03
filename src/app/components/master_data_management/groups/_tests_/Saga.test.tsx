import { put, takeLatest } from "redux-saga/effects";
import {
  getGroupsData,
  getGroupsWatcher,
  updateGroupsData,
  updateGroupsWatcher,
  saveGroupsData,
  saveGroupsWatcher,
} from "../Groups.saga";
import {
  GroupsActionTypes,
  IGroupsData,
  GroupsReducerActions,
  IGroupsDetails,
  groupsType,
} from "../Groups.actionTypes";

jest.mock("axios");

export interface IProps {
  payload: IGroupsData;
  action: GroupsReducerActions;
  type: GroupsActionTypes;
}
export interface IAction {
  type: GroupsActionTypes.SAVE_GROUPS_DATA;
  payload: {
    value: {
      english: "modules";
      arabic: "الوحدات";
    };

    isActive: true;
  };
}
describe("<Groups /> saga", () => {
  const mockData = {
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
    disable: true,
  };
  it('Groups saga dispatch action "GROUPS_DATA" ', () => {
    const generator = getGroupsWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(GroupsActionTypes.GROUPS_DATA, getGroupsData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "GROUPS_DATA_SUCCEEDED"', () => {
    const mockResponse: any = [];
    const generator = getGroupsData({
      type: GroupsActionTypes.GROUPS_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockResponse, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type = GroupsActionTypes.GROUPS_DATA_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: GroupsActionTypes.GROUPS_DATA_SUCCEEDED,
        GetGroups: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "GROUPS_DATA_FAILED"', () => {
    const mockResponse: IGroupsDetails = {
      _id: "121212",
      english: "modules",
      arabic: "الوحدات",
      value: {
        english: "modules",
        arabic: "الوحدات",
      },

      isActive: true,
    };

    const generator = getGroupsData({
      type: GroupsActionTypes.GROUPS_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: GroupsActionTypes.GROUPS_DATA_FAILED,
        GetGroups: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "UPDATE_GROUPS_DATA" ', () => {
    const generator = updateGroupsWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(GroupsActionTypes.UPDATE_GROUPS_DATA, updateGroupsData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "UPDATE_GROUPS_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = updateGroupsData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      GroupsActionTypes.UPDATE_GROUPS_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: GroupsActionTypes.UPDATE_GROUPS_SUCCEEDED,
        EditGroups: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "UPDATE_GROUPS_FAILED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData },
      mockResponse = {};

    const generator = updateGroupsData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: GroupsActionTypes.UPDATE_GROUPS_FAILED,
        EditGroups: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "SAVE_ERRORDATA_DATA" ', () => {
    const generator = saveGroupsWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(GroupsActionTypes.SAVE_GROUPS_DATA, saveGroupsData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "SAVE_GROUPS_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = saveGroupsData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type = GroupsActionTypes.SAVE_GROUPS_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: GroupsActionTypes.SAVE_GROUPS_SUCCEEDED,
        SaveGroups: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Groups saga dispatch action "SAVE_GROUPS_FAILED"', () => {
    const mockResponse = {};
    const generator = saveGroupsData({
      payload: mockData,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: GroupsActionTypes.SAVE_GROUPS_FAILED,
        SaveGroups: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
