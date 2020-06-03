import {
  getModuleData_reducer,
  updateModuleData_reducer,
  saveModuleData_reducer,
} from "../Modules.reducer";
import {
  ModulesActionTypes,
  getModulesInitialState,
} from "../Modules.actionTypes";

describe("<Modules /> reducer", () => {
  const mockData = {
    success: true,
    data: {
      _id: "5e9d5d031c9d44000060a6da",
      moduleName: "Schedule payment",
      Web: false,
      Mobile: true,
      App: true,
      APIs: false,
      categoryId: "5e9c27636e9fb152343bfe7f",
    },
  };

  it("Modules reducer return the initial state", () => {
    const modulesType = {
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
    const getModulesInitialStateMock = {
      loading: false,
      success: false,
      message: "",
      data: [modulesType],
      operation: "",
    };
    expect(getModuleData_reducer(getModulesInitialState, {})).toEqual(
      getModulesInitialState
    );
  });

  it('Modules reducer handle "MODULES_DATA" action', () => {
    expect(
      getModuleData_reducer({}, { type: ModulesActionTypes.MODULES_DATA })
    ).toEqual({
      loading: true,
    });
  });

  it('Modules reducer handle "MODULES_DATA_SUCCEEDED" action', () => {
    expect(
      getModuleData_reducer(
        {},
        {
          type: ModulesActionTypes.MODULES_DATA_SUCCEEDED,
          getModules: { ...mockData, data: [mockData.data] },
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
      data: [mockData.data],
    });
  });

  it('Modules reducer handle "MODULES_DATA_FAILED" action', () => {
    const mockData = { success: false, data: [] };
    expect(
      getModuleData_reducer(
        {},
        { type: ModulesActionTypes.MODULES_DATA_FAILED, getModules: mockData }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Modules reducer handle "UPDATE_MODULE_DATA" action', () => {
    expect(
      updateModuleData_reducer(
        {},
        { type: ModulesActionTypes.UPDATE_MODULES_DATA }
      )
    ).toEqual({
      loading: true,
    });
  });

  it('Modules reducer handle "UPDATE_MODULE_SUCCEEDED" action', () => {
    expect(
      updateModuleData_reducer(
        {},
        {
          type: ModulesActionTypes.UPDATE_MODULES_SUCCEEDED,
          editModule: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Modules reducer handle "UPDATE_MODULE_FAILED" action', () => {
    const mockData = { success: false, data: {} };
    expect(
      updateModuleData_reducer(
        {},
        { type: ModulesActionTypes.UPDATE_MODULES_FAILED, editModule: mockData }
      )
    ).toEqual({
      loading: false,
    });
  });

  it('Modules reducer handle "SAVE_MODULE_DATA" action', () => {
    expect(
      saveModuleData_reducer({}, { type: ModulesActionTypes.SAVE_MODULES_DATA })
    ).toEqual({
      loading: true,
    });
  });

  it('Modules reducer handle "SAVE_MODULE_SUCCEEDED" action', () => {
    expect(
      saveModuleData_reducer(
        {},
        {
          type: ModulesActionTypes.SAVE_MODULES_SUCCEEDED,
          saveModule: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Modules reducer handle "SAVE_MODULE_FAILED" action', () => {
    //const mockData = { success: false, data: {} };
    expect(
      saveModuleData_reducer(
        {},
        { type: ModulesActionTypes.SAVE_MODULES_FAILED }
      )
    ).toEqual({
      loading: false,
    });
  });
});
