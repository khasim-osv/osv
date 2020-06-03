import { connect } from "react-redux";
import Modules from "./Modules.component";
import {
  get_modules_data,
  update_modules_data,
  edit_closed,
  modules_data_changed,
} from "./Modules.action";
import {
  IModulesDetails,
  IReduxModulesState,
  IModulesData,
} from "./Modules.actionTypes";
import { Dispatch } from "redux";

export const mapStateToProps = (state: IReduxModulesState) => {
  return {
    getModules: state.modules.getModules,
    editModule: state.modules.editModule,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getModulesData: (page?: number, pageSize?: number) =>
      dispatch(get_modules_data(page, pageSize)),
    updateModuleData: (payload: IModulesDetails) => {
      dispatch(update_modules_data(payload));
    },

    popupEditClose: () => dispatch(edit_closed()),
    modulesDataChanged: (data: IModulesDetails) =>
      dispatch(modules_data_changed(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modules as any);
