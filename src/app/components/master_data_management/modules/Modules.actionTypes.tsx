export enum ModulesActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  MODULES_DATA = "MODULES_DATA",
  MODULES_DATA_SUCCEEDED = "MODULES_DATA_SUCCEEDED",
  MODULES_DATA_FAILED = "MODULES_DATA_FAILED",
  UPDATE_MODULES_DATA = "UPDATE_MODULES_DATA",
  UPDATE_MODULES_SUCCEEDED = "UPDATE_MODULES_SUCCEEDED",
  UPDATE_MODULES_FAILED = "UPDATE_MODULES_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  SAVE_CLOSED = "SAVE_CLOSED",
  DELETE_MODULES_DATA = "DELETE_MODULES_DATA",
  DELETE_MODULES_SUCCEEDED = "DELETE_MODULES_SUCCEEDED",
  DELETE_MODULES_FAILED = "DELETE_MODULES_FAILED",
  DELETE_CLOSED = "DELETE_CLOSED",
  SAVE_MODULES_DATA = "SAVE_MODULES_DATA",
  MODULES_DATA_CHANGED = "MODULES_DATA_CHANGED",
  SAVE_MODULES_SUCCEEDED = "SAVE_MODULES_SUCCEEDED",
  SAVE_MODULES_FAILED = "SAVE_MODULES_FAILED",
  GET_CATEGORIES = "GET_CATEGORIES",
  UPDATE_CATEGORIES = "UPDATE_CATEGORIES",
}

export interface IModulesData {
  loading: boolean;
  totalRecords?: number;
  success: boolean;
  message?: string;
  data: IModulesDetails | IModulesDetails[];
  operation?: string;
}

export const modulesType = {
  _id: "",
  moduleName: "",
  Web: false,
  Mobile: true,
  App: false,
  APIs: false,
  categoryId: "",
  isActive: true,
  success: false,
};

export const initialState: IModulesData = {
  loading: false,
  success: false,
  message: "",
  data: modulesType,
  operation: "",
};

export const getModulesInitialState: IModulesData = {
  loading: false,
  success: false,
  message: "",
  data: [modulesType],
  operation: "",
};

export interface columns {
  Header: string;
  accessor: string;
  headerStyle: object;
  Cell?: any;
}
export interface Category {
  _id: string;
  value: string;
  label: string;
}
export interface GetCategoriesAction {
  type: string;
  categories: [Category];
}
export interface IState {
  IsEditOpen: boolean;
  selectedRow: IRow;
  pageSize: number;
  initialPageSize: number;
  searchResults?: string | undefined;
}
export interface IModule {
  _id: string;
  moduleName: string;
  Web: boolean;
  Mobile: boolean;
  App: boolean;
  APIs: boolean;
  display: true;
  categoryId: string;
}
export interface IModulesDetails {
  _id?: string;
  moduleName: string;
  Web: boolean;
  Mobile: boolean;
  App: boolean;
  APIs: boolean;
  //categoryId: string;
  isActive: boolean;
  success?: boolean;
}
export interface CheckForTrue {
  disabled?: boolean | string | undefined;
  checked?: boolean | string | undefined;
}
export interface AllStates {
  getModules: IModulesData;
  editModule: IModulesData;
  deleteModules: IModulesData;
  saveModule: IModulesData;
  categories: GetCategoriesAction;
}

export interface IReduxModulesState {
  modules: AllStates;
}

export interface IRow {
  original: IModulesDetails;
}

export interface IReduxBaseAction {
  type: ModulesActionTypes;
}

export type ModulesReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_ModulesData_Action
  | IRedux_ModulesData_Succeeded_Action
  | IRedux_ModulesData_Failed_Action
  | IRedux_UpdateModulesData_Action
  | IRedux_UpdateModulesData_Succeeded_Action
  | IRedux_UpdateModulesData_Failed_Action
  | IRedux_DeleteModulesData_Action
  | IRedux_DeleteModulesData_Succeeded_Action
  | IRedux_DeleteModulesData_Failed_Action
  | IRedux_SaveModulesData_Action
  | IRedux_SaveModulesData_Succeeded_Action
  | IRedux_SaveModulesData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_DeleteClosed_Action
  | IRedux_SaveClosed_Action
  | IRedux_GetCatagories_Action
  | IRedux_UpdateCategoried_Action
  | IRedux_ModulesDataChanged_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: ModulesActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_GetCatagories_Action extends IReduxBaseAction {
  type: ModulesActionTypes.GET_CATEGORIES;
}
export interface IRedux_UpdateCategoried_Action extends IReduxBaseAction {
  type: ModulesActionTypes.UPDATE_CATEGORIES;
}
export interface IRedux_ModulesData_Action extends IReduxBaseAction {
  type: ModulesActionTypes.MODULES_DATA;
}
export interface IRedux_ModulesData_Succeeded_Action extends IReduxBaseAction {
  type: ModulesActionTypes.MODULES_DATA_SUCCEEDED;
  getModules: IModulesData;
}

export interface IRedux_ModulesData_Failed_Action extends IReduxBaseAction {
  type: ModulesActionTypes.MODULES_DATA_FAILED;
  getModules: IModulesData;
}

export interface IRedux_UpdateModulesData_Action extends IReduxBaseAction {
  type: ModulesActionTypes.UPDATE_MODULES_DATA;
}
export interface IRedux_UpdateModulesData_Succeeded_Action
  extends IReduxBaseAction {
  type: ModulesActionTypes.UPDATE_MODULES_SUCCEEDED;
  editModule: IModulesData;
}

export interface IRedux_UpdateModulesData_Failed_Action
  extends IReduxBaseAction {
  type: ModulesActionTypes.UPDATE_MODULES_FAILED;
  editModule: IModulesData;
}

export interface IRedux_DeleteModulesData_Action extends IReduxBaseAction {
  type: ModulesActionTypes.DELETE_MODULES_DATA;
}
export interface IRedux_DeleteModulesData_Succeeded_Action
  extends IReduxBaseAction {
  type: ModulesActionTypes.DELETE_MODULES_SUCCEEDED;
  deleteModules: IModulesData;
}

export interface IRedux_DeleteModulesData_Failed_Action
  extends IReduxBaseAction {
  type: ModulesActionTypes.DELETE_MODULES_FAILED;
  deleteModules: IModulesData;
}

export interface IRedux_SaveModulesData_Action extends IReduxBaseAction {
  type: ModulesActionTypes.SAVE_MODULES_DATA;
}
export interface IRedux_SaveModulesData_Succeeded_Action
  extends IReduxBaseAction {
  type: ModulesActionTypes.SAVE_MODULES_SUCCEEDED;
  saveModule: IModulesData;
}

export interface IRedux_SaveModulesData_Failed_Action extends IReduxBaseAction {
  type: ModulesActionTypes.SAVE_MODULES_FAILED;
  saveModule: IModulesData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: ModulesActionTypes.EDIT_CLOSED;
}

export interface IRedux_DeleteClosed_Action extends IReduxBaseAction {
  type: ModulesActionTypes.DELETE_CLOSED;
}

export interface IRedux_SaveClosed_Action extends IReduxBaseAction {
  type: ModulesActionTypes.SAVE_CLOSED;
}

export interface IRedux_ModulesDataChanged_Action extends IReduxBaseAction {
  type: ModulesActionTypes.MODULES_DATA_CHANGED;
  payload: IModulesData;
}
