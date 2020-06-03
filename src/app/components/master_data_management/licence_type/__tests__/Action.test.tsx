import {
  get_licenses_data,
  update_license_data,
  save_license_data,
} from "../Licenses.action";
import { LicenseActionTypes } from "../Licenses.actionTypes";

describe("<Licenses /> action", () => {
  const mockData = {};
  it("Licenses action for search results", () => {
    const expectedAction = {
      type: LicenseActionTypes.LICENSES_DATA,
    };
    expect(get_licenses_data()).toEqual(expectedAction);
  });

  it("Licenses action to edit data", () => {
    const editData = {
      _id: "5e96f4f5a9f75d6838ca412e",
      ...mockData,
    };
    const expectedAction = {
      type: LicenseActionTypes.UPDATE_LICENSE_DATA,
      payload: editData,
    };
    expect(update_license_data(editData)).toEqual(expectedAction);
  });

  it("Modules action to save data", () => {
    const expectedAction = {
      type: LicenseActionTypes.SAVE_LICENSE_DATA,
      payload: mockData,
    };
    expect(save_license_data(mockData)).toEqual(expectedAction);
  });
});
