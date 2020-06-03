export enum LoginActionTypes {
  INITIAL_STATE = "INITIAL_STATE",
  LOGIN = "LOGIN",
  LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED",
  LOGIN_FAILED = "LOGIN_FAILED",
}

export interface IUserResponse {
  loading?: boolean;
  success: boolean;
  message?: string;
  data?: IUserDetails;
}

export interface IReduxLoginState {
  user: IUserResponse;
}

export interface IUserDetails {
  _id?: string;
  userName?: string;
  password?: string;
}

export const loginType = {
  loading: false,
  success: false,
  message: "",
  data: {
    _id: "",
    userName: "",
    password: "",
  },
};

export interface IReduxBaseAction {
  type: LoginActionTypes;
}

export type LoginReducerActions =
  | IReduxInitialStateAction
  | IReduxLoginAction
  | IReduxLoginSucceededAction
  | IReduxLoginFailedAction;

export interface IReduxInitialStateAction extends IReduxBaseAction {
  type: LoginActionTypes.INITIAL_STATE;
}
export interface IReduxLoginAction extends IReduxBaseAction {
  type: LoginActionTypes.LOGIN;
}
export interface IReduxLoginSucceededAction extends IReduxBaseAction {
  type: LoginActionTypes.LOGIN_SUCCEEDED;
  user: IUserDetails;
}

export interface IReduxLoginFailedAction extends IReduxBaseAction {
  type: LoginActionTypes.LOGIN_FAILED;
  user: IUserDetails;
}
