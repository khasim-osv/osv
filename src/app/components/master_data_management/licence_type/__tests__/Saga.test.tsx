import { put, takeLatest } from "redux-saga/effects";
import {
  getLicensesData,
  getLicensesDataWatcher,
  updateLicenseData,
  updateLicenseDataWatcher,
  saveLicenseData,
  saveLicenseDataWatcher,
} from "../Licenses.saga";
import { LicenseActionTypes } from "../Licenses.actionTypes";

import { LicenseData, GenericAction } from "./Licenses.Types";

jest.mock("axios");

export interface IProps {
  payload: LicenseData;
  action: GenericAction;
  type: string;
}

describe("<Licenses /> saga", () => {
  const mockData = {
    _id: "5e9d5d031c9d44000060a6da",
    moduleName: "Schedule payment",
    Web: false,
    Mobile: true,
    App: true,
    APIs: false,
    categoryId: "5e9c27636e9fb152343bfe7f",
  };
  it('Licenses saga dispatch action "MODULES_DATA" ', () => {
    const generator = getLicensesDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(LicenseActionTypes.LICENSES_DATA, getLicensesData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses saga dispatch action "LICENSES_DATA_SUCCEEDED"', () => {
    const mockResponse: LicenseData = [];

    const generator = getLicensesData();

    generator.next();

    const response = { data: mockResponse, success: true },
      nextResponse: LicenseData = generator.next(response).value;

    nextResponse.payload.action.type =
      LicenseActionTypes.LICENSES_DATA_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: LicenseActionTypes.LICENSES_DATA_SUCCEEDED,
        getLicenses: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses saga dispatch action "LICENSES_DATA_FAILED"', () => {
    const mockResponse: LicenseData = [];

    const generator = getLicensesData();

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: LicenseActionTypes.LICENSES_DATA_FAILED,
        getLicenses: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses dispatch action "UPDATE_LICENSE_DATA" ', () => {
    const generator = updateLicenseDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(LicenseActionTypes.UPDATE_LICENSE_DATA, updateLicenseData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses saga dispatch action "UPDATE_LICENSE_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = updateLicenseData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: LicenseData = generator.next(response).value;

    nextResponse.payload.action.type =
      LicenseActionTypes.UPDATE_LICENSE_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: LicenseActionTypes.UPDATE_LICENSE_SUCCEEDED,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses saga dispatch action "UPDATE_LICENSE_FAILED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData },
      mockResponse = {};

    const generator = updateLicenseData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: LicenseActionTypes.UPDATE_LICENSE_FAILED,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses saga dispatch action "SAVE_MODULE_DATA" ', () => {
    const generator = saveLicenseDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(LicenseActionTypes.SAVE_LICENSE_DATA, saveLicenseData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses saga dispatch action "SAVE_LICENSE_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = saveLicenseData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: LicenseData = generator.next(response).value;

    nextResponse.payload.action.type =
      LicenseActionTypes.SAVE_LICENSE_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: LicenseActionTypes.SAVE_LICENSE_SUCCEEDED,
        //  saveLicense: mockRequest
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Licenses saga dispatch action "SAVE_LICENSE_FAILED"', () => {
    const mockResponse = {};
    const generator = saveLicenseData({
      payload: mockData,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: LicenseActionTypes.SAVE_LICENSE_FAILED,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
