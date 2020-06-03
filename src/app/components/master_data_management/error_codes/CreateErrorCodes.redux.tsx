import { connect } from "react-redux";
import CreateErrorCodes from "./CreateErrorCodes.component";
import { save_errorCode_data, save_closed } from "./ErrorCodes.action";
import { Dispatch } from "redux";

import {
  ISearchKey,
  IErrorCodesDetails,
  IReduxErrorCodesState,
} from "./ErrorCodes.actionTypes";
export const mapStateToProps = (state: IReduxErrorCodesState) => {
  return {
    saveErrorCode: state.ErrorCodes.SaveErrorCodes,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveErrorCodesData: (payload: IErrorCodesDetails) =>
      dispatch(save_errorCode_data(payload)),
    saveClosed: () => dispatch(save_closed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateErrorCodes);
