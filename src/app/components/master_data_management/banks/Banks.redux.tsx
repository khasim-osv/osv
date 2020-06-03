import { connect } from "react-redux";
import Banks from "./Banks.component";
import { Dispatch } from "redux";

import {
  get_banks_data,
  update_banks_data,
  edit_closed,
  banks_data_changed,
} from "./Banks.action";
import {
  ISearchKey,
  IBanksDetails,
  IReduxBanksState,
} from "./Banks.actionTypes";

export const mapStateToProps = (state: IReduxBanksState) => {
  return {
    getBanks: state.Banks.GetBanks,
    editBanks: state.Banks.EditBanks,
  };
};
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getBanksData: (searchKey?: ISearchKey, page?: number, pageSize?: number) =>
      dispatch(get_banks_data(searchKey, page, pageSize)),
    updateBanksData: (payload: IBanksDetails) =>
      dispatch(update_banks_data(payload)),
    popupEditClose: () => dispatch(edit_closed()),
    banksDataChanged: (data: IBanksDetails) =>
      dispatch(banks_data_changed(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banks as any);
