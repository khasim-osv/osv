import { LoginActionTypes, IUserDetails } from "./Login.actionTypes";
export const login = (user: IUserDetails) => {
  return {
    type: LoginActionTypes.LOGIN,
    payload: user,
  };
};
