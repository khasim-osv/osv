import { connect } from "react-redux";
import { Dispatch } from "redux";
import Login from "./Login.component";
import { login } from "./Login.action";
import { IUserDetails, IReduxLoginState } from "./Login.actionTypes";

export const mapStateToProps = (state: IReduxLoginState) => {
  return {
    ...state,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogin: (user: IUserDetails) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
