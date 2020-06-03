import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { TranslationActionTypes } from "./Translation.actionTypes";
import api from "../../../api.json";

export function* getTranslationData(req) {
  try {
    let res = null;
    req && req.payload.search
      ? (res = yield axios.post(api.translationSearch, req.payload))
      : (res = yield axios.get(
          api.translation + "/" + req.payload.page + "/" + req.payload.pageSize
        ));
    res.data.success
      ? yield put({
          type: TranslationActionTypes.TRANSLATION_DATA_SUCCEEDED,
          GetTranslations: res.data,
        })
      : yield put({
          type: TranslationActionTypes.TRANSLATION_DATA_FAILED,
          GetTranslations: res.data,
        });
  } catch (err) {
    yield put({
      type: TranslationActionTypes.TRANSLATION_DATA_FAILED,
    });
  }
}
export function* updateTranslationData({ payload }) {
  try {
    const res = yield axios.put(api.translation + "/" + payload._id, payload);
    res.data.success
      ? yield put({
          type: TranslationActionTypes.UPDATE_TRANSLATION_SUCCEEDED,
          EditTranslation: res.data,
        })
      : yield put({
          type: TranslationActionTypes.UPDATE_TRANSLATION_FAILED,
          EditTranslation: res.data,
        });
  } catch (err) {
    yield put({
      type: TranslationActionTypes.UPDATE_TRANSLATION_FAILED,
    });
  }
}

export function* deleteTranslationData(req) {
  try {
    const res = yield axios.delete(api.translation + "/" + req.payload.id);
    res.data.success
      ? yield put({
          type: TranslationActionTypes.DELETE_TRANSLATION_SUCCEEDED,
          DeleteTranslation: res.data,
        })
      : yield put({
          type: TranslationActionTypes.DELETE_TRANSLATION_FAILED,
          DeleteTranslation: res.data,
        });
  } catch (err) {
    yield put({
      type: TranslationActionTypes.DELETE_TRANSLATION_FAILED,
    });
  }
}

export function* saveTranslationData({ payload }) {
  try {
    const res = yield axios.post(api.translation, payload);
    res.data.success
      ? yield put({
          type: TranslationActionTypes.SAVE_TRANSLATION_SUCCEEDED,
          SaveTranslation: res.data,
        })
      : yield put({
          type: TranslationActionTypes.SAVE_TRANSLATION_FAILED,
          SaveTranslation: res.data,
        });
  } catch (err) {
    yield put({
      type: TranslationActionTypes.SAVE_TRANSLATION_FAILED,
    });
  }
}

export function* getTranslationDataWatcher() {
  yield takeLatest(TranslationActionTypes.TRANSLATION_DATA, getTranslationData);
}

export function* updateTranslationDataWatcher() {
  yield takeLatest(
    TranslationActionTypes.UPDATE_TRANSLATION_DATA,
    updateTranslationData
  );
}

export function* deleteTranslationDataWatcher() {
  yield takeLatest(
    TranslationActionTypes.DELETE_TRANSLATION_DATA,
    deleteTranslationData
  );
}

export function* saveTranslationDataWatcher() {
  yield takeLatest(
    TranslationActionTypes.SAVE_TRANSLATION_DATA,
    saveTranslationData
  );
}
