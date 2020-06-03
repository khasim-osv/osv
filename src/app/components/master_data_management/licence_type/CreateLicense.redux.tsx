import { connect } from "react-redux";
import CreateLicense from "./CreateLicense.component";
import {
  save_license_data,
  save_closed,
  getAllModules,
} from "./Licenses.action";

import {
  CreateLicenseStore,
  LicenseData,
  Dispatch,
} from "./Licenses.actionTypes";

export const mapStateToProps = (state: CreateLicenseStore) => {
  return {
    saveLicense: state.licenses.saveLicense,
    modules: state.licenses.modules.modules,
  };
};

//export const mapDispatchToProps = (dispatch: DispatchFromProps) => {
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveLicenseData: (payload: LicenseData) =>
      dispatch(save_license_data(payload)),
    saveClosed: () => dispatch(save_closed()),
    getAllModules: () => dispatch(getAllModules()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLicense);
