import {
  RoleManagementActionTypes,
  RoleManagementDetails,
  IModules,
} from "../RoleManagement.actionTypes";
import {
  get_rolemanagement_data,
  update_rolemanagement_data,
  edit_closed,
  get_mastermodules_data,
} from "../RoleManagement.action";

describe("User profile <RoleManagement /> action", () => {
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

  const moduleCategory: IModules[] = [
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

  it("Role management action to get data", () => {
    const expectedAction = {
      type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA,
      payload: { id: 12345 },
    };
    expect(get_rolemanagement_data(12345)).toEqual(expectedAction);
  });

  it("Role management action to edit data", () => {
    const expectedAction = {
      type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA,
      payload: mockData,
    };
    expect(update_rolemanagement_data(mockData)).toEqual(expectedAction);
  });

  it("Role management action edit closed", () => {
    const expectedAction = {
      type: RoleManagementActionTypes.EDIT_CLOSED,
    };

    expect(edit_closed()).toEqual(expectedAction);
  });

  it("Get master modules data", () => {
    const expectedAction = {
      type: RoleManagementActionTypes.GET_MASTERMODULES_DATA,
      payload: { userProfileId: mockData.userProfileId },
    };
    expect(get_mastermodules_data(mockData.userProfileId)).toEqual(
      expectedAction
    );
  });
});
