import {
  ErrorCodesActionTypes,
  ISearchKey,
  IErrorCodesDetails,
} from "./ErrorCodes.actionTypes";

export function get_errorCode_data(
  searchKey?: ISearchKey,
  page?: number,
  pageSize?: number
) {
  return {
    type: ErrorCodesActionTypes.ERRORCODE_DATA,
    payload: { ...searchKey, page, pageSize },
  };
}

export function update_errorCode_data(errorCodeData: IErrorCodesDetails) {
  {
    return {
      type: ErrorCodesActionTypes.UPDATE_ERRORCODE_DATA,
      payload: errorCodeData,
    };
  }
}

export function save_errorCode_data(errorCodeData: IErrorCodesDetails) {
  return {
    type: ErrorCodesActionTypes.SAVE_ERRORCODE_DATA,
    payload: errorCodeData,
  };
}

export function edit_closed() {
  return {
    type: ErrorCodesActionTypes.EDIT_CLOSED,
  };
}

export function save_closed() {
  return {
    type: ErrorCodesActionTypes.SAVE_CLOSED,
  };
}
export function errorcodes_data_changed(data: IErrorCodesDetails) {
  return {
    type: ErrorCodesActionTypes.ERRORCODES_DATA_CHANGED,
    payload: data,
  };
}
