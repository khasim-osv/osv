import { put, takeLatest } from "redux-saga/effects";
import {
  getRoleManagementData,
  updateRoleManagementData,
  getMasterModulesData,
  getRoleManagementDataWatcher,
  updateRoleManagementDataWatcher,
  getMasterModulesDataWatcher,
} from "../RoleManagement.saga";
import {
  RoleManagementActionTypes,
  RoleManagementDetails,
} from "../RoleManagement.actionTypes";

export interface IProps {
  payload: any;
  action: any;
  type: any;
}

describe("<RoleManagement /> saga", () => {
  const mockData: RoleManagementDetails = {
    _id: "1",
    roleName: "CEO",
    modulesCategory: [
      {
        _id: "11",
        categoryName: "Funds transfers",
        modules: [
          {
            _id: "111",
            moduleName: "IMPS transfer",
          },
        ],
      },
    ],
    userProfileId: "13245678",
    isActive: true,
  };

  it('Role management saga dispatch action "ROLEMANAGEMENT_DATA"', () => {
    const generator = getRoleManagementDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        RoleManagementActionTypes.ROLEMANAGEMENT_DATA,
        getRoleManagementData
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "ROLEMANAGEMENT_DATA_SUCCEEDED"', () => {
    //const mockResponse: any = [];
    const generator = getRoleManagementData({
      type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockData, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      RoleManagementActionTypes.ROLEMANAGEMENT_DATA_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_SUCCEEDED,
        getRole: mockData,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "ROLEMANAGEMENT_DATA_FAILED"', () => {
    const generator = getRoleManagementData({
      type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: {}, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_FAILED,
        getRole: {},
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "UPDATE_ROLEMANAGEMENT_DATA"', () => {
    const generator = updateRoleManagementDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA,
        updateRoleManagementData
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "UPDATE_ROLEMANAGEMENT_SUCCEEDED"', () => {
    //const mockResponse: any = [];
    const generator = updateRoleManagementData({
      type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockData, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_SUCCEEDED,
        editRole: mockData,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "UPDATE_ROLEMANAGEMENT_FAILED"', () => {
    const generator = updateRoleManagementData({
      type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: {}, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_FAILED,
        editRole: {},
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "GET_MASTERMODULES_DATA"', () => {
    const generator = getMasterModulesDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        RoleManagementActionTypes.GET_MASTERMODULES_DATA,
        getMasterModulesData
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "GET_MASTERMODULES_SUCCEEDED"', () => {
    //const mockResponse: any = [];
    const generator = getMasterModulesData({
      type: RoleManagementActionTypes.GET_MASTERMODULES_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockData.modulesCategory, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      RoleManagementActionTypes.GET_MASTERMODULES_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: RoleManagementActionTypes.GET_MASTERMODULES_SUCCEEDED,
        getMasterModules: mockData.modulesCategory,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Role management saga dispatch action "GET_MASTERMODULES_FAILED"', () => {
    const generator = getMasterModulesData({
      type: RoleManagementActionTypes.GET_MASTERMODULES_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: [], success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: RoleManagementActionTypes.GET_MASTERMODULES_FAILED,
        getMasterModules: [],
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
