import {
  ErrorCodesActionTypes,
  ErrorCodesReducerActions,
  IErrorCodesData,
  IErrorCodesDetails,
  initialState,
  getErrorCodesInitialState,
} from "./ErrorCodes.actionTypes";

export const getErrorCodeData_reducer = (
  state: IErrorCodesData = getErrorCodesInitialState,
  action: ErrorCodesReducerActions
) => {
  switch (action.type) {
    case ErrorCodesActionTypes.ERRORCODE_DATA:
      return {
        loading: true,
      };
    case ErrorCodesActionTypes.ERRORCODE_DATA_SUCCEEDED: {
      return {
        loading: false,
        ...action.GetErrorCodes,
      };
    }
    case ErrorCodesActionTypes.ERRORCODE_DATA_FAILED: {
      return {
        loading: false,
        ...action.GetErrorCodes,
      };
    }
    case ErrorCodesActionTypes.ERRORCODES_DATA_CHANGED: {
      const newState = { ...state };
      let newData: IErrorCodesDetails[] = [];
      Array.isArray(newState.data) &&
        newState.data.forEach((item: IErrorCodesDetails) => {
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
export const updateErrorCodeData_reducer = (
  state: IErrorCodesData = initialState,
  action: ErrorCodesReducerActions
) => {
  switch (action.type) {
    case ErrorCodesActionTypes.UPDATE_ERRORCODE_DATA:
      return {
        loading: true,
      };
    case ErrorCodesActionTypes.UPDATE_ERRORCODE_SUCCEEDED: {
      return {
        loading: false,
        ...action.EditErrorCodes,
      };
    }

    case ErrorCodesActionTypes.UPDATE_ERRORCODE_FAILED: {
      return {
        loading: false,
        ...action.EditErrorCodes,
      };
    }
    case ErrorCodesActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const saveErrorCodeData_reducer = (
  state: {} = {},
  action: ErrorCodesReducerActions
) => {
  switch (action.type) {
    case ErrorCodesActionTypes.SAVE_ERRORCODE_DATA:
      return {
        loading: true,
      };
    case ErrorCodesActionTypes.SAVE_ERRORCODE_SUCCEEDED: {
      return {
        loading: false,
        ...action.SaveErrorCodes,
      };
    }
    case ErrorCodesActionTypes.SAVE_ERRORCODE_FAILED: {
      return {
        loading: false,
        ...action.SaveErrorCodes,
      };
    }
    case ErrorCodesActionTypes.SAVE_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
