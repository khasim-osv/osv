import {
  getTranslationData_reducer,
  updateTranslationData_reducer,
  deleteTranslationData_reducer,
  saveTranslationData_reducer,
} from "../Translations.reducer";
import {
  TranslationActionTypes,
  ITranslationData,
  initialState,
  getTranslationInitialState,
} from "../Translation.actionTypes";

describe("<Translations /> reducer", () => {
  const data = {
    _id: "5e96f4f5a9f75d6838ca412e",
    key: "modules",
    english: "modules",
    arabic: "الوحدات",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
  };
  const mockData: ITranslationData = {
    loading: false,
    success: true,
    data: data,
  };

  it("Translation reducer return the initial state", () => {
    expect(
      getTranslationData_reducer(undefined, {
        type: TranslationActionTypes.GET_INITIAL_STATE,
      })
    ).toEqual(getTranslationInitialState);
  });

  it('Translation reducer handle "TRANSLATION_DATA" action', () => {
    expect(
      getTranslationData_reducer(getTranslationInitialState, {
        type: TranslationActionTypes.TRANSLATION_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Translation reducer handle "TRANSLATION_DATA_SUCCEEDED" action', () => {
    expect(
      getTranslationData_reducer(getTranslationInitialState, {
        type: TranslationActionTypes.TRANSLATION_DATA_SUCCEEDED,
        GetTranslations: { ...mockData, data: [data] },
      })
    ).toEqual({
      loading: false,
      ...mockData,
      data: [mockData.data],
    });
  });

  it('Translation reducer handle "TRANSLATION_DATA_FAILED" action', () => {
    const mockData = { loading: false, success: false, data: [] };
    expect(
      getTranslationData_reducer(getTranslationInitialState, {
        type: TranslationActionTypes.TRANSLATION_DATA_FAILED,
        GetTranslations: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Translation reducer handle "UPDATE_TRANSLATION_DATA" action', () => {
    expect(
      updateTranslationData_reducer(initialState, {
        type: TranslationActionTypes.UPDATE_TRANSLATION_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Translation reducer handle "UPDATE_TRANSLATION_SUCCEEDED" action', () => {
    expect(
      updateTranslationData_reducer(initialState, {
        type: TranslationActionTypes.UPDATE_TRANSLATION_SUCCEEDED,
        EditTranslation: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Translation reducer handle "UPDATE_TRANSLATION_FAILED" action', () => {
    const mockData: ITranslationData = {
      loading: false,
      success: false,
      data: [],
    };
    expect(
      updateTranslationData_reducer(initialState, {
        type: TranslationActionTypes.UPDATE_TRANSLATION_FAILED,
        EditTranslation: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Translation reducer handle "DELETE_TRANSLATION_DATA" action', () => {
    expect(
      deleteTranslationData_reducer(initialState, {
        type: TranslationActionTypes.DELETE_TRANSLATION_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Translation reducer handle "DELETE_TRANSLATION_SUCCEEDED" action', () => {
    expect(
      deleteTranslationData_reducer(initialState, {
        type: TranslationActionTypes.DELETE_TRANSLATION_SUCCEEDED,
        DeleteTranslation: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Translation reducer handle "DELETE_TRANSLATION_FAILED" action', () => {
    const mockData: ITranslationData = {
      loading: false,
      success: false,
      data: [],
    };
    expect(
      deleteTranslationData_reducer(initialState, {
        type: TranslationActionTypes.DELETE_TRANSLATION_FAILED,
        DeleteTranslation: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Translation reducer handle "SAVE_TRANSLATION_DATA" action', () => {
    expect(
      saveTranslationData_reducer(initialState, {
        type: TranslationActionTypes.SAVE_TRANSLATION_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Translation reducer handle "SAVE_TRANSLATION_SUCCEEDED" action', () => {
    expect(
      saveTranslationData_reducer(initialState, {
        type: TranslationActionTypes.SAVE_TRANSLATION_SUCCEEDED,
        SaveTranslation: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Translation reducer handle "SAVE_TRANSLATION_FAILED" action', () => {
    const mockData: ITranslationData = {
      loading: false,
      success: false,
      data: [],
    };
    expect(
      saveTranslationData_reducer(initialState, {
        type: TranslationActionTypes.SAVE_TRANSLATION_FAILED,
        SaveTranslation: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });
});
