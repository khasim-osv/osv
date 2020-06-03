import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "./ErrorCodes.styled-component";
import "./ErrorCodes.scss";
import { yupSchema } from "../../../utils/Yup.validation";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { PrimaryButton } from "../../../common/styled-components";
import { IErrorCodesDetails, IErrorCodesData } from "./ErrorCodes.actionTypes";
export interface IProps {
  saveErrorCode: IErrorCodesData;
  saveErrorCodesData: (data: IErrorCodesDetails) => void;
  saveClosed: () => void;
}

const CreateErrorCodes = (props: IProps) => {
  if (props.saveErrorCode && props.saveErrorCode.success) {
    props.saveClosed();
    toast.success(
      !Array.isArray(props.saveErrorCode.data) &&
        '"' +
          props.saveErrorCode.data.errorcode +
          '"' +
          " Error Codes has been created",
      { containerId: "create" }
    );
    return <Redirect to="/masterdata/errorcodes/all" />;
  }
  return (
    <div className="isFlex">
      <div className="modal">
        <div className="editTitle">Create error code</div>
        <Formik
          initialValues={{
            key: "",
            errorcode: "",
            english: "",
            arabic: "",
            isActive: true,
            value: {
              english: "",
              arabic: "",
            },
            modifiedBy: "",
            modifiedDate: "",
          }}
          validationSchema={yupSchema.ErrorCodesForm}
          onSubmit={(values: IErrorCodesDetails, { setSubmitting }) => {
            values.value = {
              english: values.english,
              arabic: values.arabic,
            };
            props.saveErrorCodesData(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="formControl">
              <Styledlabel htmlFor="key">Key</Styledlabel>
              <Field name="key" type="text" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="key" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="errorcode">Error code</Styledlabel>
              <Field name="errorcode" type="text" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="errorcode" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="english">English</Styledlabel>
              <Field name="english" component="textarea" />
              <div className="errorMessage">
                <ErrorMessage name="english" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="arabic">Arabic</Styledlabel>
              <Field name="arabic" dir="rtl" component="textarea" />
              <div className="errorMessage">
                <ErrorMessage name="arabic" />
              </div>
            </div>

            <div className="errorMessage">{props.saveErrorCode.message}</div>
            <PrimaryButton type="submit">Add error code</PrimaryButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateErrorCodes;
