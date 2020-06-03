import React, { useEffect, useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../common/styled-components";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  ICategory,
  IWorkflowManagementState,
  IWorkflowManagementDetails,
  IWorkflowManagementData,
  IModulesCategory,
  ISubModules,
  workflowType,
} from "./CreateUserProfile.actionTypes";
import { Modules } from "../role_management/RoleManagement.actionTypes";
import {
  IProfileUsersData,
  IProfileUsers,
  IModulesCategory as IModulesCat,
  ISubModules as ISubMod,
} from "../user_management/UserManagement.actionTypes";
import { Tooltip } from "../../../common/tooltip/tooltip.component";

const _find = require("lodash.find");
const _findIndex = require("lodash.findindex");
const _filter = require("lodash.filter");

export interface IProps {
  categories: ICategory[];
  workforceMngmntData: IWorkflowManagementState;
  makeWFManagementEditable: () => void;
  getWorkflowData: IWorkflowManagementData;
  getWorkflow: (userProfileId: string) => void;
  updateWorkflow: (values: IWorkflowManagementDetails) => void;
  updateWorkflowData: IWorkflowManagementData;
  updateClosed: () => void;
  disabled: boolean;
  getAllProfileUsersData: IProfileUsersData;
  getAllProfileUsers: (profileId: string) => void;
  match: any;
}

const WorkFlowManagement = (props: IProps) => {
  useEffect(() => {
    if (props.match.params.id) {
      props.getWorkflow(props.match.params.id);
      props.getAllProfileUsers(props.match.params.id);
    }
  }, []);

  const [state, setState] = useState({
    view: {
      view0:
        props.workforceMngmntData && props.workforceMngmntData.saved
          ? true
          : false,
    },
  } as any);

  const currencyCodes = [
    { value: "SAR", label: "SAR" },
    { value: "INR", label: "INR" },
    { value: "USD", label: "USD" },
  ];

  const amountList = [
    { value: 50000, label: "50000" },
    { value: 100000, label: "100000" },
    { value: 150000, label: "150000" },
  ];

  const isChecked = (
    values: IWorkflowManagementDetails,
    category: ICategory,
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
                obj.moduleId === module._id &&
                obj.workflow.indexOf(approval) > -1;
          });
        }
      });
    return isModuleExist;
  };

  const groupLevelMark = (
    values: IWorkflowManagementDetails,
    category: ICategory,
    approval: string
  ) => {
    let data: ISubModules[] = [];
    values &&
      values.modulesCategory.forEach((item: IModulesCategory) => {
        if (data.length === 0 && category._id === item.categoryId)
          data = _filter(item.modules, { workflow: [approval] });
      });
    return data.length > 0;
  };

  const groupChecked = (
    values: IWorkflowManagementDetails,
    category: ICategory,
    approval: string
  ) => {
    let selectAllCount = 0;
    values &&
      values.modulesCategory.forEach((item: IModulesCategory) => {
        //values category
        if (item.categoryId === category._id) {
          item.modules.forEach((obj: ISubModules) => {
            //values modules
            if (obj.workflow.indexOf(approval) > -1) selectAllCount += 1;
          });
        }
      });
    return category.modules && selectAllCount === category.modules.length;
  };

  const groupChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: IWorkflowManagementDetails,
    category: ICategory
  ) => {
    let data: IModulesCategory[] = [];
    if (!e.target.checked) {
      data =
        values &&
        values.modulesCategory.filter((modules: IModulesCategory) => {
          if (modules.categoryId === category._id) {
            return modules.modules.filter((item: ISubModules) => {
              const index = item.workflow.indexOf(e.target.value);
              index > -1 && item.workflow.splice(index, 1);
              return item.workflow.length !== 0;
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
                let dat: any = [];
                modules.modules.filter((item: ISubModules) => {
                  return category.modules.filter((obj2: Modules) => {
                    obj2._id === item.moduleId &&
                      item.workflow.indexOf(e.target.value) === -1 &&
                      item.workflow.push(e.target.value);
                    obj2._id !== item.moduleId &&
                      !_find(modules.modules, { moduleId: obj2._id }) &&
                      !_find(dat, { moduleId: obj2._id }) &&
                      dat.push({
                        moduleId: obj2._id,
                        workflow: [e.target.value],
                      });
                    return item;
                  });
                });
                modules.modules = [...modules.modules, ...dat];
                return modules;
              } else {
                return modules;
              }
            })
          : createNewCategory(values, category, e);
    }
    let dat: IModulesCategory[] = [];
    data.forEach((modules: IModulesCategory) => {
      let moduledata: ISubModules[] = [];
      modules.modules.forEach((item: ISubModules) => {
        item.workflow.length > 0 && moduledata.push(item);
      });
      moduledata.length > 0 &&
        dat.push({ categoryId: modules.categoryId, modules: moduledata });
    });
    return dat;
  };

  const createNewCategory = (
    values: IWorkflowManagementDetails,
    category: ICategory,
    e: React.ChangeEvent<HTMLInputElement>,
    mod?: Modules
  ) => {
    let data = [...values.modulesCategory];
    const modules: ISubModules[] = [];
    category.modules.forEach((item: Modules) => {
      mod &&
        mod._id === item._id &&
        modules.push({ moduleId: item._id, workflow: [e.target.value] });
      !mod && modules.push({ moduleId: item._id, workflow: [e.target.value] });
    });
    data.push({ categoryId: category._id, modules: modules });
    return data;
  };

  const change = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: IWorkflowManagementDetails,
    category: ICategory,
    mod: Modules
  ) => {
    let data: IModulesCategory[] = [];
    if (!e.target.checked) {
      data =
        values &&
        values.modulesCategory.filter((modules: IModulesCategory) => {
          if (modules.categoryId === category._id) {
            return modules.modules.filter((module: ISubModules) => {
              mod._id === module.moduleId &&
                module.workflow.splice(
                  module.workflow.indexOf(e.target.value),
                  1
                );
              return module.workflow.length > 0;
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
                    ...[{ moduleId: mod._id, workflow: [e.target.value] }],
                  ]);
                } else {
                  return modules.modules.filter((module: ISubModules) => {
                    mod._id === module.moduleId &&
                      module.workflow.push(e.target.value);
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
        item.workflow.length > 0 && moduledata.push(item);
      });
      moduledata.length > 0 &&
        dat.push({ categoryId: modules.categoryId, modules: moduledata });
    });
    return dat;
  };

  if (props.updateWorkflowData && props.updateWorkflowData.success) {
    props.updateClosed();
    props.makeWFManagementEditable();
    toast.success("Workflow has been updated");
  }

  const editWorkflow = () => {
    props.makeWFManagementEditable();
    setState({
      ...state,
      view: {
        view0: true,
      },
    });
  };

  const getToolTip = (
    category: ICategory,
    approval: string,
    module: Modules
  ) => {
    let data: any = [];
    props.getAllProfileUsersData.data &&
      props.getAllProfileUsersData.data.forEach((profile: IProfileUsers) => {
        profile.modulesCategory.forEach((cat: IModulesCat) => {
          if (category._id === cat.categoryId) {
            cat.modules.forEach((mod: ISubMod) => {
              if (mod.moduleId === module._id && mod.workflow === approval) {
                data.push({ user: profile.name, id: profile._id });
              }
            });
          }
        });
      });
    return (
      data.length >= 2 && (
        <Tooltip
          title={data.length.toString()}
          header="Assigned users (All)"
          content={data.map((item: any) => {
            return (
              <div>
                {item.user}{" "}
                <Link
                  className="link"
                  to={`/userprofiles/usermanagement/${props.match.params.id}/${item.id}`}
                >
                  Edit
                </Link>
              </div>
            );
          })}
        />
      )
    );
  };

  return (
    <div
      className="isFlex"
      style={props.disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      {props.match.params.id ? (
        <div className="modal">
          <div className="editTitle">Workflow management</div>
          {props.workforceMngmntData && props.workforceMngmntData.saved && (
            <div style={{ textAlign: "right" }}>
              <button
                className="link"
                style={{ color: "blue" }}
                onClick={() => editWorkflow()}
              >
                Edit
              </button>
            </div>
          )}
          <Formik
            enableReinitialize={true}
            initialValues={
              props.getWorkflowData && props.getWorkflowData.data
                ? props.getWorkflowData.data
                : workflowType
            }
            onSubmit={(
              values: IWorkflowManagementDetails,
              { setSubmitting }
            ) => {
              values.userProfileId = props.match.params.id
                ? props.match.params.id
                : "";
              props.updateWorkflow(values);
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="approvalTable">
                  <div>
                    <div>Manage approval workflow for users.</div>
                    <div>REVIEWER</div>
                    <div>APPROVER</div>
                    <div>EXECUTOR</div>
                  </div>
                  <hr />
                  {props.categories.map(
                    (category: ICategory, index: number) => {
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
                                {!state.view["view" + index] ? "All" : "less"}
                              </span>
                            </div>
                            <div style={{ fontWeight: "bold" }}>
                              {!props.workforceMngmntData.saved ? (
                                <div>
                                  <input
                                    className="categoryCheckox"
                                    type="checkbox"
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
                                groupLevelMark(
                                  values,
                                  category,
                                  "reviewer"
                                ) && (
                                  <div className="flex">
                                    <div className="icon-right-mark"></div>L1
                                  </div>
                                )
                              )}
                            </div>
                            <div style={{ fontWeight: "bold" }}>
                              {!props.workforceMngmntData.saved ? (
                                <div>
                                  <input
                                    className="categoryCheckox"
                                    type="checkbox"
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
                                groupLevelMark(
                                  values,
                                  category,
                                  "approver"
                                ) && (
                                  <div className="flex">
                                    <div className="icon-right-mark"></div>L2
                                  </div>
                                )
                              )}
                            </div>
                            <div style={{ fontWeight: "bold" }}>
                              {!props.workforceMngmntData.saved ? (
                                <div>
                                  <input
                                    className="categoryCheckox"
                                    type="checkbox"
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
                                groupLevelMark(
                                  values,
                                  category,
                                  "executor"
                                ) && (
                                  <div className="flex">
                                    <div className="icon-right-mark"></div>L3
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          {category.modules &&
                            category.modules.map(
                              (module: Modules, index2: number) => {
                                return (
                                  state.view["view" + index] && (
                                    <div className="flex">
                                      <div>{module.moduleName}</div>
                                      <div>
                                        {!props.workforceMngmntData.saved ? (
                                          <div>
                                            <input
                                              type="checkbox"
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
                                          values &&
                                          isChecked(
                                            values,
                                            category,
                                            "reviewer",
                                            module
                                          ) && (
                                            <div className="flex">
                                              <div className="icon-right-mark"></div>
                                              L1{" "}
                                            </div>
                                          )
                                        )}
                                      </div>
                                      <div>
                                        {!props.workforceMngmntData.saved ? (
                                          <div>
                                            <input
                                              type="checkbox"
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
                                          </div>
                                        ) : (
                                          values &&
                                          isChecked(
                                            values,
                                            category,
                                            "approver",
                                            module
                                          ) && (
                                            <div className="flex">
                                              <div className="icon-right-mark"></div>
                                              L2{" "}
                                              {getToolTip(
                                                category,
                                                "approver",
                                                module
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                      <div>
                                        {!props.workforceMngmntData.saved ? (
                                          <div>
                                            <input
                                              type="checkbox"
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
                                          </div>
                                        ) : (
                                          values &&
                                          isChecked(
                                            values,
                                            category,
                                            "executor",
                                            module
                                          ) && (
                                            <div className="flex">
                                              <div className="icon-right-mark"></div>
                                              L3{" "}
                                              {getToolTip(
                                                category,
                                                "executor",
                                                module
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                );
                              }
                            )}
                        </div>
                      );
                    }
                  )}
                  <div>
                    <div>
                      <div style={{ fontWeight: "bold" }}>
                        Max amount limit{" "}
                      </div>
                      {!props.workforceMngmntData.saved ? (
                        <>
                          <Select
                            className="reactSelect"
                            options={currencyCodes}
                            name="currencyCode"
                            value={
                              values &&
                              currencyCodes.filter((item) => {
                                return (
                                  values &&
                                  values.approvalLimit.currencyCode ===
                                    item.value &&
                                  item
                                );
                              })[0]
                            }
                            onChange={(selectedOption: any) => {
                              setFieldValue(
                                "approvalLimit.currencyCode",
                                selectedOption.value
                              );
                            }}
                          />
                          <Select
                            className="reactSelect"
                            options={amountList}
                            name="maxLimit"
                            value={
                              values &&
                              amountList.filter((item) => {
                                return (
                                  values &&
                                  values.approvalLimit.maxLimit ===
                                    item.value &&
                                  item
                                );
                              })[0]
                            }
                            onChange={(selectedOption: any) => {
                              setFieldValue(
                                "approvalLimit.maxLimit",
                                selectedOption.value
                              );
                            }}
                          />
                        </>
                      ) : (
                        <div>
                          {values &&
                            values.approvalLimit.currencyCode +
                              " " +
                              values.approvalLimit.maxLimit}
                        </div>
                      )}
                    </div>
                    <div>--</div>
                    <div>
                      {!props.workforceMngmntData.saved ? (
                        <div>
                          <input
                            type="checkbox"
                            name="approver"
                            checked={
                              values &&
                              values.approvalLimit.workflow.indexOf(
                                "approver"
                              ) > -1
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              let workflow: Array<string> = [
                                ...values.approvalLimit.workflow,
                              ];
                              const index = workflow.indexOf(e.target.name);
                              if (index > -1 && !e.target.checked)
                                workflow.splice(index, 1);
                              else workflow.push(e.target.name);
                              setFieldValue("approvalLimit.workflow", workflow);
                            }}
                          />
                          L2
                        </div>
                      ) : (
                        values &&
                        values.approvalLimit.workflow.indexOf("approver") >
                          -1 && (
                          <div className="flex">
                            <div className="icon-right-mark"></div>L2
                          </div>
                        )
                      )}
                    </div>
                    <div>
                      {!props.workforceMngmntData.saved ? (
                        <div>
                          <input
                            type="checkbox"
                            name="executor"
                            checked={
                              values &&
                              values.approvalLimit.workflow.indexOf(
                                "executor"
                              ) > -1
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              let workflow: Array<string> = [
                                ...values.approvalLimit.workflow,
                              ];
                              const index = workflow.indexOf(e.target.name);
                              if (index > -1 && !e.target.checked)
                                workflow.splice(index, 1);
                              else workflow.push(e.target.name);
                              setFieldValue("approvalLimit.workflow", workflow);
                            }}
                          />
                          L3
                        </div>
                      ) : (
                        values &&
                        values.approvalLimit.workflow.indexOf("executor") >
                          -1 && (
                          <div className="flex">
                            <div className="icon-right-mark"></div>L3
                          </div>
                        )
                      )}
                    </div>
                    <div>
                      {!props.workforceMngmntData.saved ? (
                        <div>
                          <input
                            type="checkbox"
                            name="all"
                            checked={
                              values &&
                              values.approvalLimit.workflow.length === 2
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              let workflow: Array<string> = [
                                ...values.approvalLimit.workflow,
                              ];
                              if (!e.target.checked) workflow = [];
                              else workflow = ["approver", "executor"];
                              setFieldValue("approvalLimit.workflow", workflow);
                            }}
                          />
                          All
                        </div>
                      ) : (
                        values &&
                        values.approvalLimit.workflow.length === 0 && (
                          <div className="flex">
                            <div className="icon-right-mark"></div>All
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {!props.workforceMngmntData.saved && (
                  <div className="flexProps">
                    <SecondaryButton
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        props.makeWFManagementEditable();
                      }}
                    >
                      {props.getWorkflowData && props.getWorkflowData.data
                        ? "CANCEL"
                        : "CLEAR"}
                    </SecondaryButton>
                    <PrimaryButton type="submit">SAVE</PrimaryButton>
                  </div>
                )}
              </Form>
            )}
          </Formik>

          <ToastContainer
            enableMultiContainer
            className="toastContainer"
            toastClassName="toastBody"
            hideProgressBar={true}
          />
        </div>
      ) : (
        <div>
          <div className="editTitle">Workflow management</div>
          <div>Complete the company info section to see the workflow.</div>
        </div>
      )}
    </div>
  );
};

export default WorkFlowManagement;
