import { connect } from "react-redux";
import CreateBanks from "./CreateBanks.component";
import { save_banks_data, save_closed } from "./Banks.action";
import { Dispatch } from "redux";

import {
  ISearchKey,
  IBanksDetails,
  IReduxBanksState,
} from "./Banks.actionTypes";
export const mapStateToProps = (state: IReduxBanksState) => {
  return {
    saveBanks: state.Banks.SaveBanks,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveBanksData: (payload: IBanksDetails) =>
      dispatch(save_banks_data(payload)),
    saveClosed: () => dispatch(save_closed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBanks);
