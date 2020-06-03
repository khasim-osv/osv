import {
  TranslationActionTypes,
  TranslationReducerActions,
  ITranslationData,
  ITranslationDetails,
  initialState,
  getTranslationInitialState,
} from "./Translation.actionTypes";

export const getTranslationData_reducer = (
  state: ITranslationData = getTranslationInitialState,
  action: TranslationReducerActions
) => {
  switch (action.type) {
    case TranslationActionTypes.TRANSLATION_DATA:
      return {
        loading: true,
      };
    case TranslationActionTypes.TRANSLATION_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.GetTranslations,
      };

    case TranslationActionTypes.TRANSLATION_DATA_FAILED: {
      return {
        loading: false,
        ...action.GetTranslations,
      };
    }
    case TranslationActionTypes.TRANSLATION_DATA_CHANGED: {
      const newState = { ...state };
      let newData: ITranslationDetails[] = [];
      Array.isArray(newState.data) &&
        newState.data.forEach((item: ITranslationDetails) => {
          if (
            !Array.isArray(action.payload.data) &&
            item._id === action.payload.data._id
          ) {
            action.payload.operation === "Edit" &&
              newData.push(action.payload.data);
          } else {
            newData.push(item);
          }
          return newData;
        });
      return { ...state, data: newData, loading: false };
    }
    default:
      return state;
  }
};

export const updateTranslationData_reducer = (
  state: ITranslationData = initialState,
  action: TranslationReducerActions
) => {
  switch (action.type) {
    case TranslationActionTypes.UPDATE_TRANSLATION_DATA:
      return {
        loading: true,
      };
    case TranslationActionTypes.UPDATE_TRANSLATION_SUCCEEDED: {
      return {
        loading: false,
        ...action.EditTranslation,
      };
    }
    case TranslationActionTypes.UPDATE_TRANSLATION_FAILED: {
      return {
        loading: false,
        ...action.EditTranslation,
      };
    }
    case TranslationActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const deleteTranslationData_reducer = (
  state: ITranslationData = initialState,
  action: TranslationReducerActions
) => {
  switch (action.type) {
    case TranslationActionTypes.DELETE_TRANSLATION_DATA: {
      return {
        loading: true,
      };
    }
    case TranslationActionTypes.DELETE_TRANSLATION_SUCCEEDED: {
      return {
        loading: false,
        ...action.DeleteTranslation,
      };
    }
    case TranslationActionTypes.DELETE_TRANSLATION_FAILED: {
      return {
        loading: false,
        ...action.DeleteTranslation,
      };
    }
    case TranslationActionTypes.DELETE_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const saveTranslationData_reducer = (
  state: {} = {},
  action: TranslationReducerActions
) => {
  switch (action.type) {
    case TranslationActionTypes.SAVE_TRANSLATION_DATA:
      return {
        loading: true,
      };
    case TranslationActionTypes.SAVE_TRANSLATION_SUCCEEDED: {
      return {
        loading: false,
        ...action.SaveTranslation,
      };
    }
    case TranslationActionTypes.SAVE_TRANSLATION_FAILED: {
      return {
        loading: false,
        ...action.SaveTranslation,
      };
    }
    case TranslationActionTypes.SAVE_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
