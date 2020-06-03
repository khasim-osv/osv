export enum AllUserProfileActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  ALLUSERPROFILE_DATA = "ALLUSERPROFILE_DATA",
  ALLUSERPROFILE_DATA_SUCCEEDED = "ALLUSERPROFILE_DATA_SUCCEEDED",
  ALLUSERPROFILE_DATA_FAILED = "ALLUSERPROFILE_DATA_FAILED",
  UPDATE_USERPROFILE_DATA = "UPDATE_USERPROFILE_DATA",
  UPDATE_USERPROFILE_SUCCEEDED = "UPDATE_USERPROFILE_SUCCEEDED",
  UPDATE_USERPROFILE_FAILED = "UPDATE_USERPROFILE_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  ALLUSERPROFILE_DATA_CHANGED = "ALLUSERPROFILE_DATA_CHANGED",
  GET_LICENCES_DATA = "GET_LICENCES_DATA",
  GET_LICENCES_SUCCEEDED = "GET_LICENCES_SUCCEEDED",
  GET_LICENCES_FAILED = "GET_LICENCES_FAILED",
}

export interface AllUserProfileData {
  loading: boolean;
  success: boolean;
  totalRecords?: number;
  message?: string;
  data: AllUserProfileDetails | AllUserProfileDetails[];
  operation?: string;
}

export const allUserProfileType = {
  _id: "",
  company: {
    english: "",
    arabic: "",
  },
  noOfUsers: 0,
  email: "",
  phone: "",
  userId: "",
  isActive: false,
  success: false,
};

export const initialState: AllUserProfileData = {
  loading: false,
  success: false,
  message: "",
  data: allUserProfileType,
  operation: "",
};

export const getAllUserProfileInitialState: AllUserProfileData = {
  loading: false,
  success: false,
  message: "",
  data: [allUserProfileType],
  operation: "",
};

export const getLicencesState: GetLicencesData = {
  loading: false,
  success: false,
  data: [{ _id: "", licenseName: "" }],
};

export interface columns {
  Header: string;
  accessor: string;
}

export interface IState {
  selectedRow: IRow;
  pageSize: number;
  initialPageSize: number;
  searchResults?: string | undefined;
}

export interface ICompanyValue {
  english: string;
  arabic: string;
}

export interface AllUserProfileDetails {
  _id?: string;
  company: ICompanyValue;
  noOfUsers: number;
  userId: string;
  email: string;
  phone: string;
  isActive: boolean;
  success?: boolean;
}

export interface GetLicencesData {
  loading: boolean;
  success: boolean;
  data: ILicences[];
}

export interface ILicences {
  _id: string;
  licenseName: string;
}

export interface AllStates {
  GetAllUserProfile: AllUserProfileData;
  EditUserProfile: AllUserProfileData;
  getLicences: GetLicencesData;
}
export interface IReduxAllUserProfileState {
  userProfile: AllStates;
}

export interface IRow {
  original: AllUserProfileDetails;
}

export interface IReduxBaseAction {
  type: AllUserProfileActionTypes;
}

export type AllUserProfileReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_UserProfileData_Action
  | IRedux_UserProfileData_Succeeded_Action
  | IRedux_UserProfileData_Failed_Action
  | IRedux_UpdateUserProfileData_Action
  | IRedux_UpdateUserProfileData_Succeeded_Action
  | IRedux_UpdateUserProfileData_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_UserProfileDataChanged_Action
  | IRedux_GetLicences_Action
  | IRedux_GetLicences_Succeeded_Action
  | IRedux_GetLicences_Failed_Action;

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_UserProfileData_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA;
}
export interface IRedux_UserProfileData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA_SUCCEEDED;
  GetAllUserProfile: AllUserProfileData;
}

export interface IRedux_UserProfileData_Failed_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA_FAILED;
  GetAllUserProfile: AllUserProfileData;
}

export interface IRedux_UpdateUserProfileData_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.UPDATE_USERPROFILE_DATA;
}
export interface IRedux_UpdateUserProfileData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllUserProfileActionTypes.UPDATE_USERPROFILE_SUCCEEDED;
  EditUserProfile: AllUserProfileData;
}

export interface IRedux_UpdateUserProfileData_Failed_Action
  extends IReduxBaseAction {
  type: AllUserProfileActionTypes.UPDATE_USERPROFILE_FAILED;
  EditUserProfile: AllUserProfileData;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.EDIT_CLOSED;
}

export interface IRedux_UserProfileDataChanged_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA_CHANGED;
  payload: AllUserProfileData;
}

export interface IRedux_GetLicences_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.GET_LICENCES_DATA;
}
export interface IRedux_GetLicences_Succeeded_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.GET_LICENCES_SUCCEEDED;
  getLicences: GetLicencesData;
}

export interface IRedux_GetLicences_Failed_Action extends IReduxBaseAction {
  type: AllUserProfileActionTypes.GET_LICENCES_FAILED;
  getLicences: GetLicencesData;
}
