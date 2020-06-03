import {
  get_errorCode_data,
  update_errorCode_data,
  save_errorCode_data,
} from "../ErrorCodes.action";
import {
  ErrorCodesActionTypes,
  IErrorCodesDetails,
} from "../ErrorCodes.actionTypes";

describe("<ErrorCodes /> action", () => {
  const mockData: IErrorCodesDetails = {
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
  it("ErrorCodes action for search results", () => {
    const searchKey = { search: "modules" };
    const page = 1;
    const pageSize = 3;
    const expectedAction = {
      type: ErrorCodesActionTypes.ERRORCODE_DATA,
      payload: {
        search: "modules",
        page: 1,
        pageSize: 3,
      },
    };
    expect(get_errorCode_data(searchKey, page, pageSize)).toEqual(
      expectedAction
    );
  });
  it("ErrorCodes action to get data", () => {
    const searchKey = { search: "modules" };
    const page = 1;
    const pageSize = 3;
    const expectedAction = {
      type: ErrorCodesActionTypes.ERRORCODE_DATA,
      payload: {
        search: "modules",
        page: 1,
        pageSize: 3,
      },
    };
    expect(get_errorCode_data(searchKey, page, pageSize)).toEqual(
      expectedAction
    );
  });

  it("ErrorCodes action to edit data", () => {
    const editData = {
      _id: "5e96f4f5a9f75d6838ca412e",
      ...mockData,
    };
    const expectedAction = {
      type: ErrorCodesActionTypes.UPDATE_ERRORCODE_DATA,
      payload: editData,
    };
    expect(update_errorCode_data(editData)).toEqual(expectedAction);
  });

  it("ErrorCodes action to save data", () => {
    const expectedAction = {
      type: ErrorCodesActionTypes.SAVE_ERRORCODE_DATA,
      payload: mockData,
    };
    expect(save_errorCode_data(mockData)).toEqual(expectedAction);
  });
});
