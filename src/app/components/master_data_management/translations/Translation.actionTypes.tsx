export enum TranslationActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  TRANSLATION_DATA = "TRANSLATION_DATA",
  TRANSLATION_DATA_SUCCEEDED = "TRANSLATION_DATA_SUCCEEDED",
  TRANSLATION_DATA_FAILED = "TRANSLATION_DATA_FAILED",
  TRANSLATION_DATA_CHANGED = "TRANSLATION_DATA_CHANGED",
  UPDATE_TRANSLATION_DATA = "UPDATE_TRANSLATION_DATA",
  UPDATE_TRANSLATION_SUCCEEDED = "UPDATE_TRANSLATION_SUCCEEDED",
  UPDATE_TRANSLATION_FAILED = "UPDATE_TRANSLATION_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  DELETE_TRANSLATION_DATA = "DELETE_TRANSLATION_DATA",
  DELETE_TRANSLATION_SUCCEEDED = "DELETE_TRANSLATION_SUCCEEDED",
  DELETE_TRANSLATION_FAILED = "DELETE_TRANSLATION_FAILED",
  DELETE_CLOSED = "DELETE_CLOSED",
  SAVE_TRANSLATION_DATA = "SAVE_TRANSLATION_DATA",
  SAVE_TRANSLATION_SUCCEEDED = "SAVE_TRANSLATION_SUCCEEDED",
  SAVE_TRANSLATION_FAILED = "SAVE_TRANSLATION_FAILED",
  SAVE_CLOSED = "SAVE_CLOSED",
}
export interface ISearchKey {
  search: string;
}
export interface ITranslationData {
  loading: boolean;
  success: boolean;
  totalRecords?: number;
  message?: string;
  data: ITranslationDetails | ITranslationDetails[];
  operation?: string;
}

export const translationType = {
  _id: "",
  key: "",
  value: {
    arabic: "",
    english: "",
  },
  english: "",
  arabic: "",
  modifiedBy: "",
  modifiedDate: "",
  success: false,
};

export const initialState: ITranslationData = {
  loading: false,
  success: false,
  message: "",
  data: translationType,
  operation: "",
};

export const getTranslationInitialState: ITranslationData = {
  loading: false,
  success: false,
  message: "",
  data: [translationType],
  operation: "",
};

export interface columns {
  Header: string;
  accessor: string;
}

export interface IState {
  IsEditOpen: boolean;
  IsDeleteOpen: boolean;
  selectedRow: IRow;
  deleteId: string;
  pageSize: number;
  initialPageSize: number;
  searchResults?: string | undefined;
}

export interface ITranslationDetails {
  _id?: string;
  key: string;
  value: ITranslationValue;
  english: string;
  arabic: string;
  modifiedBy: string;
  modifiedDate: string;
  success?: boolean;
}

export interface AllStates {
  GetTranslations: ITranslationData;
  EditTranslation: ITranslationData;
  DeleteTranslation: ITranslationData;
  SaveTranslation: ITranslationData;
}
export interface IReduxTranslationState {
  Translation: AllStates;
}

export interface IRow {
  original: ITranslationDetails;
}

export interface ITranslationValue {
  english: string;
  arabic: string;
}
export interface IReduxBaseAction {
  type: TranslationActionTypes;
}

export type TranslationReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_TranslationData_Action
  | IRedux_TranslationData_Succeeded_Action
  | IRedux_TranslationData_Failed_Action
  | IRedux_UpdateTranslationData_Action
  | IRedux_UpdateTranslationData_Succeeded_Action
  | IRedux_UpdateTranslationData_Failed_Action
  | IRedux_DeleteTranslationData_Action
  | IRedux_DeleteTranslationData_Succeeded_Action
  | IRedux_DeleteTranslationData_Failed_Action
  | IRedux_SaveTranslationData_Action
  | IRedux_SaveTranslationData_Succeeded_Action
  | IRedux_SaveTranslationData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_DeleteClosed_Action
  | IRedux_SaveClosed_Action
  | IRedux_TranslationDataChanged_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: TranslationActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_TranslationData_Action extends IReduxBaseAction {
  type: TranslationActionTypes.TRANSLATION_DATA;
}
export interface IRedux_TranslationData_Succeeded_Action
  extends IReduxBaseAction {
  type: TranslationActionTypes.TRANSLATION_DATA_SUCCEEDED;
  GetTranslations: ITranslationData;
}

export interface IRedux_TranslationData_Failed_Action extends IReduxBaseAction {
  type: TranslationActionTypes.TRANSLATION_DATA_FAILED;
  GetTranslations: ITranslationData;
}

export interface IRedux_UpdateTranslationData_Action extends IReduxBaseAction {
  type: TranslationActionTypes.UPDATE_TRANSLATION_DATA;
}
export interface IRedux_UpdateTranslationData_Succeeded_Action
  extends IReduxBaseAction {
  type: TranslationActionTypes.UPDATE_TRANSLATION_SUCCEEDED;
  EditTranslation: ITranslationData;
}

export interface IRedux_UpdateTranslationData_Failed_Action
  extends IReduxBaseAction {
  type: TranslationActionTypes.UPDATE_TRANSLATION_FAILED;
  EditTranslation: ITranslationData;
}

export interface IRedux_DeleteTranslationData_Action extends IReduxBaseAction {
  type: TranslationActionTypes.DELETE_TRANSLATION_DATA;
}
export interface IRedux_DeleteTranslationData_Succeeded_Action
  extends IReduxBaseAction {
  type: TranslationActionTypes.DELETE_TRANSLATION_SUCCEEDED;
  DeleteTranslation: ITranslationData;
}

export interface IRedux_DeleteTranslationData_Failed_Action
  extends IReduxBaseAction {
  type: TranslationActionTypes.DELETE_TRANSLATION_FAILED;
  DeleteTranslation: ITranslationData;
}

export interface IRedux_SaveTranslationData_Action extends IReduxBaseAction {
  type: TranslationActionTypes.SAVE_TRANSLATION_DATA;
}
export interface IRedux_SaveTranslationData_Succeeded_Action
  extends IReduxBaseAction {
  type: TranslationActionTypes.SAVE_TRANSLATION_SUCCEEDED;
  SaveTranslation: ITranslationData;
}

export interface IRedux_SaveTranslationData_Failed_Action
  extends IReduxBaseAction {
  type: TranslationActionTypes.SAVE_TRANSLATION_FAILED;
  SaveTranslation: ITranslationData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: TranslationActionTypes.EDIT_CLOSED;
}

export interface IRedux_DeleteClosed_Action extends IReduxBaseAction {
  type: TranslationActionTypes.DELETE_CLOSED;
}

export interface IRedux_SaveClosed_Action extends IReduxBaseAction {
  type: TranslationActionTypes.SAVE_CLOSED;
}

export interface IRedux_TranslationDataChanged_Action extends IReduxBaseAction {
  type: TranslationActionTypes.TRANSLATION_DATA_CHANGED;
  payload: ITranslationData;
}
