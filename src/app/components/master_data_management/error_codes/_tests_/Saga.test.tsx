import { put, takeLatest } from "redux-saga/effects";
import {
  getErrorCodesData,
  getErrorCodesDataWatcher,
  updateErrorCodesData,
  updateErrorCodesDataWatcher,
  saveErrorCodesData,
  saveErrorCodesDataWatcher,
} from "../ErrorCodes.saga";
import {
  ErrorCodesActionTypes,
  IErrorCodesData,
  ErrorCodesReducerActions,
  IErrorCodesDetails,
  errorcodesType,
} from "../ErrorCodes.actionTypes";

jest.mock("axios");

export interface IProps {
  payload: IErrorCodesData;
  action: ErrorCodesReducerActions;
  type: ErrorCodesActionTypes;
}
export interface IAction {
  type: ErrorCodesActionTypes.SAVE_ERRORCODE_DATA;
  payload: {
    key: "modules";
    errorcode: "modules";
    value: {
      english: "modules";
      arabic: "الوحدات";
    };
    modifiedBy: "khasim@onesingleview.com";
    modifiedDate: "10/08/2020";
    disable: true;
  };
}
describe("<ErrorCodes /> saga", () => {
  const mockData = {
    key: "modules",
    errorcode: "modules",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
    disable: true,
  };
  it('ErrorCodes saga dispatch action "ERRORCODE_DATA" ', () => {
    const generator = getErrorCodesDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(ErrorCodesActionTypes.ERRORCODE_DATA, getErrorCodesData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "TRANSLATION_DATA_SUCCEEDED"', () => {
    const mockResponse: any = [];

    const generator = getErrorCodesData({
      type: ErrorCodesActionTypes.ERRORCODE_DATA,
      payload: {
        page: 1,
        pageSize: 3,
      },
    });

    generator.next();

    const response = { data: mockResponse, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      ErrorCodesActionTypes.ERRORCODE_DATA_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: ErrorCodesActionTypes.ERRORCODE_DATA_SUCCEEDED,
        GetErrorCodes: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('ErrorCodes saga dispatch action "ERRORCODE_DATA_FAILED"', () => {
    const mockResponse: IErrorCodesDetails = {
      key: "modules",
      errorcode: "modules",
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

    const generator = getErrorCodesData({
      type: ErrorCodesActionTypes.ERRORCODE_DATA,
      payload: {
        page: 1,
        pageSize: 3,
      },
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: ErrorCodesActionTypes.ERRORCODE_DATA_FAILED,
        GetErrorCodes: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('ErrorCodes saga dispatch action "UPDATE_ERRORCODE_DATA" ', () => {
    const generator = updateErrorCodesDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        ErrorCodesActionTypes.UPDATE_ERRORCODE_DATA,
        updateErrorCodesData
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('ErrorCodes saga dispatch action "UPDATE_ERRORCODE_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = updateErrorCodesData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      ErrorCodesActionTypes.UPDATE_ERRORCODE_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: ErrorCodesActionTypes.UPDATE_ERRORCODE_SUCCEEDED,
        EditErrorCodes: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('ErrorCodes saga dispatch action "UPDATE_ERRORCODE_FAILED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData },
      mockResponse = {};

    const generator = updateErrorCodesData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: ErrorCodesActionTypes.UPDATE_ERRORCODE_FAILED,
        EditErrorCodes: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('ErrorCodes saga dispatch action "SAVE_ERRORDATA_DATA" ', () => {
    const generator = saveErrorCodesDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(ErrorCodesActionTypes.SAVE_ERRORCODE_DATA, saveErrorCodesData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('ErrorCodes saga dispatch action "SAVE_ERRORCODE_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = saveErrorCodesData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      ErrorCodesActionTypes.SAVE_ERRORCODE_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: ErrorCodesActionTypes.SAVE_ERRORCODE_SUCCEEDED,
        SaveErrorCodes: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('ErrorCodes saga dispatch action "SAVE_ERRORCODE_FAILED"', () => {
    const mockResponse = {};
    const generator = saveErrorCodesData({
      payload: mockData,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: ErrorCodesActionTypes.SAVE_ERRORCODE_FAILED,
        SaveErrorCodes: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
