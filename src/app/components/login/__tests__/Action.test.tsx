import { login } from "../Login.action";
import { LoginActionTypes } from "../Login.actionTypes";

describe("<Login /> action", () => {
  it("Login action with correct type", () => {
    const mockUser = {
      userName: "khasim@onesingleview.com",
      password: "12345",
    };
    const expectedAction = {
      type: LoginActionTypes.LOGIN,
      payload: mockUser,
    };
    expect(login(mockUser)).toEqual(expectedAction);
  });
});
