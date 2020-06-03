import {
  BanksActionTypes,
  IBanksDetails,
  ISearchKey,
} from "./Banks.actionTypes";

export function get_banks_data(
  searchKey?: ISearchKey,
  page?: number,
  pageSize?: number
) {
  return {
    type: BanksActionTypes.BANKS_DATA,
    payload: { ...searchKey, page, pageSize },
  };
}

export function update_banks_data(banksData: IBanksDetails) {
  {
    return {
      type: BanksActionTypes.UPDATE_BANKS_DATA,
      payload: banksData,
    };
  }
}

export function save_banks_data(banksData: IBanksDetails) {
  return {
    type: BanksActionTypes.SAVE_BANKS_DATA,
    payload: banksData,
  };
}

export function edit_closed() {
  return {
    type: BanksActionTypes.EDIT_CLOSED,
  };
}

export function save_closed() {
  return {
    type: BanksActionTypes.SAVE_CLOSED,
  };
}
export function banks_data_changed(data: IBanksDetails) {
  return {
    type: BanksActionTypes.BANKS_DATA_CHANGED,
    payload: data,
  };
}
