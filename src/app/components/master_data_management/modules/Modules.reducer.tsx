import {
  ModulesActionTypes,
  ModulesReducerActions,
  IModulesData,
  IModulesDetails,
  initialState,
  getModulesInitialState,
  GetCategoriesAction,
} from "./Modules.actionTypes";
import { GroupsReducerActions } from "../groups/Groups.actionTypes";

export const getModuleData_reducer = (
  state: IModulesData = getModulesInitialState,
  action: ModulesReducerActions
) => {
  switch (action.type) {
    case ModulesActionTypes.MODULES_DATA:
      return {
        loading: true,
      };
    case ModulesActionTypes.MODULES_DATA_SUCCEEDED:
      return {
        loading: false,
        ...action.getModules,
      };

    case ModulesActionTypes.MODULES_DATA_FAILED: {
      return {
        loading: false,
        ...action.getModules,
      };
    }
    case ModulesActionTypes.MODULES_DATA_CHANGED: {
      const newState = { ...state };
      let newData: IModulesDetails[] = [];
      Array.isArray(newState.data) &&
        newState.data.forEach((item: IModulesDetails) => {
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

export const saveModuleData_reducer = (
  state: object = {},
  action: ModulesReducerActions
) => {
  switch (action.type) {
    case ModulesActionTypes.SAVE_MODULES_DATA:
      return {
        loading: true,
      };
    case ModulesActionTypes.SAVE_MODULES_SUCCEEDED: {
      return {
        loading: false,
        ...action.saveModule,
      };
    }
    case ModulesActionTypes.SAVE_MODULES_FAILED: {
      return {
        loading: false,
      };
    }
    case ModulesActionTypes.SAVE_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const updateModuleData_reducer = (
  state: object = {},
  action: ModulesReducerActions
) => {
  switch (action.type) {
    case ModulesActionTypes.UPDATE_MODULES_DATA:
      return {
        loading: true,
      };
    case ModulesActionTypes.UPDATE_MODULES_SUCCEEDED: {
      return {
        loading: false,
        ...action.editModule,
      };
    }
    case ModulesActionTypes.UPDATE_MODULES_FAILED: {
      return {
        loading: false,
      };
    }
    case ModulesActionTypes.EDIT_CLOSED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const getCategories_reducer = (
  state: object = {},
  action: GetCategoriesAction
) => {
  switch (action.type) {
    case ModulesActionTypes.GET_CATEGORIES:
      return {
        loading: true,
      };
    case ModulesActionTypes.UPDATE_CATEGORIES:
      return {
        loading: false,
        ...action.categories,
      };
    default:
      return state;
  }
};
