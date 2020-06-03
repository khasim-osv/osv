import {
  get_banks_data,
  update_banks_data,
  save_banks_data,
} from "../Banks.action";
import { BanksActionTypes, IBanksDetails } from "../Banks.actionTypes";

describe("<Banks /> action", () => {
  const mockData: IBanksDetails = {
    _id: "",
    logo: "",
    bank: "",
    url: "",
    type: "",
    isActive: true,
    success: false,
  };
  it("banks action for search results", () => {
    const searchKey = { search: "modules" };
    const page = 1;
    const pageSize = 3;
    const expectedAction = {
      type: BanksActionTypes.BANKS_DATA,
      payload: {
        search: "modules",
        page: 1,
        pageSize: 3,
      },
    };
    expect(get_banks_data(searchKey, page, pageSize)).toEqual(expectedAction);
  });
  it("banks action to get data", () => {
    const searchKey = { search: "modules" };
    const page = 1;
    const pageSize = 3;
    const expectedAction = {
      type: BanksActionTypes.BANKS_DATA,
      payload: {
        search: "modules",
        page: 1,
        pageSize: 3,
      },
    };
    expect(get_banks_data(searchKey, page, pageSize)).toEqual(expectedAction);
  });

  it("banks action to edit data", () => {
    const editData = {
      _id: "5e96f4f5a9f75d6838ca412e",
      ...mockData,
    };
    const expectedAction = {
      type: BanksActionTypes.UPDATE_BANKS_DATA,
      payload: editData,
    };
    expect(update_banks_data(editData)).toEqual(expectedAction);
  });

  it("banks action to save data", () => {
    const expectedAction = {
      type: BanksActionTypes.SAVE_BANKS_DATA,
      payload: mockData,
    };
    expect(save_banks_data(mockData)).toEqual(expectedAction);
  });
});
