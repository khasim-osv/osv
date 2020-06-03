import { connect } from "react-redux";
import { Dispatch } from "redux";
import MasterDataManagementComponent from "./MasterDataManagement.component";

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(null, mapDispatchToProps)(MasterDataManagementComponent);
