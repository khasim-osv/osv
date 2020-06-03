export const Register1 = "Register1";

export function register(userRegisterDetails: any) {
  return {
    type: Register1,
    payload: { userRegisterDetails }
  };
}
