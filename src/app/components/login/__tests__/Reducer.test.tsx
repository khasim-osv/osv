import { login_reducer } from "../Login.reducer";
import { LoginActionTypes, loginType } from "../Login.actionTypes";

describe("<Login /> reducer", () => {
  const mockData = {
    Id: 1,
    userName: "khasim@onesingleview.com",
    password: "12345",
  };

  it("Login reducer return the initial state", () => {
    expect(
      login_reducer(undefined, { type: LoginActionTypes.INITIAL_STATE })
    ).toEqual({});
  });

  it('Login reducer handle "LOGIN" action', () => {
    expect(login_reducer(loginType, { type: LoginActionTypes.LOGIN })).toEqual({
      loading: true,
    });
  });

  it('Login reducer handle "LOGIN_SUCCEEDED" action', () => {
    expect(
      login_reducer(loginType, {
        type: LoginActionTypes.LOGIN_SUCCEEDED,
        user: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Login reducer handle "LOGIN_FAILED" action', () => {
    const mockData = { success: false, data: {}, userName: "", password: "" };
    expect(
      login_reducer(loginType, {
        type: LoginActionTypes.LOGIN_FAILED,
        user: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });
});
