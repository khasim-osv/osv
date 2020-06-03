import { connect } from "react-redux";
import CreateModule from "./CreateModule.component";

import { IModulesDetails, IReduxModulesState } from "./Modules.actionTypes";
import { Dispatch } from "redux";
import {
  save_modules_data,
  save_closed,
  get_categories,
} from "./Modules.action";

export const mapStateToProps = (state: IReduxModulesState) => {
  return {
    saveModule: state.modules.saveModule,
    categories: state.modules.categories,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveModuleData: (payload: IModulesDetails) =>
      dispatch(save_modules_data(payload)),
    getCategories: () => dispatch(get_categories()),
    saveClosed: () => dispatch(save_closed()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateModule as any);
