import { connect } from "react-redux";
import RegistrationStep1 from "./Registration.component";
import { register } from "./Registration.action";

export const mapDispatchToProps = (dispatch: any) => {
  return {
    onRegister1: (onRegisterDetails: any) =>
      dispatch(register(onRegisterDetails)),
  };
};

export default connect(null, mapDispatchToProps)(RegistrationStep1);
