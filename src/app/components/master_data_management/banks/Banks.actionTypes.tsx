export enum BanksActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  BANKS_DATA = "BANKS_DATA",
  BANKS_DATA_SUCCEEDED = "BANKS_DATA_SUCCEEDED",
  BANKS_DATA_FAILED = "BANKS_DATA_FAILED",
  UPDATE_BANKS_DATA = "UPDATE_BANKS_DATA",
  UPDATE_BANKS_SUCCEEDED = "UPDATE_BANKS_SUCCEEDED",
  UPDATE_BANKS_FAILED = "UPDATE_BANKS_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  SAVE_CLOSED = "SAVE_CLOSED",
  SAVE_BANKS_DATA = "SAVE_BANKS_DATA",
  BANKS_DATA_CHANGED = "BANKS_DATA_CHANGED",
  SAVE_BANKS_SUCCEEDED = "SAVE_BANKS_SUCCEEDED",
  SAVE_BANKS_FAILED = "SAVE_BANKS_FAILED",
}

export interface ISearchKey {
  search: string;
}

export interface IBanksData {
  loading: boolean;
  success: boolean;
  message?: string;
  totalRecords?: number;
  data: IBanksDetails | IBanksDetails[];
  operation?: string;
}

export const banksType = {
  _id: "",
  logo: "",
  bank: "",
  url: "",
  type: "",
  isActive: true,
  success: false,
};

export const initialState: IBanksData = {
  loading: false,
  success: false,
  message: "",
  data: banksType,
  operation: "",
};

export const getBanksInitialState: IBanksData = {
  loading: false,
  success: false,
  message: "",
  data: [banksType],
  operation: "",
};

export interface columns {
  Header: string;
  accessor: string;
  Cell?: (row?: any) => JSX.Element;
}

export interface IState {
  IsEditOpen: boolean;
  selectedRow: IRow;
  selectedImage: string;
  pageSize: number;
  initialPageSize: number;
  searchResults?: string | undefined;
}

export interface IBanksDetails {
  _id?: string;
  logo: any;
  bank: string;
  url: string;
  type: string;
  isActive: boolean;
  success?: boolean;
}

export interface AllStates {
  GetBanks: IBanksData;
  EditBanks: IBanksData;
  SaveBanks: IBanksData;
}

export interface IFile {
  target: [Ifileobj];
}
export interface Ifileobj {
  filename: string;
}
export interface IReduxBanksState {
  Banks: AllStates;
}

export interface IRow {
  original: IBanksDetails;
}

export interface IReduxBaseAction {
  type: BanksActionTypes;
}

export type BanksReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_BanksData_Action
  | IRedux_BanksData_Succeeded_Action
  | IRedux_BanksData_Failed_Action
  | IRedux_UpdateBanksData_Action
  | IRedux_UpdateBanksData_Succeeded_Action
  | IRedux_UpdateBanksData_Failed_Action
  | IRedux_SaveBanksData_Action
  | IRedux_SaveBanksData_Succeeded_Action
  | IRedux_SaveBanksData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_SaveClosed_Action
  | IRedux_BanksDataChanged_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: BanksActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_BanksData_Action extends IReduxBaseAction {
  type: BanksActionTypes.BANKS_DATA;
}
export interface IRedux_BanksData_Succeeded_Action extends IReduxBaseAction {
  type: BanksActionTypes.BANKS_DATA_SUCCEEDED;
  GetBanks: IBanksData;
}

export interface IRedux_BanksData_Failed_Action extends IReduxBaseAction {
  type: BanksActionTypes.BANKS_DATA_FAILED;
  GetBanks: IBanksData;
}

export interface IRedux_UpdateBanksData_Action extends IReduxBaseAction {
  type: BanksActionTypes.UPDATE_BANKS_DATA;
}
export interface IRedux_UpdateBanksData_Succeeded_Action
  extends IReduxBaseAction {
  type: BanksActionTypes.UPDATE_BANKS_SUCCEEDED;
  EditBanks: IBanksData;
}

export interface IRedux_UpdateBanksData_Failed_Action extends IReduxBaseAction {
  type: BanksActionTypes.UPDATE_BANKS_FAILED;
  EditBanks: IBanksData;
}

export interface IRedux_SaveBanksData_Action extends IReduxBaseAction {
  type: BanksActionTypes.SAVE_BANKS_DATA;
}
export interface IRedux_SaveBanksData_Succeeded_Action
  extends IReduxBaseAction {
  type: BanksActionTypes.SAVE_BANKS_SUCCEEDED;
  SaveBanks: IBanksData;
}

export interface IRedux_SaveBanksData_Failed_Action extends IReduxBaseAction {
  type: BanksActionTypes.SAVE_BANKS_FAILED;
  SaveBanks: IBanksData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: BanksActionTypes.EDIT_CLOSED;
}

export interface IRedux_SaveClosed_Action extends IReduxBaseAction {
  type: BanksActionTypes.SAVE_CLOSED;
}

export interface IRedux_BanksDataChanged_Action extends IReduxBaseAction {
  type: BanksActionTypes.BANKS_DATA_CHANGED;
  payload: IBanksData;
}
