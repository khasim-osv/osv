import {
  getRoleManagementData_reducer,
  updateRoleManagementData_reducer,
  getMasterModulesData_reducer,
} from "../RoleManagement.reducer";
import {
  RoleManagementActionTypes,
  RoleManagementDetails,
  initialState,
  IModules,
} from "../RoleManagement.actionTypes";

describe("<RoleManagement /> reducer", () => {
  const mockData: RoleManagementDetails = {
    _id: "1",
    roleName: "CEO",
    modulesCategory: [
      {
        _id: "11",
        categoryName: "Funds transfers",
        modules: [
          {
            _id: "111",
            moduleName: "IMPS transfer",
          },
        ],
      },
    ],
    userProfileId: "13245678",
    isActive: true,
  };

  const modulesCategory: IModules[] = [
    {
      _id: "11",
      categoryName: "Funds transfers",
      modules: [
        {
          _id: "111",
          moduleName: "IMPS transfer",
        },
      ],
    },
  ];

  it("Role management reducer return the initial state", () => {
    expect(
      getRoleManagementData_reducer(undefined, {
        type: RoleManagementActionTypes.GET_INITIAL_STATE,
      })
    ).toEqual(initialState);
  });

  it('Role management reducer handle "ROLEMANAGEMENT_DATA" action', () => {
    expect(
      getRoleManagementData_reducer(initialState, {
        type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Role management reducer handle "ROLEMANAGEMENT_DATA_SUCCEEDED" action', () => {
    expect(
      getRoleManagementData_reducer(initialState, {
        type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_SUCCEEDED,
        getRole: { data: { ...mockData }, loading: false, success: false },
      })
    ).toEqual({
      loading: false,
      data: { ...mockData },
      success: false,
    });
  });

  it('Role management reducer handle "ROLEMANAGEMENT_DATA_FAILED" action', () => {
    const mockData = { loading: false, success: false, data: null };
    expect(
      getRoleManagementData_reducer(initialState, {
        type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_FAILED,
        getRole: mockData,
      })
    ).toEqual({
      ...mockData,
    });
  });

  it('Role management reducer handle "UPDATE_ROLEMANAGEMENT_DATA" action', () => {
    expect(
      updateRoleManagementData_reducer(initialState, {
        type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Role management reducer handle "UPDATE_ROLEMANAGEMENT_SUCCEEDED" action', () => {
    expect(
      updateRoleManagementData_reducer(initialState, {
        type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_SUCCEEDED,
        editRole: { data: { ...mockData }, loading: false, success: true },
      })
    ).toEqual({
      data: { ...mockData },
      loading: false,
      success: true,
    });
  });

  it('Role management reducer handle "UPDATE_ROLEMANAGEMENT_FAILED" action', () => {
    const mockData = { loading: false, success: false, data: null };
    expect(
      updateRoleManagementData_reducer(initialState, {
        type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_FAILED,
        editRole: mockData,
      })
    ).toEqual({
      ...mockData,
    });
  });

  it('Role management reducer handle "EDIT_CLOSED" action', () => {
    expect(
      updateRoleManagementData_reducer(initialState, {
        type: RoleManagementActionTypes.EDIT_CLOSED,
      })
    ).toEqual({
      loading: false,
    });
  });

  it('Role management reducer handle "GET_MASTERMODULES_DATA" action', () => {
    expect(
      getMasterModulesData_reducer(modulesCategory, {
        type: RoleManagementActionTypes.GET_MASTERMODULES_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Role management reducer handle "GET_MASTERMODULES_SUCCEEDED" action', () => {
    expect(
      getMasterModulesData_reducer(modulesCategory, {
        type: RoleManagementActionTypes.GET_MASTERMODULES_SUCCEEDED,
        getMasterModules: {
          data: [...modulesCategory],
          loading: false,
          success: true,
        },
      })
    ).toEqual({
      loading: false,
      data: [...modulesCategory],
      success: true,
    });
  });

  it('Role management reducer handle "GET_MASTERMODULES_FAILED" action', () => {
    const mockData = { success: false, data: [] };
    expect(
      getMasterModulesData_reducer(modulesCategory, {
        type: RoleManagementActionTypes.GET_MASTERMODULES_FAILED,
        getMasterModules: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });
});
