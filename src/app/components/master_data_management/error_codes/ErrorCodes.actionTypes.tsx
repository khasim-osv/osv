export enum ErrorCodesActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  ERRORCODE_DATA = "ERRORCODE_DATA",
  ERRORCODE_DATA_SUCCEEDED = "ERRORCODE_DATA_SUCCEEDED",
  ERRORCODE_DATA_FAILED = "ERRORCODE_DATA_FAILED",
  UPDATE_ERRORCODE_DATA = "UPDATE_ERRORCODE_DATA",
  UPDATE_ERRORCODE_SUCCEEDED = "UPDATE_ERRORCODE_SUCCEEDED",
  UPDATE_ERRORCODE_FAILED = "UPDATE_ERRORCODE_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  SAVE_CLOSED = "SAVE_CLOSED",
  SAVE_ERRORCODE_DATA = "SAVE_ERRORCODE_DATA",
  ERRORCODES_DATA_CHANGED = "ERRORCODES_DATA_CHANGED",
  SAVE_ERRORCODE_SUCCEEDED = "SAVE_ERRORCODE_SUCCEEDED",
  SAVE_ERRORCODE_FAILED = "SAVE_ERRORCODE_FAILED",
}
export interface ISearchKey {
  search: string;
}

export interface IErrorCodesData {
  loading: boolean;
  totalRecords?: number;
  success: boolean;
  message?: string;
  data: IErrorCodesDetails | IErrorCodesDetails[];
  operation?: string;
}

export const errorcodesType = {
  _id: "",
  key: "",
  errorcode: "",
  value: {
    arabic: "",
    english: "",
  },
  english: "",
  arabic: "",
  isActive: true,
  modifiedBy: "",
  modifiedDate: "",
  success: false,
};

export const initialState: IErrorCodesData = {
  loading: false,
  success: false,
  message: "",
  data: errorcodesType,
  operation: "",
};

export const getErrorCodesInitialState: IErrorCodesData = {
  loading: false,
  success: false,
  message: "",
  data: [errorcodesType],
  operation: "",
};

export interface columns {
  Header: string;
  accessor: string;
}

export interface IState {
  IsEditOpen: boolean;
  selectedRow: IRow;
  pageSize: number;
  initialPageSize: number;
  searchResults?: string | undefined;
}

export interface IErrorCodesDetails {
  _id?: string;
  key: string;
  errorcode: string;
  value: IErrorCodesValue;
  english: string;
  arabic: string;
  modifiedBy: string;
  modifiedDate: string;
  isActive: boolean;
  success?: boolean;
}

export interface AllStates {
  GetErrorCodes: IErrorCodesData;
  EditErrorCodes: IErrorCodesData;
  SaveErrorCodes: IErrorCodesData;
}
export interface IReduxErrorCodesState {
  ErrorCodes: AllStates;
}

export interface IRow {
  original: IErrorCodesDetails;
}

export interface IErrorCodesValue {
  english: string;
  arabic: string;
}
export interface IReduxBaseAction {
  type: ErrorCodesActionTypes;
}

export type ErrorCodesReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_ErrorCodesData_Action
  | IRedux_ErrorCodesData_Succeeded_Action
  | IRedux_ErrorCodesData_Failed_Action
  | IRedux_UpdateErrorCodesData_Action
  | IRedux_UpdateErrorCodesData_Succeeded_Action
  | IRedux_UpdateErrorCodesData_Failed_Action
  | IRedux_SaveErrorCodesData_Action
  | IRedux_SaveErrorCodesData_Succeeded_Action
  | IRedux_SaveErrorCodesData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_SaveClosed_Action
  | IRedux_ErrorCodesDataChanged_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_ErrorCodesData_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.ERRORCODE_DATA;
}
export interface IRedux_ErrorCodesData_Succeeded_Action
  extends IReduxBaseAction {
  type: ErrorCodesActionTypes.ERRORCODE_DATA_SUCCEEDED;
  GetErrorCodes: IErrorCodesData;
}

export interface IRedux_ErrorCodesData_Failed_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.ERRORCODE_DATA_FAILED;
  GetErrorCodes: IErrorCodesData;
}

export interface IRedux_UpdateErrorCodesData_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.UPDATE_ERRORCODE_DATA;
}
export interface IRedux_UpdateErrorCodesData_Succeeded_Action
  extends IReduxBaseAction {
  type: ErrorCodesActionTypes.UPDATE_ERRORCODE_SUCCEEDED;
  EditErrorCodes: IErrorCodesData;
}

export interface IRedux_UpdateErrorCodesData_Failed_Action
  extends IReduxBaseAction {
  type: ErrorCodesActionTypes.UPDATE_ERRORCODE_FAILED;
  EditErrorCodes: IErrorCodesData;
}

export interface IRedux_SaveErrorCodesData_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.SAVE_ERRORCODE_DATA;
}
export interface IRedux_SaveErrorCodesData_Succeeded_Action
  extends IReduxBaseAction {
  type: ErrorCodesActionTypes.SAVE_ERRORCODE_SUCCEEDED;
  SaveErrorCodes: IErrorCodesData;
}

export interface IRedux_SaveErrorCodesData_Failed_Action
  extends IReduxBaseAction {
  type: ErrorCodesActionTypes.SAVE_ERRORCODE_FAILED;
  SaveErrorCodes: IErrorCodesData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.EDIT_CLOSED;
}

export interface IRedux_SaveClosed_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.SAVE_CLOSED;
}

export interface IRedux_ErrorCodesDataChanged_Action extends IReduxBaseAction {
  type: ErrorCodesActionTypes.ERRORCODES_DATA_CHANGED;
  payload: IErrorCodesData;
}
