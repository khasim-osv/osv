import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  UserManagementDetails,
  UserManagementData,
  IRolesMasterData,
  IModulesCategory,
  ISubModules,
  IProfileUsersData,
  IProfileUsers,
  userManagementType,
  IModCategory,
  IToolTipUser,
} from "./UserManagement.actionTypes";
import {
  IMasterModules,
  IModules,
  Modules,
} from "../role_management/RoleManagement.actionTypes";
import { yupSchema } from "../../../utils/Yup.validation";
import {
  PrimaryButton,
  SecondaryButton,
  Styledlabel,
} from "../../../common/styled-components";
import "./UserManagement.scss";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { Tooltip } from "../../../common/tooltip/tooltip.component";
import history from "../../../history";
import Popup from "reactjs-popup";

const _find = require("lodash.find");
const _findIndex = require("lodash.findindex");
const _filter = require("lodash.filter");

export interface IProps {
  getUser: (id: string) => void;
  getUserData: UserManagementData;
  getEditData: UserManagementData;
  saveUser: (data: UserManagementDetails) => void;
  editSuccess: () => void;
  getRoleMaster: (userProfileId: string) => void;
  getRolesMaster: IRolesMasterData;
  getMasterModules: (userProfileId: string, roleId: string) => void;
  getModulesMasterData: IMasterModules;
  getAllProfileUsersData: IProfileUsersData;
  getAllProfileUsers: (profileId: string) => void;
  match?: any;
}

export interface IState {
  view: any;
  isOpen: boolean;
  modulesCategory: IModulesCategory[];
  values: UserManagementDetails;
}

const UserManagement = (props: IProps) => {
  useEffect(() => {
    if (props.match.params.id) {
      props.getUser(props.match.params.id);
    }
    if (props.match.params.userProfileId) {
      props.getRoleMaster(props.match.params.userProfileId);
      props.getAllProfileUsers(props.match.params.userProfileId);
    }
  }, []);

  useEffect(() => {
    props.getUserData.data &&
      props.getUserData.data.roleId &&
      props.getMasterModules(
        props.match.params.userProfileId,
        props.getUserData.data.roleId
      );
  }, [props.getUserData.data]);

  const [state, setState] = useState({
    view: {
      view0: true,
    },
    isOpen: false,
    modulesCategory: [],
    values: userManagementType,
  } as IState);

  if (props.getEditData && props.getEditData.success) {
    props.editSuccess();
    toast.success(
      !Array.isArray(props.getEditData.data) &&
        '"' +
          props.getEditData.data.name +
          '"' +
          " user has been " +
          (props.getUserData.data._id === "" ? "created" : "updated")
    );
    history.push(`/userprofiles/addUser/${props.match.params.userProfileId}`);
  }

  const currencyCodes = [
    { value: "SAR", label: "SAR" },
    { value: "INR", label: "INR" },
    { value: "USD", label: "USD" },
  ];

  let rolesMaster: any = [];
  if (props.getRolesMaster.success) {
    rolesMaster = props.getRolesMaster.data.map((item) => {
      return { label: item.roleName, value: item._id };
    });
  }

  const countryCodes = [
    {
      value: "+966",
      label: (
        <div>
          <img
            src={require("../../../assets/images/countryFlags/saudi.png")}
            alt="saudi"
          />{" "}
          +966
        </div>
      ),
    },
    {
      value: "+971",
      label: (
        <div>
          <img
            src={require("../../../assets/images/countryFlags/uae.png")}
            alt="uae"
          />{" "}
          +971
        </div>
      ),
    },
  ];

  const isChecked = (
    values: UserManagementDetails,
    category: IModules,
    approval: string,
    module: Modules
  ) => {
    let isModuleExist = false;
    values &&
      values.modulesCategory.forEach((item: IModulesCategory) => {
        //values category
        if (item.categoryId === category._id) {
          item.modules.forEach((obj: ISubModules) => {
            //values modules
            if (!isModuleExist)
              isModuleExist =
                obj.moduleId === module._id && obj.workflow === approval;
          });
        }
      });
    return isModuleExist;
  };

  const groupChecked = (
    values: UserManagementDetails,
    category: IModules,
    approval: string
  ) => {
    let selectAllCount: number = 0,
      notInRoleCount: number = 0;
    values &&
      values.modulesCategory.forEach((item: IModulesCategory) => {
        //values category
        if (item.categoryId === category._id) {
          item.modules.forEach((obj: ISubModules) => {
            //values modules
            if (obj.workflow === approval) selectAllCount += 1;
            if (
              approval !== "initiator" &&
              !isRoleModule(category, approval, obj.moduleId)
            )
              notInRoleCount += 1;
          });
        }
      });
    return (
      category.modules &&
      selectAllCount > 0 &&
      selectAllCount === category.modules.length - notInRoleCount
    );
  };

  const groupChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: UserManagementDetails,
    category: IModules
  ) => {
    let data: IModulesCategory[] = [];
    if (!e.target.checked) {
      data =
        values &&
        values.modulesCategory.filter((modules: IModulesCategory) => {
          if (modules.categoryId === category._id) {
            return modules.modules.filter((item: ISubModules) => {
              //const index = item.workflow === e.target.value;
              if (item.workflow === e.target.value) item.workflow = "";
              return item.workflow !== "";
            });
          } else {
            return modules;
          }
        });
    } else {
      const index = _findIndex(values.modulesCategory, {
        categoryId: category._id,
      });
      let tempModules: ISubModules[] = [];
      index > -1
        ? values &&
          values.modulesCategory.forEach((modules: IModulesCategory) => {
            if (modules.categoryId === category._id) {
              let dat: ISubModules[] = [];
              modules.modules.forEach((item: ISubModules) => {
                //return (
                category.modules &&
                  category.modules.forEach((obj2: Modules) => {
                    if (obj2._id === item.moduleId)
                      item.workflow = e.target.value;
                    obj2._id !== item.moduleId &&
                      isRoleModule(category, e.target.value, item.moduleId) &&
                      !_find(modules.modules, { moduleId: obj2._id }) &&
                      !_find(dat, { moduleId: obj2._id }) &&
                      dat.push({
                        moduleId: obj2._id,
                        workflow: e.target.value,
                      });
                    e.target.value !== "initiator" &&
                      isRoleModule(category, e.target.value, item.moduleId) &&
                      !_find(tempModules, { moduleId: item.moduleId }) &&
                      tempModules.push(item);
                    e.target.value === "initiator" &&
                      !_find(tempModules, { moduleId: item.moduleId }) &&
                      tempModules.push(item);
                  });
                //);
              });
              modules.modules = [...tempModules, ...dat];
              data.push(modules);
            } else {
              data.push(modules);
            }
          })
        : (data = [...data, ...createNewCategory(values, category, e)]);
    }
    let dat: IModulesCategory[] = [];
    data.forEach((modules: IModulesCategory) => {
      let moduledata: ISubModules[] = [];
      modules.modules.forEach((item: ISubModules) => {
        item.workflow !== "" && moduledata.push(item);
      });
      moduledata.length > 0 &&
        dat.push({ categoryId: modules.categoryId, modules: moduledata });
    });
    return dat;
  };

  const createNewCategory = (
    values: UserManagementDetails,
    category: IModules,
    e: React.ChangeEvent<HTMLInputElement>,
    mod?: Modules
  ) => {
    const index = _findIndex(values.modulesCategory, {
      categoryId: "",
    });
    if (index > -1) values.modulesCategory.splice(index, 1);
    let data = [...values.modulesCategory];
    const modules: ISubModules[] = [];
    category.modules &&
      category.modules.forEach((item: Modules) => {
        mod &&
          mod._id === item._id &&
          modules.push({ moduleId: item._id, workflow: e.target.value });
        !mod && modules.push({ moduleId: item._id, workflow: e.target.value });
      });
    data.push({ categoryId: category._id, modules: modules });
    return data;
  };

  const change = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: UserManagementDetails,
    category: IModules,
    mod: Modules
  ) => {
    let data: IModulesCategory[] = [];
    if (!e.target.checked) {
      data =
        values &&
        values.modulesCategory.filter((modules: IModulesCategory) => {
          if (modules.categoryId === category._id) {
            return modules.modules.filter((module: ISubModules) => {
              if (mod._id === module.moduleId) module.workflow = "";
              return module.workflow !== "";
            });
          } else {
            return modules;
          }
        });
    } else {
      const index = _findIndex(values.modulesCategory, {
        categoryId: category._id,
      });
      data =
        index > -1
          ? values &&
            values.modulesCategory.filter((modules: IModulesCategory) => {
              if (modules.categoryId === category._id) {
                const isExist = !_find(modules.modules, { moduleId: mod._id });
                if (isExist) {
                  return (modules.modules = [
                    ...modules.modules,
                    ...[{ moduleId: mod._id, workflow: e.target.value }],
                  ]);
                } else {
                  return modules.modules.filter((module: ISubModules) => {
                    if (mod._id === module.moduleId)
                      module.workflow = e.target.value;
                    return module;
                  });
                }
              } else {
                return modules;
              }
            })
          : createNewCategory(values, category, e, mod);
    }
    let dat: IModulesCategory[] = [];
    data.forEach((modules: IModulesCategory) => {
      let moduledata: ISubModules[] = [];
      modules.modules.forEach((item: ISubModules) => {
        item.workflow !== "" && moduledata.push(item);
      });
      moduledata.length > 0 &&
        dat.push({ categoryId: modules.categoryId, modules: moduledata });
    });
    return dat;
  };

  const isRoleModule = (
    category: IModules,
    approval: string,
    moduleId?: string
  ) => {
    const obj = moduleId
      ? { _id: moduleId, workflow: [approval] }
      : { workflow: [approval] };
    return _filter(category.modules, obj).length > 0;
  };

  const getToolTip = (
    category: IModules,
    approval: string,
    module: Modules,
    toolTip?: boolean
  ) => {
    let data: IToolTipUser[] = [];
    props.getAllProfileUsersData.data &&
      props.getAllProfileUsersData.data.forEach((profile: IProfileUsers) => {
        props.match.params.id !== profile._id &&
          profile.modulesCategory.forEach((cat: IModulesCategory) => {
            if (category._id === cat.categoryId) {
              cat.modules.forEach((mod: ISubModules) => {
                if (mod.moduleId === module._id && mod.workflow === approval) {
                  data.push({ user: profile.name, id: profile._id });
                }
              });
            }
          });
      });
    if (toolTip) return data.length;
    return (
      !toolTip &&
      data.length >= 1 && (
        <Tooltip
          title={data.length.toString()}
          header="Assigned users"
          content={data.map((item: IToolTipUser) => {
            return <div key={item.id}>{item.user}</div>;
          })}
        />
      )
    );
  };

  const getConfirmApproval = (modulesCategory: IModulesCategory[]) => {
    let data: IModulesCategory[] = [];
    modulesCategory.forEach((mod: IModulesCategory) => {
      let newModules: ISubModules[] = [];
      mod.modules.forEach((module: ISubModules) => {
        props.getModulesMasterData.data.forEach((mod2: IModules) => {
          mod2.modules &&
            mod2.modules.forEach((module2: Modules) => {
              if (
                mod.categoryId === mod2._id &&
                module.moduleId === module2._id &&
                (module.workflow === "approver" ||
                  module.workflow === "executor")
              ) {
                module.moduleName = module2.moduleName;
                mod.categoryName = mod2.categoryName;
                const len = getToolTip(
                  {
                    _id: mod.categoryId,
                    modules: mod.modules.map((item: ISubModules) => {
                      return { _id: item.moduleId, workflow: [item.workflow] };
                    }),
                  },
                  module.workflow,
                  { _id: module.moduleId, workflow: [module.workflow] },
                  true
                );
                len >= 1 && newModules.push(module);
              }
            });
        });
      });
      if (newModules.length > 0) {
        data.push({ ...mod, modules: newModules });
      }
    });
    return data;
  };

  const noConfirmApproval = (values: UserManagementDetails) => {
    values.modulesCategory.forEach((cat: IModulesCategory) => {
      cat.modules.forEach((mod: ISubModules) => {
        delete mod.approval;
      });
    });
    props.saveUser(values);
  };

  const onCheckedApproval = (
    module: ISubModules,
    modulesCategory: IModulesCategory[],
    index: number,
    index2: number,
    approval: string
  ) => {
    if (modulesCategory[index].modules[index2].approval === approval)
      return true;
    return (
      !modulesCategory[index].modules[index2].approval &&
      module.approval === approval
    );
  };

  return (
    <div className="isFlex outline">
      <div className="modal">
        <div className="editTitle">Create new user</div>
        <p>Manage user and add admins, accountants and other users.</p>
        <hr />
        <Formik
          enableReinitialize={true}
          initialValues={props.getUserData.data}
          validationSchema={yupSchema.userManagementForm}
          onSubmit={(values: UserManagementDetails, { setSubmitting }) => {
            values.userProfileId = props.match.params.userProfileId
              ? props.match.params.userProfileId
              : "";
            const modulesCategory: IModulesCategory[] = getConfirmApproval(
              values.modulesCategory
            );
            modulesCategory.length > 0
              ? setState({
                  ...state,
                  isOpen: !state.isOpen,
                  modulesCategory: modulesCategory,
                  values: values,
                })
              : noConfirmApproval(values);
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="formControl">
                <Styledlabel htmlFor="name">Name</Styledlabel>
                <Field name="name" type="text" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="email">Email ID</Styledlabel>
                <Field name="email" type="text" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="mobile">Mobile number</Styledlabel>
                <div className="flex">
                  <div>
                    <Select
                      className="reactSelect"
                      options={countryCodes}
                      value={
                        values
                          ? {
                              label: countryCodes.map((item: any) => {
                                return (
                                  values.countryCode === item.value &&
                                  item.label
                                );
                              }),
                              value: values.countryCode,
                            }
                          : { label: "", value: "" }
                      }
                      name="countryCode"
                      onChange={(selectedOption: any) => {
                        setFieldValue("countryCode", selectedOption.value);
                      }}
                    />
                    <div className="errorMessage">
                      <ErrorMessage name="countryCode" />
                    </div>
                  </div>
                  <div>
                    <Field name="mobile" type="text" autoComplete="off" />
                    <div className="errorMessage">
                      <ErrorMessage name="mobile" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="roleId">Role</Styledlabel>
                <Select
                  className="reactSelect"
                  options={rolesMaster}
                  value={
                    values && {
                      label: rolesMaster.map((item: any) => {
                        return values.roleId === item.value && item.label;
                      }),
                      value: values.roleId,
                    }
                  }
                  name="roleId"
                  onChange={(selectedOption: any) => {
                    props.getMasterModules(
                      props.match.params.userProfileId,
                      selectedOption.value
                    );
                    setFieldValue("roleId", selectedOption.value);
                  }}
                />
                <div className="errorMessage">
                  <ErrorMessage name="roleId" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="nationalId">National ID</Styledlabel>
                <Field name="nationalId" type="text" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="nationalId" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="fundTransferLimit.currency">
                  Fund transfer limit
                </Styledlabel>
                <div className="flex">
                  <div>
                    <Select
                      className="reactSelect"
                      options={currencyCodes}
                      value={
                        values &&
                        values.fundTransferLimit && {
                          label: values.fundTransferLimit.currency,
                          value: values.fundTransferLimit.currency,
                        }
                      }
                      name="fundTransferLimit.currency"
                      onChange={(selectedOption: any) => {
                        setFieldValue(
                          "fundTransferLimit.currency",
                          selectedOption.value
                        );
                      }}
                    />
                    <div className="errorMessage">
                      <ErrorMessage name="fundTransferLimit.currency" />
                    </div>
                  </div>
                  <div>
                    <Field
                      name="fundTransferLimit.amount"
                      type="text"
                      autoComplete="off"
                    />
                    <div className="errorMessage">
                      <ErrorMessage name="fundTransferLimit.amount" />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="approvalTable">
                <div>
                  <div>Approval workflow</div>
                  <div>INITIATOR</div>
                  <div>REVIEWER</div>
                  <div>APPROVER</div>
                  <div>EXECUTOR</div>
                </div>
                <hr />
                {values &&
                  values.roleId &&
                  props.getModulesMasterData.data &&
                  props.getModulesMasterData.data.map(
                    (category: IModules, index: number) => {
                      return (
                        <div key={category._id} style={{ display: "block" }}>
                          <div className="flex">
                            <div style={{ fontWeight: "bold" }}>
                              {category.categoryName}
                              <span
                                className="viewAll"
                                onClick={() =>
                                  setState({
                                    ...state,
                                    view: {
                                      ...state.view,
                                      ["view" + index]: !state.view[
                                        "view" + index
                                      ],
                                    },
                                  })
                                }
                              >
                                {" "}
                                View{" "}
                                {!state.view["view" + index] ? "more" : "less"}
                              </span>
                            </div>

                            <div style={{ fontWeight: "bold" }}>
                              <input
                                className="categoryCheckox"
                                type="radio"
                                name={category.categoryName}
                                value="initiator"
                                checked={groupChecked(
                                  values,
                                  category,
                                  "initiator"
                                )}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const data = groupChange(e, values, category);
                                  setFieldValue("modulesCategory", data);
                                }}
                              />
                              L0
                            </div>
                            {isRoleModule(category, "reviewer") ? (
                              <div style={{ fontWeight: "bold" }}>
                                <input
                                  className="categoryCheckox"
                                  type="radio"
                                  name={category.categoryName}
                                  value="reviewer"
                                  checked={groupChecked(
                                    values,
                                    category,
                                    "reviewer"
                                  )}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const data = groupChange(
                                      e,
                                      values,
                                      category
                                    );
                                    setFieldValue("modulesCategory", data);
                                  }}
                                />
                                L1
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {isRoleModule(category, "approver") ? (
                              <div style={{ fontWeight: "bold" }}>
                                <input
                                  className="categoryCheckox"
                                  type="radio"
                                  name={category.categoryName}
                                  value="approver"
                                  checked={groupChecked(
                                    values,
                                    category,
                                    "approver"
                                  )}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const data = groupChange(
                                      e,
                                      values,
                                      category
                                    );
                                    setFieldValue("modulesCategory", data);
                                  }}
                                />
                                L2
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {isRoleModule(category, "executor") ? (
                              <div style={{ fontWeight: "bold" }}>
                                <input
                                  className="categoryCheckox"
                                  type="radio"
                                  name={category.categoryName}
                                  value="executor"
                                  checked={groupChecked(
                                    values,
                                    category,
                                    "executor"
                                  )}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const data = groupChange(
                                      e,
                                      values,
                                      category
                                    );
                                    setFieldValue("modulesCategory", data);
                                  }}
                                />
                                L3
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                          {category.modules &&
                            category.modules.map((module: Modules) => {
                              return (
                                state.view["view" + index] && (
                                  <div className="flex" key={module._id}>
                                    <div>{module.moduleName}</div>

                                    <div>
                                      <input
                                        type="radio"
                                        name={module.moduleName}
                                        value="initiator"
                                        checked={
                                          values &&
                                          isChecked(
                                            values,
                                            category,
                                            "initiator",
                                            module
                                          )
                                        }
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          const data = change(
                                            e,
                                            values,
                                            category,
                                            module
                                          );
                                          setFieldValue(
                                            "modulesCategory",
                                            data
                                          );
                                        }}
                                      />
                                      L0
                                    </div>
                                    {isRoleModule(
                                      category,
                                      "reviewer",
                                      module._id
                                    ) ? (
                                      <div>
                                        <input
                                          type="radio"
                                          name={module.moduleName}
                                          value="reviewer"
                                          checked={
                                            values &&
                                            isChecked(
                                              values,
                                              category,
                                              "reviewer",
                                              module
                                            )
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >
                                          ) => {
                                            const data = change(
                                              e,
                                              values,
                                              category,
                                              module
                                            );
                                            setFieldValue(
                                              "modulesCategory",
                                              data
                                            );
                                          }}
                                        />
                                        L1
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                    {isRoleModule(
                                      category,
                                      "approver",
                                      module._id
                                    ) ? (
                                      <div>
                                        <input
                                          type="radio"
                                          name={module.moduleName}
                                          value="approver"
                                          checked={
                                            values &&
                                            isChecked(
                                              values,
                                              category,
                                              "approver",
                                              module
                                            )
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >
                                          ) => {
                                            const data = change(
                                              e,
                                              values,
                                              category,
                                              module
                                            );
                                            setFieldValue(
                                              "modulesCategory",
                                              data
                                            );
                                          }}
                                        />
                                        L2
                                        {values &&
                                          isChecked(
                                            values,
                                            category,
                                            "approver",
                                            module
                                          ) &&
                                          getToolTip(
                                            category,
                                            "approver",
                                            module
                                          )}
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                    {isRoleModule(
                                      category,
                                      "executor",
                                      module._id
                                    ) ? (
                                      <div>
                                        <input
                                          type="radio"
                                          name={module.moduleName}
                                          value="executor"
                                          checked={
                                            values &&
                                            isChecked(
                                              values,
                                              category,
                                              "executor",
                                              module
                                            )
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >
                                          ) => {
                                            const data = change(
                                              e,
                                              values,
                                              category,
                                              module
                                            );
                                            setFieldValue(
                                              "modulesCategory",
                                              data
                                            );
                                          }}
                                        />
                                        L3
                                        {values &&
                                          isChecked(
                                            values,
                                            category,
                                            "executor",
                                            module
                                          ) &&
                                          getToolTip(
                                            category,
                                            "executor",
                                            module
                                          )}
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                )
                              );
                            })}
                        </div>
                      );
                    }
                  )}
              </div>
              <div className="flexProps">
                <div
                  className="addMoreUserLink"
                  onClick={() =>
                    history.push(
                      `/userprofiles/usermanagement/${props.match.params.userProfileId}`
                    )
                  }
                >
                  +Add one more user
                </div>
                <SecondaryButton
                  type="submit"
                  onClick={(e: any) => {
                    e.preventDefault();
                    !props.match.params.id &&
                      setFieldValue("modulesCategory", []);
                    props.match.params.id &&
                      history.push(
                        `/userprofiles/addUser/${props.match.params.userProfileId}`
                      );
                  }}
                >
                  {props.match.params.id ? "CANCEL" : "CLEAR"}
                </SecondaryButton>
                <PrimaryButton type="submit">
                  {props.match.params.id ? "UPDATE" : "SAVE"}
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer
        className="toastContainer"
        toastClassName="toastBody"
        hideProgressBar={true}
      />
      <Popup
        open={state.isOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <div className="modal">
          <div
            className="icon-Close-outline-button close"
            onClick={() => {
              let newState = state;
              delete newState.values;
              delete newState.modulesCategory;
              setState({ ...newState, isOpen: !state.isOpen });
            }}
          ></div>
          <div className="editTitle">Confirm approvals</div>
          <p>
            Below categories have assigned multi user. Please define approval
            flow
          </p>
          <Formik
            initialValues={{ modulesCategory: state.modulesCategory }}
            onSubmit={(values: IModCategory, { setSubmitting }) => {
              let data: UserManagementDetails = { ...state.values };
              data.modulesCategory.forEach((category: IModulesCategory) => {
                category.modules.forEach((module: ISubModules) => {
                  values.modulesCategory.forEach((cat: IModulesCategory) => {
                    cat.categoryId === category.categoryId &&
                      cat.modules.forEach((mod: ISubModules) => {
                        if (mod.moduleId === module.moduleId && mod.approval)
                          module.approval = mod.approval;
                      });
                  });
                });
              });
              props.saveUser(data);
              setSubmitting(true);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="formMargin">
                <div className="formControl">
                  {state.modulesCategory &&
                    state.modulesCategory.map(
                      (modules: IModulesCategory, index: number) => {
                        return (
                          <div key={modules.categoryId}>
                            <div
                              style={{ display: "block", fontWeight: "bold" }}
                            >
                              {modules.categoryName}
                            </div>
                            <div>
                              {modules.modules.map(
                                (module: ISubModules, index2: number) => {
                                  return (
                                    <div key={module.moduleId} className="flex">
                                      <div>
                                        {module.moduleName +
                                          "(" +
                                          module.workflow
                                            .charAt(0)
                                            .toUpperCase() +
                                          module.workflow.slice(1) +
                                          ")"}
                                      </div>
                                      <div>
                                        <input
                                          className="categoryCheckox"
                                          type="radio"
                                          name={module.moduleName}
                                          value="All"
                                          checked={onCheckedApproval(
                                            module,
                                            values.modulesCategory,
                                            index,
                                            index2,
                                            "All"
                                          )}
                                          onChange={() => {
                                            setFieldValue(
                                              "modulesCategory[" +
                                                index +
                                                "].modules[" +
                                                index2 +
                                                "].approval",
                                              "All"
                                            );
                                          }}
                                        />{" "}
                                        All
                                      </div>
                                      <div>
                                        <input
                                          className="categoryCheckox"
                                          type="radio"
                                          name={module.moduleName}
                                          value="Any"
                                          checked={onCheckedApproval(
                                            module,
                                            values.modulesCategory,
                                            index,
                                            index2,
                                            "Any"
                                          )}
                                          onChange={() => {
                                            setFieldValue(
                                              "modulesCategory[" +
                                                index +
                                                "].modules[" +
                                                index2 +
                                                "].approval",
                                              "Any"
                                            );
                                          }}
                                        />{" "}
                                        Any
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
                <PrimaryButton type="submit" className="saveBtn">
                  Save
                </PrimaryButton>
              </Form>
            )}
          </Formik>
        </div>
      </Popup>
    </div>
  );
};

export default UserManagement;
