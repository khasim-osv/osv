import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "../MasterDataManagement.styled-component";
import "./Modules.scss";
import { PrimaryButton } from "../../../common/styled-components";
import { IModulesDetails, IModulesData, Category } from "./Modules.actionTypes";
import { yupSchema } from "../../../utils/Yup.validation";
import { toast } from "react-toastify";
export interface IProps {
  saveModule: IModulesData;
  saveModuleData: (data: IModulesDetails) => void;
  getCategories: any;
  saveClosed: () => void;
  categories: any;
}

const CreateModule = (props: IProps) => {
  useEffect(() => {
    props.getCategories();
  }, []);

  if (props.saveModule && props.saveModule.success) {
    toast.success(
      !Array.isArray(props.saveModule.data) && " Modules has been created",
      { containerId: "create" }
    );
    props.saveClosed();
    return <Redirect to="/masterdata/modules/all" />;
  }

  return (
    <div className="isFlex">
      <div className="modal">
        <div className="editTitle">Add new Module</div>
        <Formik
          initialValues={
            {
              moduleName: "",
              Web: false,
              isActive: true,
              Mobile: false,
              App: false,
              APIs: false,
              categoryId: "",
            } as IModulesDetails
          }
          validationSchema={yupSchema.ModulesForm}
          onSubmit={(values: IModulesDetails, { setSubmitting }) => {
            props.saveModuleData(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <Styledlabel htmlFor="categoryId">Category</Styledlabel>
            <Field name="categoryId" component="select">
              <option value="">select</option>
              {props.categories.data &&
                props.categories.data.map((category: any) => {
                  return (
                    <option value={category.value} key={category._id}>
                      {category.label}
                    </option>
                  );
                })}
            </Field>

            <div className="errorMessage">
              <ErrorMessage name="categoryId" />
            </div>

            <div className="formControl">
              <Styledlabel htmlFor="moduleName">Name</Styledlabel>
              <Field name="moduleName" type="text" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="moduleName" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="web">Web</Styledlabel>
              <Field name="Web" type="checkbox" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="Web" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="Mobile">Mobile</Styledlabel>
              <Field name="Mobile" type="checkbox" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="Mobile" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="App">App</Styledlabel>
              <Field name="App" type="checkbox" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="App" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="APIs">APIs</Styledlabel>
              <Field name="APIs" type="checkbox" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="APIs" />
              </div>
            </div>
            {props.saveModule && props.saveModule.success === false && (
              <div className="errorMessage">
                Something wrong with the API...!
              </div>
            )}
            <PrimaryButton type="submit">Save</PrimaryButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateModule;
