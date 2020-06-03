export enum LicenseActionTypes {
  LICENSES_DATA = "LICENSES_DATA",
  LICENSES_DATA_SUCCEEDED = "LICENSES_DATA_SUCCEEDED",
  LICENSES_DATA_FAILED = "LICENSES_DATA_FAILED",
  UPDATE_LICENSE_DATA = "UPDATE_LICENSE_DATA",
  UPDATE_LICENSE_SUCCEEDED = "UPDATE_LICENSE_SUCCEEDED",
  UPDATE_LICENSE_FAILED = "UPDATE_LICENSE_FAILED",
  EDIT_CLOSED = "EDIT_CLOSED",
  SAVE_LICENSE_DATA = "SAVE_LICENSE_DATA",
  SAVE_LICENSE_SUCCEEDED = "SAVE_LICENSE_SUCCEEDED",
  SAVE_LICENSE_FAILED = "SAVE_LICENSE_FAILED",
  SAVE_CLOSED = "SAVE_CLOSED",
  GET_MODULES = "GET_MODULES",
  GET_MODULES_FAILED = "GET_MODULES_FAILED",
  UPDATE_MODULES = "UPDATE_MODULES",
}
export interface SaveAction {
  type: string;
  saveLicense: LicenseData;
}
export interface LicenseData {
  _id: string;
  modules?: string[] | [Module] | [];
  licenseName: string;
  noOfUsers: string;
  noOfTransactions: string;
}

export interface Licenses {
  data: [License];
}
export class License {
  _id: string = "";
  licenseName: string = "";
  modules_info = [{ _id: "", moduleName: "" }];
  noOfUsers: string = "";
  noOfTransactions: string = "";
  modules: [Module] | [] = [{ _id: "", moduleName: "" }];
}
export interface GetLicenseAction {
  type: string;
  getLicenses: LicenseData;
}
export interface UpdateLicenseAction {
  type: string;
  editLicense: LicenseData;
}

export interface ModulesAction {
  type: string;
  //modules: Modules;
  modules: [Module];
}

export interface LicensesAction {
  type: string;
  //payload: Modules;
  payload: [Module];
}

export interface AllModule {
  categoryName: string;
  modules: Array<Module>;
}

export interface Module {
  _id: string;
  moduleName: string;
}

export interface CreateLicenseStore {
  licenses: {
    saveLicense: LicenseData;
    //modules: Modules;
    modules: {
      loading: boolean;
      modules: [Module];
    };
  };
}

export interface LicensesStore {
  licenses: {
    getLicenses: Licenses;
    editLicense: { success: boolean };
    //modules: Modules;
    modules: {
      loading: boolean;
      modules: [Module];
    };
  };
}

type ActionA = {
  type: string;
  payload: LicenseData;
};

type ActionB = {
  type: string;
};

export type GenericAction = ActionA | ActionB;

export type Dispatch = (action: GenericAction) => void;
