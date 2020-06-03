import {
  getErrorCodeData_reducer,
  updateErrorCodeData_reducer,
  deleteErrorCodeData_reducer,
  saveErrorCodeData_reducer,
} from "../ErrorCodes.reducer";
import {
  ErrorCodesActionTypes,
  IErrorCodesData,
  initialState,
  getErrorCodesInitialState,
} from "../ErrorCodes.actionTypes";

describe("<Errorcodes /> reducer", () => {
  const data = {
    _id: "5e96f4f5a9f75d6838ca412e",
    key: "modules",
    errorcode: "modules",
    english: "modules",
    arabic: "الوحدات",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
    isActive: true,
  };
  const mockData: IErrorCodesData = {
    loading: false,
    success: true,
    data: data,
  };

  it("ErrorCodes reducer return the initial state", () => {
    expect(
      getErrorCodeData_reducer(undefined, {
        type: ErrorCodesActionTypes.GET_INITIAL_STATE,
      })
    ).toEqual(getErrorCodesInitialState);
  });

  it('Errorcodes reducer handle "ERRORCODE_DATA" action', () => {
    expect(
      getErrorCodeData_reducer(initialState, {
        type: ErrorCodesActionTypes.ERRORCODE_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Errorcodes reducer handle "ERRORCODES_DATA_SUCCEEDED" action', () => {
    expect(
      getErrorCodeData_reducer(initialState, {
        type: ErrorCodesActionTypes.ERRORCODE_DATA_SUCCEEDED,
        GetErrorCodes: { ...mockData, data: [data] },
      })
    ).toEqual({
      loading: false,
      ...mockData,
      data: [mockData.data],
    });
  });

  it('ErrorCodes reducer handle "ERRORCODE_DATA_FAILED" action', () => {
    const mockData: IErrorCodesData = {
      loading: false,
      success: false,
      data: [],
    };

    expect(
      getErrorCodeData_reducer(initialState, {
        type: ErrorCodesActionTypes.ERRORCODE_DATA_FAILED,
        GetErrorCodes: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Errorcode reducer handle "UPDATE_ERRORCODE_DATA" action', () => {
    expect(
      updateErrorCodeData_reducer(initialState, {
        type: ErrorCodesActionTypes.UPDATE_ERRORCODE_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Errorcode reducer handle "UPDATE_ERRORCODE_SUCCEEDED" action', () => {
    expect(
      updateErrorCodeData_reducer(initialState, {
        type: ErrorCodesActionTypes.UPDATE_ERRORCODE_SUCCEEDED,
        EditErrorCodes: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Errorcode reducer handle "UPDATE_ERRORCODE_FAILED" action', () => {
    const mockData: IErrorCodesData = {
      loading: false,
      success: false,
      data: [],
    };
    expect(
      updateErrorCodeData_reducer(initialState, {
        type: ErrorCodesActionTypes.UPDATE_ERRORCODE_FAILED,
        EditErrorCodes: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('ErrorCode reducer handle "SAVE_ERRORCODE_DATA" action', () => {
    expect(
      saveErrorCodeData_reducer(
        {},
        { type: ErrorCodesActionTypes.SAVE_ERRORCODE_DATA }
      )
    ).toEqual({
      loading: true,
    });
  });

  it('ErrorCode reducer handle "SAVE_ERRORCODE_SUCCEEDED" action', () => {
    expect(
      saveErrorCodeData_reducer(
        {},
        {
          type: ErrorCodesActionTypes.SAVE_ERRORCODE_SUCCEEDED,
          SaveErrorCodes: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Errorcode reducer handle "SAVE_ERRORCODE_FAILED" action', () => {
    const mockData = { loading: false, success: false, data: [] };
    expect(
      saveErrorCodeData_reducer(
        {},
        {
          type: ErrorCodesActionTypes.SAVE_ERRORCODE_FAILED,
          SaveErrorCodes: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });
});
