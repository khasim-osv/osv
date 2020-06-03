import { put, takeLatest } from "redux-saga/effects";
import { loginUser, loginUserWatcher } from "../Login.saga";
import { LoginActionTypes } from "../Login.actionTypes";

export interface IProps {
  payload: any;
  action: any;
  type: any;
}

describe("<Login /> saga", () => {
  it('Login saga dispatch action "LOGIN" ', () => {
    const generator = loginUserWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(LoginActionTypes.LOGIN, loginUser)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Login saga dispatch action "LOGIN_SUCCEEDED"', () => {
    const mockResponse = {
      Id: 1,
      userName: "khasim@onesingleview.com",
      password: "12345",
    };

    const generator = loginUser({
      type: LoginActionTypes.LOGIN,
      payload: { userName: "khasim@onesingleview.com", password: "12345" },
    });

    generator.next();

    const response = { data: mockResponse, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type = LoginActionTypes.LOGIN_SUCCEEDED;

    expect(nextResponse).toEqual(
      put({
        type: LoginActionTypes.LOGIN_SUCCEEDED,
        user: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('Login saga dispatch action "LOGIN_FAILED"', () => {
    const mockResponse = {};

    const generator = loginUser({
      type: LoginActionTypes.LOGIN,
      payload: { userName: "khasim@onesingleview.com", password: "123" },
    });

    generator.next();

    const response = { data: mockResponse, success: false },
      nextResponse = generator.next(response).value;

    expect(nextResponse).toEqual(
      put({
        type: LoginActionTypes.LOGIN_FAILED,
        user: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });
});
