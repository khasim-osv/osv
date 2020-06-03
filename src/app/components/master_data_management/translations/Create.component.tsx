import React from "react";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../../utils/Yup.validation";
import { Styledlabel } from "./Translations.styled-component";
import "./Translations.scss";
import { PrimaryButton } from "../../../common/styled-components";
import {
  ITranslationDetails,
  ITranslationData,
} from "./Translation.actionTypes";
import { toast } from "react-toastify";

export interface IProps {
  saveTranslation: ITranslationData;
  saveTranslationData: (data: ITranslationDetails) => void;
  saveClosed: () => void;
}

const Create = (props: IProps) => {
  if (props.saveTranslation && props.saveTranslation.success) {
    props.saveClosed();
    toast.success(
      !Array.isArray(props.saveTranslation.data) &&
        '"' +
          props.saveTranslation.data.key +
          '"' +
          " translation has been created",
      { containerId: "create" }
    );
    return <Redirect to="/masterdata/translations/all" />;
  }
  return (
    <div className="isFlex">
      <div className="modal">
        <div className="editTitle">Create new translations</div>
        <Formik
          initialValues={
            { key: "", english: "", arabic: "" } as ITranslationDetails
          }
          validationSchema={yupSchema.TranslationForm}
          onSubmit={(values: ITranslationDetails, { setSubmitting }) => {
            values.value = {
              english: values.english,
              arabic: values.arabic,
            };
            props.saveTranslationData(values);
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
            {props.saveTranslation &&
              props.saveTranslation.success === false && (
                <div className="errorMessage">
                  Something wrong with the API...!
                </div>
              )}
            <PrimaryButton type="submit">Add translation</PrimaryButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Create;
