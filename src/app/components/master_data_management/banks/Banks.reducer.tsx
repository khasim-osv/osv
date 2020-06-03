import {
  BanksActionTypes,
  BanksReducerActions,
  IBanksData,
  IBanksDetails,
  initialState,
  getBanksInitialState,
} from "./Banks.actionTypes";

export const getBanks_reducer = (
  state: IBanksData = getBanksInitialState,
  action: BanksReducerActions
) => {
  switch (action.type) {
    case BanksActionTypes.BANKS_DATA:
      return {
        loading: true,
      };
    case BanksActionTypes.BANKS_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.GetBanks,
      };

    case BanksActionTypes.BANKS_DATA_FAILED: {
      return {
        loading: false,
        ...action.GetBanks,
      };
    }
    case BanksActionTypes.BANKS_DATA_CHANGED: {
      const newState = { ...state };
      let newData: IBanksDetails[] = [];
      Array.isArray(newState.data) &&
        newState.data.forEach((item: IBanksDetails) => {
          if (
            !Array.isArray(action.payload.data) &&
            item._id === action.payload.data._id
          ) {
            action.payload.operation === "Edit" &&
              newData.push(action.payload.data);
          } else {
            newData.push(item);
          }
          return newData;
        });
      return { ...state, data: newData, loading: false };
    }
    default:
      return state;
  }
};

export const updateBanks_reducer = (
  state: IBanksData = initialState,
  action: BanksReducerActions
) => {
  switch (action.type) {
    case BanksActionTypes.UPDATE_BANKS_DATA:
      return {
        loading: true,
      };
    case BanksActionTypes.UPDATE_BANKS_SUCCEEDED: {
      return {
        loading: false,
        ...action.EditBanks,
      };
    }
    case BanksActionTypes.UPDATE_BANKS_FAILED: {
      return {
        loading: false,
        ...action.EditBanks,
      };
    }
    case BanksActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const saveBanks_reducer = (
  state: {} = {},
  action: BanksReducerActions
) => {
  switch (action.type) {
    case BanksActionTypes.SAVE_BANKS_DATA:
      return {
        loading: true,
      };
    case BanksActionTypes.SAVE_BANKS_SUCCEEDED: {
      return {
        loading: false,
        ...action.SaveBanks,
      };
    }
    case BanksActionTypes.SAVE_BANKS_FAILED: {
      return {
        loading: false,
        ...action.SaveBanks,
      };
    }
    case BanksActionTypes.SAVE_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
