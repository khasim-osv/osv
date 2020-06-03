import { string } from "yup";

export enum GroupsActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  GROUPS_DATA = "GROUPS_DATA",
  GROUPS_DATA_SUCCEEDED = "GROUPS_DATA_SUCCEEDED",
  GROUPS_DATA_FAILED = "GROUPS_DATA_FAILED",
  UPDATE_GROUPS_DATA = "UPDATE_GROUPS_DATA",
  UPDATE_GROUPS_SUCCEEDED = "UPDATE_GROUPS_SUCCEEDED",
  UPDATE_GROUPS_FAILED = "UPDATE_GROUPS_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  SAVE_CLOSED = "SAVE_CLOSED",

  SAVE_GROUPS_DATA = "SAVE_GROUPS_DATA",
  GROUPS_DATA_CHANGED = "GROUPS_DATA_CHANGED",
  SAVE_GROUPS_SUCCEEDED = "SAVE_GROUPS_SUCCEEDED",
  SAVE_GROUPS_FAILED = "SAVE_GROUPS_FAILED",
}

export interface ISearchKey {
  search: string;
}

export interface IGroupsData {
  loading: boolean;
  success: boolean;
  totalRecords?: number;
  message?: string;
  data: IGroupsDetails | IGroupsDetails[];
  operation?: string;
}

export const groupsType = {
  _id: "",
  value: {
    arabic: "",
    english: "",
  },
  english: "",
  arabic: "",
  isActive: true,
  success: false,
};

export const initialState: IGroupsData = {
  loading: false,

  success: false,
  message: "",
  data: groupsType,
  operation: "",
};

export const getGroupsInitialState: IGroupsData = {
  loading: false,
  success: false,
  message: "",
  data: [groupsType],
  operation: "",
};

export interface columns {
  Header: string;
  accessor: string;
}

export interface IState {
  IsEditOpen: boolean;
  selectedRow: IRow;
  pageSize: number;
  initialPageSize: number;
  searchResults?: string | undefined;
}

export interface IGroupsDetails {
  _id?: string;
  value: IGroupsValue;
  english: string;
  arabic: string;
  isActive: boolean;
  success?: boolean;
}

export interface AllStates {
  GetGroups: IGroupsData;
  EditGroups: IGroupsData;
  SaveGroups: IGroupsData;
}

export interface IReduxGroupsState {
  Groups: AllStates;
}

export interface IRow {
  original: IGroupsDetails;
}

export interface IGroupsValue {
  english: string;
  arabic: string;
}
export interface IReduxBaseAction {
  type: GroupsActionTypes;
}

export type GroupsReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_GroupsData_Action
  | IRedux_GroupsData_Succeeded_Action
  | IRedux_GroupsData_Failed_Action
  | IRedux_UpdateGroupsData_Action
  | IRedux_UpdateGroupsData_Succeeded_Action
  | IRedux_UpdateGroupsData_Failed_Action
  | IRedux_SaveGroupsData_Action
  | IRedux_SaveGroupsData_Succeeded_Action
  | IRedux_SaveGroupsData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_SaveClosed_Action
  | IRedux_GroupsDataChanged_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: GroupsActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_GroupsData_Action extends IReduxBaseAction {
  type: GroupsActionTypes.GROUPS_DATA;
}
export interface IRedux_GroupsData_Succeeded_Action extends IReduxBaseAction {
  type: GroupsActionTypes.GROUPS_DATA_SUCCEEDED;
  GetGroups: IGroupsData;
}

export interface IRedux_GroupsData_Failed_Action extends IReduxBaseAction {
  type: GroupsActionTypes.GROUPS_DATA_FAILED;
  GetGroups: IGroupsData;
}

export interface IRedux_UpdateGroupsData_Action extends IReduxBaseAction {
  type: GroupsActionTypes.UPDATE_GROUPS_DATA;
}
export interface IRedux_UpdateGroupsData_Succeeded_Action
  extends IReduxBaseAction {
  type: GroupsActionTypes.UPDATE_GROUPS_SUCCEEDED;
  EditGroups: IGroupsData;
}

export interface IRedux_UpdateGroupsData_Failed_Action
  extends IReduxBaseAction {
  type: GroupsActionTypes.UPDATE_GROUPS_FAILED;
  EditGroups: IGroupsData;
}

export interface IRedux_SaveGroupsData_Action extends IReduxBaseAction {
  type: GroupsActionTypes.SAVE_GROUPS_DATA;
}
export interface IRedux_SaveGroupsData_Succeeded_Action
  extends IReduxBaseAction {
  type: GroupsActionTypes.SAVE_GROUPS_SUCCEEDED;
  SaveGroups: IGroupsData;
}

export interface IRedux_SaveGroupsData_Failed_Action extends IReduxBaseAction {
  type: GroupsActionTypes.SAVE_GROUPS_FAILED;
  SaveGroups: IGroupsData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: GroupsActionTypes.EDIT_CLOSED;
}

export interface IRedux_SaveClosed_Action extends IReduxBaseAction {
  type: GroupsActionTypes.SAVE_CLOSED;
}

export interface IRedux_GroupsDataChanged_Action extends IReduxBaseAction {
  type: GroupsActionTypes.GROUPS_DATA_CHANGED;
  payload: IGroupsData;
}
