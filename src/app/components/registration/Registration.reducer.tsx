import { Register1 } from "./Registration.action";

export const registration = (state: any = {}, action: any) => {
  switch (action.type) {
    case Register1: {
      return action.payload;
    }

    default:
      return state;
  }
};
