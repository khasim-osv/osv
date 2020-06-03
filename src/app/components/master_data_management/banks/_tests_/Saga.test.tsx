import { put, takeLatest } from "redux-saga/effects";
import {
  getBanksData,
  getBanksWatcher,
  updateBanksData,
  updateBanksWatcher,
  saveBanksData,
  saveBanksWatcher,
} from "../Banks.saga";
import {
  BanksActionTypes,
  IBanksData,
  BanksReducerActions,
  IBanksDetails,
  banksType,
} from "../Banks.actionTypes";

jest.mock("axios");

export interface IProps {
  payload: IBanksData;
  action: BanksReducerActions;
  type: BanksActionTypes;
}
export interface IAction {
  type: BanksActionTypes.SAVE_BANKS_DATA;
  payload: {
    _id: "";
    logo: "";
    bank: "";
    url: "";
    disable: true;
    type: "";
  };
}
describe("<Banks /> saga", () => {
  const mockData = {
    _id: "",
    logo: "",
    bank: "",
    url: "",
    disable: true,
    type: "",
  };
  it('Banks saga dispatch action "BANKS_DATA" ', () => {
    const generator = getBanksWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(BanksActionTypes.BANKS_DATA, getBanksData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "BANKS_DATA_SUCCEEDED"', () => {
    const mockResponse: any = [];
    const generator = getBanksData({
      type: BanksActionTypes.BANKS_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockResponse, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type = BanksActionTypes.BANKS_DATA_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: BanksActionTypes.BANKS_DATA_SUCCEEDED,
        GetBanks: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "Banks_DATA_FAILED"', () => {
    const mockResponse: IBanksDetails = {
      _id: "",
      logo: "",
      bank: "",
      url: "",
      type: "",
      isActive: true,
    };

    const generator = getBanksData({
      type: BanksActionTypes.BANKS_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: BanksActionTypes.BANKS_DATA_FAILED,
        GetBanks: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "UPDATE_Banks_DATA" ', () => {
    const generator = updateBanksWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(BanksActionTypes.UPDATE_BANKS_DATA, updateBanksData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "UPDATE_Banks_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = updateBanksData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type = BanksActionTypes.UPDATE_BANKS_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: BanksActionTypes.UPDATE_BANKS_SUCCEEDED,
        EditBanks: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "UPDATE_Banks_FAILED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData },
      mockResponse = {};

    const generator = updateBanksData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: BanksActionTypes.UPDATE_BANKS_FAILED,
        EditBanks: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "SAVE_ERRORDATA_DATA" ', () => {
    const generator = saveBanksWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(BanksActionTypes.SAVE_BANKS_DATA, saveBanksData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "SAVE_Banks_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = saveBanksData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type = BanksActionTypes.SAVE_BANKS_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: BanksActionTypes.SAVE_BANKS_SUCCEEDED,
        SaveBanks: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Banks saga dispatch action "SAVE_Banks_FAILED"', () => {
    const mockResponse = {};
    const generator = saveBanksData({
      payload: mockData,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: BanksActionTypes.SAVE_BANKS_FAILED,
        SaveBanks: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
