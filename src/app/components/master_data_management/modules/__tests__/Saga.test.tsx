import { put, takeLatest } from "redux-saga/effects";
import {
  getModulesData,
  getModulesDataWatcher,
  updateModuleData,
  updateModuleDataWatcher,
  saveModuleData,
  saveModuleDataWatcher,
} from "../Modules.saga";
import { ModulesActionTypes, IModule as Module } from "../Modules.actionTypes";

jest.mock("axios");

describe("<Modules /> saga", () => {
  const mockData = {
    _id: "5e9d5d031c9d44000060a6da",
    moduleName: "Schedule payment",
    Web: false,
    Mobile: true,
    App: true,
    APIs: false,
    categoryId: "5e9c27636e9fb152343bfe7f",
  };
  it('Modules saga dispatch action "MODULES_DATA" ', () => {
    const generator = getModulesDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(ModulesActionTypes.MODULES_DATA, getModulesData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Modules saga dispatch action "MODULES_DATA_SUCCEEDED"', () => {
    const mockResponse: Module = [];

    const req = { payload: { search: "", page: 1, pageSize: 1 } };
    const generator = getModulesData(req);

    generator.next();

    const response = { data: mockResponse, success: true },
      nextResponse: Module = generator.next(response).value;

    nextResponse.payload.action.type =
      ModulesActionTypes.MODULES_DATA_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: ModulesActionTypes.MODULES_DATA_SUCCEEDED,
        getModules: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Modules saga dispatch action "MODULES_DATA_FAILED"', () => {
    const mockResponse: Module = [];

    const req = { payload: { search: "", page: 1, pageSize: 1 } };
    const generator = getModulesData(req);

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: ModulesActionTypes.MODULES_DATA_FAILED,
        getModules: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Modules dispatch action "UPDATE_MODULE_DATA" ', () => {
    const generator = updateModuleDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(ModulesActionTypes.UPDATE_MODULES_DATA, updateModuleData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Modules saga dispatch action "UPDATE_MODULE_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = updateModuleData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: Module = generator.next(response).value;

    nextResponse.payload.action.type =
      ModulesActionTypes.UPDATE_MODULES_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: ModulesActionTypes.UPDATE_MODULES_SUCCEEDED,
        // editModule: mockRequest
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Modules saga dispatch action "UPDATE_MODULE_FAILED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData },
      mockResponse = {};

    const generator = updateModuleData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: ModulesActionTypes.UPDATE_MODULES_FAILED,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Modules saga dispatch action "SAVE_MODULE_DATA" ', () => {
    const generator = saveModuleDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(ModulesActionTypes.SAVE_MODULES_DATA, saveModuleData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Modules saga dispatch action "SAVE_MODULE_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = saveModuleData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: Module = generator.next(response).value;

    nextResponse.payload.action.type =
      ModulesActionTypes.SAVE_MODULES_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: ModulesActionTypes.SAVE_MODULES_SUCCEEDED,
        //   saveModule: mockRequest
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Modules saga dispatch action "SAVE_MODULE_FAILED"', () => {
    const mockResponse = {};
    const generator = saveModuleData({
      payload: mockData,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: ModulesActionTypes.SAVE_MODULES_FAILED,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
