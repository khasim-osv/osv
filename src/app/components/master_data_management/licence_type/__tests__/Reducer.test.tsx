import {
  getLicenseData_reducer,
  updateLicenseData_reducer,
  saveLicenseData_reducer,
} from "../Licenses.reducer";
import { LicenseActionTypes } from "../Licenses.actionTypes";

describe("<Licenses /> reducer", () => {
  const mockData = {
    success: true,
    data: {
      _id: "5e9d5d031c9d44000060a6da",
      moduleName: "Schedule payment",
      Web: false,
      Mobile: true,
      App: true,
      APIs: false,
      categoryId: "5e9c27636e9fb152343bfe7f",
    },
  };

  it("Licenses reducer return the initial state", () => {
    expect(getLicenseData_reducer(undefined, {})).toEqual({});
  });

  it('Licenses reducer handle "LICENSES_DATA" action', () => {
    expect(
      getLicenseData_reducer({}, { type: LicenseActionTypes.LICENSES_DATA })
    ).toEqual({
      loading: true,
    });
  });

  it('Licenses reducer handle "LICENSES_DATA_SUCCEEDED" action', () => {
    expect(
      getLicenseData_reducer(
        {},
        {
          type: LicenseActionTypes.LICENSES_DATA_SUCCEEDED,
          getLicenses: { ...mockData, data: [mockData.data] },
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
      data: [mockData.data],
    });
  });

  it('Licenses reducer handle "LICENSES_DATA_FAILED" action', () => {
    const mockData = { success: false, data: [] };
    expect(
      getLicenseData_reducer(
        {},
        { type: LicenseActionTypes.LICENSES_DATA_FAILED, getLicenses: mockData }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Licenses reducer handle "UPDATE_LICENSE_DATA" action', () => {
    expect(
      updateLicenseData_reducer(
        {},
        { type: LicenseActionTypes.UPDATE_LICENSE_DATA }
      )
    ).toEqual({
      loading: true,
    });
  });

  it('Licenses reducer handle "UPDATE_LICENSE_SUCCEEDED" action', () => {
    expect(
      updateLicenseData_reducer(
        {},
        {
          type: LicenseActionTypes.UPDATE_LICENSE_SUCCEEDED,
          editLicense: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Licenses reducer handle "UPDATE_LICENSE_FAILED" action', () => {
    const mockData = { success: false, data: {} };
    expect(
      updateLicenseData_reducer(
        {},
        { type: LicenseActionTypes.UPDATE_LICENSE_FAILED }
      )
    ).toEqual({
      loading: false,
    });
  });

  it('Licenses reducer handle "SAVE_LICENSE_DATA" action', () => {
    expect(
      saveLicenseData_reducer(
        {},
        { type: LicenseActionTypes.SAVE_LICENSE_DATA }
      )
    ).toEqual({
      loading: true,
    });
  });

  it('Licenses reducer handle "SAVE_LICENSE_SUCCEEDED" action', () => {
    expect(
      saveLicenseData_reducer(
        {},
        {
          type: LicenseActionTypes.SAVE_LICENSE_SUCCEEDED,
          saveLicense: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Licenses reducer handle "SAVE_LICENSE_FAILED" action', () => {
    expect(
      saveLicenseData_reducer(
        {},
        { type: LicenseActionTypes.SAVE_LICENSE_FAILED }
      )
    ).toEqual({
      loading: false,
    });
  });
});
