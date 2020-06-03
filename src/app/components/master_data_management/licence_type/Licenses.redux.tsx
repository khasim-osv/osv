import { connect } from "react-redux";
import Modules from "./Licenses.component";
import {
  get_licenses_data,
  update_license_data,
  edit_closed,
  getAllModules,
} from "./Licenses.action";

import { LicensesStore, LicenseData, Dispatch } from "./Licenses.actionTypes";

export const mapStateToProps = (state: LicensesStore) => {
  return {
    getLicenses: state.licenses.getLicenses,
    editLicense: state.licenses.editLicense,
    modules: state.licenses.modules.modules,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getLicensesData: () => dispatch(get_licenses_data()),
    updateLicenseData: (payload: LicenseData) => {
      dispatch(update_license_data(payload));
    },
    popupEditClose: () => dispatch(edit_closed()),
    getAllModules: () => dispatch(getAllModules()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
