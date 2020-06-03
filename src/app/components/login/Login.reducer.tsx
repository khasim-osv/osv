import { LoginActionTypes, LoginReducerActions } from "./Login.actionTypes";

export const login_reducer = (state: {} = {}, action: LoginReducerActions) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN:
      return {
        loading: true,
      };
    case LoginActionTypes.LOGIN_SUCCEEDED:
      return {
        loading: false,
        ...action.user,
      };

    case LoginActionTypes.LOGIN_FAILED: {
      return {
        loading: false,
        ...action.user,
      };
    }
    default:
      return state;
  }
};
