import {
  LicenseActionTypes,
  License,
  LicenseData,
} from "./Licenses.actionTypes";

export function get_licenses_data() {
  return {
    type: LicenseActionTypes.LICENSES_DATA,
  };
}

export function update_license_data(licenseData: LicenseData) {
  return {
    type: LicenseActionTypes.UPDATE_LICENSE_DATA,
    payload: licenseData,
  };
}

export function edit_closed() {
  return {
    type: LicenseActionTypes.EDIT_CLOSED,
  };
}

export function save_license_data(license: LicenseData) {
  return {
    type: LicenseActionTypes.SAVE_LICENSE_DATA,
    payload: license,
  };
}

export function save_closed() {
  return {
    type: LicenseActionTypes.SAVE_CLOSED,
  };
}

export function getAllModules() {
  return {
    type: LicenseActionTypes.GET_MODULES,
  };
}
