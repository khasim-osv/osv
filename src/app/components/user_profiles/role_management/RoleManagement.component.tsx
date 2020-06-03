import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  RoleManagementDetails,
  RoleManagementData,
  IModules,
  Modules,
  IMasterModules,
  ISearchState,
  ISearchKey,
  roleManagementType,
} from "./RoleManagement.actionTypes";
import { yupSchema } from "../../../utils/Yup.validation";
import {
  PrimaryButton,
  Styledlabel,
  SecondaryButton,
} from "../../../common/styled-components";
import "./RoleManagement.scss";
import { toast, ToastContainer } from "react-toastify";
import history from "../../../history";

export interface IProps {
  getRole: (id: string) => void;
  getRoleData: RoleManagementData;
  getEditData: RoleManagementData;
  getRoleMasterData: IMasterModules;
  getAllRolesData: RoleManagementData;
  saveRole: (data: RoleManagementDetails) => void;
  editSuccess: () => void;
  getMasterModules: (userProfileId: string) => void;
  getAllRolesMaster: (userProfileId: string) => void;
  match: any;
}

const RoleManagement = (props: IProps) => {
  const [state, setState] = useState({
    valueToBeSearched: "",
  } as ISearchState);
  useEffect(() => {
    if (props.match.params.userProfileId) {
      props.getMasterModules(props.match.params.userProfileId);
      props.getAllRolesMaster(props.match.params.userProfileId);
    }

    if (props.match.params.id) {
      props.getRole(props.match.params.id);
    }
  }, []);
  if (props.getEditData && props.getEditData.success) {
    props.editSuccess();
    toast.success(
      !Array.isArray(props.getEditData.data) &&
        '"' +
          props.getEditData.data.roleName +
          '"' +
          " role has been " +
          (props.getRoleData.data._id === "" ? "created" : "updated")
    );
    history.push(`/userprofiles/addUser/${props.match.params.userProfileId}`);
  }

  const checkField = (modulesCategory: any, feature: any) => {
    let data = modulesCategory.filter((o: any) => {
      return o.modules.filter((obj: any) => {
        return obj._id === feature._id;
      });
    });
    if (data.length > 0) {
      let dat = data.filter((obj: any) => {
        let a;
        obj.modules.forEach((ele: any) => {
          if (ele._id === feature._id) {
            a = ele;
          }
        });
        if (a) {
          return a;
        }
      });
      if (dat.length > 0) return true;
      else return false;
    }
    return false;
  };

  const onCheckChange = (
    e: any,
    values: RoleManagementDetails,
    feature: Modules,
    item: IModules
  ) => {
    let modules = [...values.modulesCategory];
    modules = modules.filter((obj) => {
      return obj._id === item._id;
    });
    if (modules.length === 0) {
      modules = [
        {
          _id: item._id,
          modules: [{ _id: feature._id }],
        },
      ];
    } else {
      modules = [];
    }
    let data =
      values.modulesCategory.length > 0
        ? values.modulesCategory.filter((o) => {
            o.modules &&
              o.modules.filter((obj, index) => {
                if (
                  obj._id === feature._id &&
                  !e.target.checked &&
                  o._id === item._id
                ) {
                  o.modules && o.modules.splice(index, 1);
                }

                if (e.target.checked && o._id === item._id) {
                  if (obj._id === feature._id) {
                    o.modules &&
                      o.modules.push({
                        _id: feature._id,
                      });
                  } else {
                    if (o.modules && o.modules.length === 0) {
                      o.modules = [];
                    }
                    o.modules &&
                      o.modules.push({
                        _id: feature._id,
                      });
                    o._id = item._id;
                  }
                }
              });

            return o.modules && o.modules.length > 0 && o;
          })
        : [
            {
              _id: item._id,
              modules: [{ _id: feature._id }],
            },
          ];
    return [...data, ...modules];
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    const val = {
      search: newValue,
    };
    if (newValue !== "") {
      //props.getAllRolesMaster(val);

      let filteredGroups =
        props.getAllRolesData && props.getAllRolesData.data
          ? props.getAllRolesData.data
          : [];
      state.filteredData = filteredGroups;

      setState({
        groupName:
          state.filteredData &&
          Array.isArray(state.filteredData) &&
          state.filteredData.length >= 1
            ? true
            : false,
        valueToBeSearched: newValue,
        filteredData: filteredGroups,
      });
    }
    if (newValue === "") {
      setState({ valueToBeSearched: "", filteredData: [], groupName: false });
    }
  };
  return (
    <div className="isFlex outline">
      <div className="modal">
        <div className="editTitle">Create new role</div>
        <p>Manage user roles and permissions.</p>
        <hr />
        <Formik
          enableReinitialize={true}
          initialValues={props.getRoleData.data}
          validationSchema={yupSchema.roleManagementForm}
          onSubmit={(values: RoleManagementDetails, { setSubmitting }) => {
            values.userProfileId = props.match.params.userProfileId
              ? props.match.params.userProfileId
              : "";
            values.modulesCategory.length > 0 &&
              values.modulesCategory[0].categoryName === "" &&
              values.modulesCategory.splice(0, 1);
            if (!state.groupName) {
              props.saveRole(values);
              setSubmitting(true);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="formControl">
                <Styledlabel htmlFor="roleName">Role name</Styledlabel>
                <Field
                  name="roleName"
                  type="text"
                  autoComplete="off"
                  onKeyUp={handleChange}
                />
                <ul>
                  {state.filteredData &&
                    Array.isArray(state.filteredData) &&
                    state.filteredData.map((item: RoleManagementDetails) => (
                      <li>{item.roleName}</li>
                    ))}
                  {state.filteredData &&
                    Array.isArray(state.filteredData) &&
                    state.filteredData.length > 0 && (
                      <li
                        onClick={() =>
                          setState({
                            ...state,
                            valueToBeSearched: "",
                            filteredData: [],
                          })
                        }
                        className="addItem"
                      >
                        Add {state.valueToBeSearched}
                      </li>
                    )}
                </ul>
                {state.groupName ? (
                  <div className="error">Role Exists</div>
                ) : (
                  ""
                )}
                <div className="errorMessage">
                  <ErrorMessage name="roleName" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="roleName">Add modules</Styledlabel>
                <div className="isFlex wrap">
                  {props.getRoleMasterData &&
                    props.getRoleMasterData.data &&
                    props.getRoleMasterData.data.map((item: IModules) => {
                      return (
                        <div className="flexItems" key={item.categoryName}>
                          <h4>{item.categoryName}</h4>
                          {item.modules &&
                            item.modules.map((feature: Modules) => {
                              return (
                                <div key={feature.moduleName}>
                                  <input
                                    type="checkbox"
                                    name={feature.moduleName}
                                    value={feature._id}
                                    checked={
                                      values &&
                                      values.modulesCategory &&
                                      values.modulesCategory.length > 0 &&
                                      checkField(
                                        values.modulesCategory,
                                        feature
                                      )
                                    }
                                    onChange={(e: any) => {
                                      const data = onCheckChange(
                                        e,
                                        values,
                                        feature,
                                        item
                                      );
                                      setFieldValue("modulesCategory", data);
                                    }}
                                  />
                                  <label htmlFor={feature.moduleName}>
                                    {feature.moduleName}
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="flexProps">
                <div
                  className="addMoreUserLink"
                  onClick={() =>
                    history.push(
                      `/userprofiles/rolemanagement/${props.match.params.userProfileId}`
                    )
                  }
                >
                  +Add one more user role
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
    </div>
  );
};

export default RoleManagement;
