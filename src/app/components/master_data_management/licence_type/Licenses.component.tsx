import React, { useEffect, useState } from "react";
import "./Licenses.scss";
import Popup from "reactjs-popup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "../MasterDataManagement.styled-component";
import { PrimaryButton } from "../../../common/styled-components";
import {
  Module,
  Licenses,
  AllModule,
  License,
  LicenseData,
} from "./Licenses.actionTypes";

export interface IProps {
  getLicensesData: () => void;
  updateLicenseData: (values: LicenseData) => void;
  getLicenses: Licenses;
  editLicense: { success: boolean };
  popupEditClose: () => void;
  getAllModules: () => void;
  modules: [AllModule];
  // modules: [Module];
}

interface store {
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  selectedLicense: License;
}
const LicenceType = (props: IProps) => {
  useEffect(() => {
    props.getLicensesData();
  }, []);

  const [state, setModal] = useState({
    isEditOpen: false,
    isDeleteOpen: false,
    selectedLicense: new License(),
    //} as any);
  } as store);

  const editModalToggle = (license?: License) => {
    if (license) {
      setModal({
        ...state,
        isEditOpen: !state.isEditOpen,
        selectedLicense: license,
      });
    } else {
      setModal({
        ...state,
        isEditOpen: !state.isEditOpen,
      });
    }
    //  if(state.IsEditOpen){
    props.getAllModules();
    //   }
  };

  if (props.editLicense && props.editLicense.success && state.isEditOpen) {
    //editModalToggle();
    setModal({
      ...state,
      isEditOpen: !state.isEditOpen,
    });
    setTimeout(() => {
      props.popupEditClose();
      props.getLicensesData();
    }, 0);
  }

  return (
    <>
      <h2>License Type </h2>
      View licenses or change existing
      <div className="row">
        {props.getLicenses &&
          props.getLicenses.data &&
          props.getLicenses.data.map((license) => {
            return (
              <>
                <div className="column">
                  <h2 className="liceneName">
                    <p
                      id="text"
                      className="icon-EditAfter"
                      onClick={() => {
                        editModalToggle(license);
                      }}
                    >
                      {license.licenseName}
                    </p>
                  </h2>
                  {license.modules_info &&
                    license.modules_info.map((module: Module) => {
                      return (
                        <>
                          <p className="icon-right-mark">{module.moduleName}</p>
                        </>
                      );
                    })}
                </div>
              </>
            );
          })}
      </div>
      <Popup
        open={state.isEditOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <div className="modal">
          <div className="close" onClick={() => editModalToggle()}>
            &times;
          </div>

          <h3>Edit license values</h3>
          <Formik
            initialValues={{
              _id: state.selectedLicense ? state.selectedLicense._id : "",
              licenseName: state.selectedLicense
                ? state.selectedLicense.licenseName
                : "",
              modules: state.selectedLicense
                ? state.selectedLicense.modules
                : [""],
              noOfUsers: state.selectedLicense
                ? state.selectedLicense.noOfUsers
                : "10",
              noOfTransactions: state.selectedLicense
                ? state.selectedLicense.noOfTransactions
                : "1000",
            }}
            validationSchema={Yup.object({
              licenseName: Yup.string().required("Name is required"),
            })}
            onSubmit={(values: any, { setSubmitting }) => {
              props.updateLicenseData(values);
              setSubmitting(false);
            }}
            render={({ values }) => (
              <Form>
                <div className="formControl">
                  <Styledlabel htmlFor="licenseName">Name</Styledlabel>
                  <Field name="licenseName" type="text" autoComplete="off" />
                  <div className="errorMessage">
                    <ErrorMessage name="licenseName" />
                  </div>
                </div>
                <Styledlabel style={{ marginTop: "25px" }}>
                  Add modules
                </Styledlabel>
                <div className="RectCreateLicense">
                  <div className="formControl">
                    <FieldArray
                      name="modules"
                      render={(arrayHelpers) => (
                        <div>
                          {props.modules &&
                            props.modules.map((ele) => {
                              return (
                                <>
                                  <Styledlabel htmlFor={ele.categoryName}>
                                    {ele.categoryName}
                                  </Styledlabel>
                                  {ele.modules &&
                                    ele.modules.map((module) => {
                                      return (
                                        <>
                                          <input
                                            name="modules"
                                            type="checkbox"
                                            value={module._id}
                                            checked={
                                              values.modules
                                                ? values.modules.includes(
                                                    module._id
                                                  )
                                                : false
                                            }
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                arrayHelpers.push(module._id);
                                              } else {
                                                const idx = values.modules
                                                  ? values.modules.indexOf(
                                                      module._id
                                                    )
                                                  : 0;
                                                arrayHelpers.remove(idx);
                                              }
                                            }}
                                          />
                                          {module.moduleName}
                                          <br />
                                        </>
                                      );
                                    })}
                                </>
                              );
                            })}
                        </div>
                      )}
                    />

                    <Styledlabel htmlFor="noOfUsers">No. of users</Styledlabel>
                    <Field name="noOfUsers" component="select">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </Field>

                    <Styledlabel htmlFor="noOfTransactions">
                      No. of Transactions per day
                    </Styledlabel>
                    <Field name="noOfTransactions" component="select">
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                      <option value="3000">3000</option>
                      <option value="5000">5000</option>
                      <option value="10000">10000</option>
                    </Field>
                  </div>
                </div>
                {props.editLicense && props.editLicense.success === false && (
                  <div className="errorMessage">
                    Something wrong with the API...!
                  </div>
                )}
                <PrimaryButton
                  type="submit"
                  style={{ width: "30%", marginTop: "20px" }}
                >
                  Save
                </PrimaryButton>
              </Form>
            )}
          />
        </div>
      </Popup>
    </>
  );
};

export default LicenceType;
