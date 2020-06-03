import {
  TranslationActionTypes,
  ISearchKey,
  ITranslationDetails,
} from "./Translation.actionTypes";

export function get_translation_data(
  searchKey?: ISearchKey,
  page?: number,
  pageSize?: number
) {
  return {
    type: TranslationActionTypes.TRANSLATION_DATA,
    payload: { ...searchKey, page, pageSize },
  };
}

export function update_translation_data(translationData: ITranslationDetails) {
  return {
    type: TranslationActionTypes.UPDATE_TRANSLATION_DATA,
    payload: translationData,
  };
}

export function delete_translation_data(id: string) {
  return {
    type: TranslationActionTypes.DELETE_TRANSLATION_DATA,
    payload: { id },
  };
}

export function save_translation_data(translationData: ITranslationDetails) {
  return {
    type: TranslationActionTypes.SAVE_TRANSLATION_DATA,
    payload: translationData,
  };
}

export function edit_closed() {
  return {
    type: TranslationActionTypes.EDIT_CLOSED,
  };
}

export function delete_closed() {
  return {
    type: TranslationActionTypes.DELETE_CLOSED,
  };
}

export function save_closed() {
  return {
    type: TranslationActionTypes.SAVE_CLOSED,
  };
}

export function translation_data_changed(translationData: ITranslationDetails) {
  return {
    type: TranslationActionTypes.TRANSLATION_DATA_CHANGED,
    payload: translationData,
  };
}
