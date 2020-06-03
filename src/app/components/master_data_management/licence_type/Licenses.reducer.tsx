import {
  LicenseActionTypes,
  SaveAction,
  GetLicenseAction,
  UpdateLicenseAction,
  ModulesAction,
} from "./Licenses.actionTypes";

export const getLicenseData_reducer = (
  state: object = {},
  action: GetLicenseAction
) => {
  switch (action.type) {
    case LicenseActionTypes.LICENSES_DATA:
      return {
        loading: true,
      };
    case LicenseActionTypes.LICENSES_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.getLicenses,
      };

    case LicenseActionTypes.LICENSES_DATA_FAILED: {
      return {
        loading: false,
        ...action.getLicenses,
      };
    }
    default:
      return state;
  }
};

export const saveLicenseData_reducer = (
  state: object = {},
  action: SaveAction
) => {
  switch (action.type) {
    case LicenseActionTypes.SAVE_LICENSE_DATA:
      return {
        loading: true,
      };
    case LicenseActionTypes.SAVE_LICENSE_SUCCEEDED: {
      return {
        loading: false,
        ...action.saveLicense,
      };
    }
    case LicenseActionTypes.SAVE_LICENSE_FAILED: {
      return {
        loading: false,
      };
    }
    case LicenseActionTypes.SAVE_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const updateLicenseData_reducer = (
  state: object = {},
  action: UpdateLicenseAction
) => {
  switch (action.type) {
    case LicenseActionTypes.UPDATE_LICENSE_DATA:
      return {
        loading: true,
      };
    case LicenseActionTypes.UPDATE_LICENSE_SUCCEEDED: {
      return {
        loading: false,
        ...action.editLicense,
      };
    }
    case LicenseActionTypes.UPDATE_LICENSE_FAILED: {
      return {
        loading: false,
      };
    }
    case LicenseActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const getModules_reducer = (state: [] = [], action: ModulesAction) => {
  switch (action.type) {
    case LicenseActionTypes.GET_MODULES:
      return {
        loading: true,
      };
    case LicenseActionTypes.UPDATE_MODULES:
      return {
        loading: false,
        modules: action.modules,
      };
    default:
      return state;
  }
};
