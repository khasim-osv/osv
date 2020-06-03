import { ModulesActionTypes, IModulesDetails } from "./Modules.actionTypes";

export function get_modules_data(page?: number, pageSize?: number) {
  return {
    type: ModulesActionTypes.MODULES_DATA,
    payload: { page, pageSize },
  };
}

export function update_modules_data(modulesData: IModulesDetails) {
  {
    return {
      type: ModulesActionTypes.UPDATE_MODULES_DATA,
      payload: modulesData,
    };
  }
}
export function get_categories() {
  return {
    type: ModulesActionTypes.GET_CATEGORIES,
  };
}

export function delete_modules_data(modulesData: IModulesDetails) {
  return {
    type: ModulesActionTypes.DELETE_MODULES_DATA,
    payload: modulesData,
  };
}

export function save_modules_data(modulesData: IModulesDetails) {
  return {
    type: ModulesActionTypes.SAVE_MODULES_DATA,
    payload: modulesData,
  };
}

export function edit_closed() {
  return {
    type: ModulesActionTypes.EDIT_CLOSED,
  };
}

export function delete_closed() {
  return {
    type: ModulesActionTypes.DELETE_CLOSED,
  };
}

export function save_closed() {
  return {
    type: ModulesActionTypes.SAVE_CLOSED,
  };
}
export function modules_data_changed(data: IModulesDetails) {
  return {
    type: ModulesActionTypes.MODULES_DATA_CHANGED,
    payload: data,
  };
}
