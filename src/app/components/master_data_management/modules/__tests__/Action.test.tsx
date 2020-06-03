import {
  get_modules_data,
  update_modules_data,
  save_modules_data,
} from "../Modules.action";
import { ModulesActionTypes } from "../Modules.actionTypes";

describe("<Modules /> action", () => {
  const mockData = {};
  it("Modules action for search results", () => {
    const expectedAction = {
      type: ModulesActionTypes.MODULES_DATA,
      payload: { page: 1, pageSize: 1 },
    };
    expect(get_modules_data(1, 1)).toEqual(expectedAction);
  });

  it("Modules action to edit data", () => {
    const editData = {
      _id: "5e96f4f5a9f75d6838ca412e",
      ...mockData,
    };
    const expectedAction = {
      type: ModulesActionTypes.UPDATE_MODULES_DATA,
      payload: editData,
    };
    expect(update_modules_data(editData)).toEqual(expectedAction);
  });

  it("Modules action to save data", () => {
    const expectedAction = {
      type: ModulesActionTypes.SAVE_MODULES_DATA,
      payload: mockData,
    };
    expect(save_modules_data(mockData)).toEqual(expectedAction);
  });
});
