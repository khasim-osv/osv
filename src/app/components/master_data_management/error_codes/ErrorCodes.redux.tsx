import { connect } from "react-redux";
import ErrorCodes from "./ErrorCodes.component";
import { Dispatch } from "redux";

import {
  ISearchKey,
  IErrorCodesDetails,
  IReduxErrorCodesState,
} from "./ErrorCodes.actionTypes";
import {
  get_errorCode_data,
  update_errorCode_data,
  edit_closed,
  errorcodes_data_changed,
} from "./ErrorCodes.action";
import { string } from "yup";
export interface GetStates {
  ErrorCodes: {
    GetErrorCodes: object;
    EditErrorCodes: object;
    SaveErrorCodes: object;
  };
}

export const mapStateToProps = (state: IReduxErrorCodesState) => {
  return {
    getErrorCodes: state.ErrorCodes.GetErrorCodes,
    editErrorCode: state.ErrorCodes.EditErrorCodes,
  };
};
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getErrorCodesData: (
      searchKey?: ISearchKey,
      page?: number,
      pageSize?: number
    ) => dispatch(get_errorCode_data(searchKey, page, pageSize)),
    updateErrorCodesData: (payload: IErrorCodesDetails) =>
      dispatch(update_errorCode_data(payload)),

    popupEditClose: () => dispatch(edit_closed()),
    errorCodesDataChanged: (data: IErrorCodesDetails) =>
      dispatch(errorcodes_data_changed(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorCodes as any);
