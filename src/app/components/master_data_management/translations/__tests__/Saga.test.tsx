import { put, takeLatest } from "redux-saga/effects";
import {
  getTranslationData,
  getTranslationDataWatcher,
  updateTranslationData,
  updateTranslationDataWatcher,
  deleteTranslationData,
  deleteTranslationDataWatcher,
  saveTranslationData,
  saveTranslationDataWatcher,
} from "../Translations.saga";
import { TranslationActionTypes } from "../Translation.actionTypes";

export interface IProps {
  payload: any;
  action: any;
  type: any;
}

describe("<Translations /> saga", () => {
  const mockData = {
    key: "modules",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
  };
  it('Translations saga dispatch action "TRANSLATION_DATA" ', () => {
    const generator = getTranslationDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(TranslationActionTypes.TRANSLATION_DATA, getTranslationData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "TRANSLATION_DATA_SUCCEEDED"', () => {
    const mockResponse: any = [];

    const generator = getTranslationData({
      type: TranslationActionTypes.TRANSLATION_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockResponse, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      TranslationActionTypes.TRANSLATION_DATA_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.TRANSLATION_DATA_SUCCEEDED,
        GetTranslations: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "TRANSLATION_DATA_FAILED"', () => {
    const mockResponse: any = [];

    const generator = getTranslationData({
      type: TranslationActionTypes.TRANSLATION_DATA,
      payload: {},
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.TRANSLATION_DATA_FAILED,
        GetTranslations: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "UPDATE_TRANSLATION_DATA" ', () => {
    const generator = updateTranslationDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        TranslationActionTypes.UPDATE_TRANSLATION_DATA,
        updateTranslationData
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "UPDATE_TRANSLATION_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = updateTranslationData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      TranslationActionTypes.UPDATE_TRANSLATION_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.UPDATE_TRANSLATION_SUCCEEDED,
        EditTranslation: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "UPDATE_TRANSLATION_FAILED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData },
      mockResponse = {};

    const generator = updateTranslationData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.UPDATE_TRANSLATION_FAILED,
        EditTranslation: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "DELETE_TRANSLATION_DATA" ', () => {
    const generator = deleteTranslationDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        TranslationActionTypes.DELETE_TRANSLATION_DATA,
        deleteTranslationData
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "DELETE_TRANSLATION_SUCCEEDED"', () => {
    const mockRequest = { Id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = deleteTranslationData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      TranslationActionTypes.DELETE_TRANSLATION_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.DELETE_TRANSLATION_SUCCEEDED,
        DeleteTranslation: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "DELETE_TRANSLATION_FAILED"', () => {
    const mockRequest = { Id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = deleteTranslationData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.DELETE_TRANSLATION_FAILED,
        DeleteTranslation: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "SAVE_TRANSLATION_DATA" ', () => {
    const generator = saveTranslationDataWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        TranslationActionTypes.SAVE_TRANSLATION_DATA,
        saveTranslationData
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "SAVE_TRANSLATION_SUCCEEDED"', () => {
    const mockRequest = { _id: "5e96f4f5a9f75d6838ca412e", ...mockData };

    const generator = saveTranslationData({
      payload: mockRequest,
    });

    generator.next();

    const response = { data: mockRequest, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      TranslationActionTypes.SAVE_TRANSLATION_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.SAVE_TRANSLATION_SUCCEEDED,
        SaveTranslation: mockRequest,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Translations saga dispatch action "SAVE_TRANSLATION_FAILED"', () => {
    const mockResponse = {};
    const generator = saveTranslationData({
      payload: mockData,
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: TranslationActionTypes.SAVE_TRANSLATION_FAILED,
        SaveTranslation: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
