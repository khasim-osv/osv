import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { IBanksDetails, IBanksData, IFile, IState } from "./Banks.actionTypes";
import { yupSchema } from "../../../utils/Yup.validation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Styledlabel } from "./Banks.styled-component";
import "./Banks.scss";
import { Redirect } from "react-router-dom";
import { PrimaryButton } from "../../../common/styled-components";

export interface IProps {
  saveBanks: IBanksData;
  saveBanksData: (data: IBanksDetails) => void;
  saveClosed: () => void;
}

const CreateBanks = (props: IProps) => {
  const [state, setState] = useState({
    IsEditOpen: false,
    selectedRow: {},
    selectedImage: "",
  } as IState);
  if (props.saveBanksData && props.saveBanks.success) {
    props.saveClosed();
    toast.success(
      !Array.isArray(props.saveBanks.data) && " Banks has been created",
      { containerId: "create" }
    );
    return <Redirect to="/masterdata/banks/all" />;
  }
  // const filename = (event) => {
  //   setState({
  //     ...state,
  //     selectedFile: ,
  //   });
  // };
  return (
    <div className="isFlex">
      <div className="modal">
        <div className="editTitle">Add bank</div>

        <Formik
          initialValues={{
            bank: "",
            url: "",
            type: "National",
            logo: null,
            isActive: true,
          }}
          validationSchema={yupSchema.BanksForm}
          onSubmit={(values: IBanksDetails, { setSubmitting }) => {
            props.saveBanksData(values);
            setSubmitting(false);
          }}
          render={({ values, handleSubmit, setFieldValue }) => {
            return (
              <Form>
                <div className="formControl">
                  <Styledlabel htmlFor="bank">Bank</Styledlabel>
                  <Field name="bank" type="text" autoComplete="off" />
                  <div className="errorMessage">
                    <ErrorMessage name="bank" />
                  </div>
                </div>
                <div className="formControl">
                  <Styledlabel htmlFor="url">URL</Styledlabel>
                  <Field name="url" type="text" autoComplete="off" />
                  <div className="errorMessage">
                    <ErrorMessage name="url" />
                  </div>
                </div>
                <div className="formControl">
                  <Styledlabel htmlFor="type">Type</Styledlabel>
                  <Field name="type" component="select">
                    <option value="National">National</option>
                    <option value="International">International</option>
                  </Field>
                  <div className="errorMessage">
                    <ErrorMessage name="type" />
                  </div>
                </div>
                <div className="formControl">
                  <Styledlabel htmlFor="logo">Logo</Styledlabel>
                  <label className="custom-file-upload">
                    <input
                      name="logo"
                      type="file"
                      onChange={(event: any) => {
                        setFieldValue("logo", event.currentTarget.files[0]);
                      }}
                    />
                  </label>
                  <div className="errorMessage">
                    <ErrorMessage name="logo" />
                  </div>
                </div>
                {props.saveBanks && props.saveBanks.success === false && (
                  <div className="errorMessage">
                    Something wrong with the API...!
                  </div>
                )}
                <PrimaryButton type="submit">Add bank</PrimaryButton>
              </Form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CreateBanks;
