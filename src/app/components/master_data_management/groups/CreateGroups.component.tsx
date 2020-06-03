import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "./Groups.styled-component";
import "./Groups.scss";
import { yupSchema } from "../../../utils/Yup.validation";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { PrimaryButton } from "../../../common/styled-components";
import { IGroupsDetails, IGroupsData } from "./Groups.actionTypes";
export interface IProps {
  saveGroups: IGroupsData;
  saveGroupsData: (data: IGroupsDetails) => void;
  saveClosed: () => void;
}

const CreateGroups = (props: IProps) => {
  if (props.saveGroupsData && props.saveGroups.success) {
    props.saveClosed();
    toast.success(
      !Array.isArray(props.saveGroups.data) &&
        '"' +
          props.saveGroups.data.value.english +
          '"' +
          " Groups has been created",
      { containerId: "create" }
    );
    return <Redirect to="/masterdata/groups/all" />;
  }
  return (
    <div className="isFlex">
      <div className="modal">
        <div className="editTitle">Create group</div>
        <Formik
          initialValues={{
            key: "",
            english: "",
            arabic: "",
            isActive: true,
            value: {
              english: "",
              arabic: "",
            },
          }}
          validationSchema={yupSchema.GroupsForm}
          onSubmit={(values: IGroupsDetails, { setSubmitting }) => {
            values.value = {
              english: values.english,
              arabic: values.arabic,
            };
            props.saveGroupsData(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="formControl">
              <Styledlabel htmlFor="english">English Name</Styledlabel>
              <Field name="english" component="textarea" />
              <div className="errorMessage">
                <ErrorMessage name="english" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="arabic">الاسم العربي</Styledlabel>
              <Field name="arabic" dir="rtl" component="textarea" />
              <div className="errorMessage">
                <ErrorMessage name="arabic" />
              </div>
            </div>
            {props.saveGroups && props.saveGroups.success === false && (
              <div className="errorMessage">
                Something wrong with the API...!
              </div>
            )}
            <PrimaryButton type="submit">Add group</PrimaryButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateGroups;
