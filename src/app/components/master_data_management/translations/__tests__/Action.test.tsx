import {
  get_translation_data,
  update_translation_data,
  delete_translation_data,
  save_translation_data,
} from "../Translations.action";
import {
  TranslationActionTypes,
  ITranslationDetails,
} from "../Translation.actionTypes";

describe("<Translations /> action", () => {
  const mockData: ITranslationDetails = {
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
  it("Translation action for search results", () => {
    const searchKey = { search: "modules" };
    const expectedAction = {
      type: TranslationActionTypes.TRANSLATION_DATA,
      payload: searchKey,
    };
    expect(get_translation_data(searchKey)).toEqual(expectedAction);
  });

  it("Translations action to get data", () => {
    const expectedAction = {
      type: TranslationActionTypes.TRANSLATION_DATA,
    };
    expect(get_translation_data()).toEqual(expectedAction);
  });

  it("Translation action to edit data", () => {
    const editData = {
      _id: "5e96f4f5a9f75d6838ca412e",
      ...mockData,
    };
    const expectedAction = {
      type: TranslationActionTypes.UPDATE_TRANSLATION_DATA,
      payload: editData,
    };
    expect(update_translation_data(editData)).toEqual(expectedAction);
  });

  it("Translation action to delete data", () => {
    const Id = "5e96f4f5a9f75d6838ca412e";
    const expectedAction = {
      type: TranslationActionTypes.DELETE_TRANSLATION_DATA,
      payload: { Id },
    };

    expect(delete_translation_data(Id)).toEqual(expectedAction);
  });

  it("Translation action to save data", () => {
    const expectedAction = {
      type: TranslationActionTypes.SAVE_TRANSLATION_DATA,
      payload: mockData,
    };
    expect(save_translation_data(mockData)).toEqual(expectedAction);
  });
});
