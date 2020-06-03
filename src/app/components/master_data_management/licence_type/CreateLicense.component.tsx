import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "../MasterDataManagement.styled-component";
import "./Licenses.scss";
import { PrimaryButton } from "../../../common/styled-components";
import { AllModule, LicenseData, Module } from "./Licenses.actionTypes";

export interface IProps {
  saveLicense: { success: boolean };
  saveLicenseData: (values: LicenseData) => void;
  getAllModules: () => [AllModule];
  saveClosed: () => void;
  modules: [AllModule];
}

const CreateLicense = (props: IProps) => {
  useEffect(() => {
    props.getAllModules();
  }, []);

  if (props.saveLicense && props.saveLicense.success) {
    props.saveClosed();
    return <Redirect to="/masterdata/licencetype/all" />;
  }
  return (
    <div className="isFlex">
      <div className="modal">
        <div className="editTitle">Add License Type</div>
        <Formik
          initialValues={{
            licenseName: "",
            modules: [],
            noOfUsers: "10",
            noOfTransactions: "1000",
          }}
          validationSchema={Yup.object({
            licenseName: Yup.string().required("Name is required"),
          })}
          onSubmit={(values: LicenseData, { setSubmitting }) => {
            props.saveLicenseData(values);
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
              <div className="editTitle" style={{ marginTop: "25px" }}>
                Add modules
              </div>
              <div className="RectCreateLicense">
                <div
                  className="formControl"
                  style={{ paddingLeft: "25px", display: "flex" }}
                >
                  <FieldArray
                    name="modules"
                    render={(arrayHelpers) => (
                      <div>
                        {props.modules &&
                          props.modules.length &&
                          props.modules.map((ele) => {
                            return (
                              <>
                                <h4>{ele.categoryName}</h4>
                                {ele.modules &&
                                  ele.modules.map((module: Module) => {
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
                </div>
                <div
                  className="formControl"
                  style={{
                    paddingLeft: "25px",
                    display: "flex",
                    width: "100%",
                  }}
                >
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
              {props.saveLicense && props.saveLicense.success === false && (
                <div className="errorMessage">
                  Something wrong with the API...!
                </div>
              )}
              <PrimaryButton
                type="submit"
                style={{ width: "30%", marginLeft: "400px", marginTop: "20px" }}
              >
                Save
              </PrimaryButton>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default CreateLicense;
