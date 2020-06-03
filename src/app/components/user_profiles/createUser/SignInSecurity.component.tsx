import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel, PrimaryButton } from "../../../common/styled-components";
import { toast, ToastContainer } from "react-toastify";
import Switch from "react-switch";
import { ISignInState, ISignIn } from "./CreateUserProfile.actionTypes";
import Select from "react-select";
import "./CreateUser.scss";
import isEmpty from "lodash.isempty";
import { yupSchema } from "../../../utils/Yup.validation";

export interface IProps {
  saveSignInInfo: (values: ISignIn) => void;
  signInInfoData: ISignInState;
  makeSignInEditable: () => void;
  disabled: boolean;
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
const SignInSecurity = (props: IProps) => {
  if (!props.signInInfoData.load && props.signInInfoData.saved === false) {
    toast.error("Something wrong with the API...!", {
      containerId: "signIn",
    });
  }
  if (!props.signInInfoData.load && props.signInInfoData.saved === true) {
    toast.success("Sign in information successfully saved", {
      containerId: "signIn",
    });
  }

  return (
    <div
      className="isFlex"
      style={props.disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <div className="modal">
        {!props.signInInfoData.editState && (
          <div style={{ textAlign: "right" }}>
            <button
              className="link"
              style={{ color: "blue" }}
              onClick={props.makeSignInEditable}
            >
              Edit
            </button>
          </div>
        )}
        <div className="editTitle">Sign In & Security</div>
        <Formik
          initialValues={
            //  ...props.signInInfoData
            {
              _id: props.signInInfoData._id,
              userId: props.signInInfoData.userId,
              email: props.signInInfoData.email,
              phCode: props.signInInfoData.phCode,
              phone: props.signInInfoData.phone,
              twoStepVerification: props.signInInfoData.twoStepVerification,
            }
            /* { userId: "",
                email: "",
                phCode: "",
                phone: "",
                twoStepVerification: ""}*/
          }
          enableReinitialize
          validationSchema={yupSchema.signInSecurityForm}
          onSubmit={(values: ISignIn, { setSubmitting }) => {
            props.saveSignInInfo(values);
            setSubmitting(false);
          }}
          render={({ errors, values, resetForm, setFieldValue, touched }) => (
            <Form>
              <div className="formControl">
                <Styledlabel htmlFor="userId">Account ID</Styledlabel>
                {props.signInInfoData.editState && (
                  <Field
                    name="userId"
                    type="text"
                    autoComplete="off"
                    className={
                      errors && errors.userId && touched && touched.userId
                        ? "textBoxBorder"
                        : "defaultTextBox"
                    }
                  />
                )}
                {!props.signInInfoData.editState && (
                  <span style={{ color: "blue" }}>
                    {props.signInInfoData.userId}
                  </span>
                )}
                <div className="errorMessage">
                  <ErrorMessage name="userId" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="email">Email address</Styledlabel>
                {props.signInInfoData.editState && (
                  <Field
                    name="email"
                    type="text"
                    autoComplete="off"
                    className={
                      errors && errors.email && touched && touched.email
                        ? "textBoxBorder"
                        : "defaultTextBox"
                    }
                  />
                )}
                {!props.signInInfoData.editState && props.signInInfoData.email && (
                  <span style={{ color: "blue" }}>
                    {props.signInInfoData.email}{" "}
                    <span style={{ color: "green" }}>verified</span>
                  </span>
                )}
                <div className="errorMessage">
                  <ErrorMessage name="email" />
                </div>
              </div>
              {!props.signInInfoData.editState && (
                <div className="formControl">
                  <Styledlabel htmlFor="password">Password</Styledlabel>
                  {/* {props.signInInfoData.editState && (
                  <Field type="text" autoComplete="off" />
                )} */}
                  <span style={{ color: "blue" }}>{"********"}</span>
                </div>
              )}
              <div className="formControl">
                <Styledlabel htmlFor="phone">Phone</Styledlabel>
                {props.signInInfoData.editState && (
                  <>
                    <Select
                      className="reactSelect"
                      options={countryCodes}
                      value={
                        values &&
                        countryCodes.filter((item) => {
                          return values.phCode === item.value && item;
                        })[0]
                      }
                      name="phCode"
                      onChange={(selecetedOption: any) => {
                        setFieldValue("phCode", selecetedOption.value);
                      }}
                    />
                    <Field
                      name="phone"
                      type="text"
                      style={{ marginLeft: "10px" }}
                      autoComplete="off"
                      className={
                        errors && errors.phone && touched && touched.phone
                          ? "textBoxBorder"
                          : "defaultTextBox"
                      }
                    />
                  </>
                )}
                {!props.signInInfoData.editState && (
                  <span style={{ color: "blue" }}>
                    ({props.signInInfoData.phCode}){props.signInInfoData.phone}
                  </span>
                )}
                <div className="errorMessage">
                  <ErrorMessage name="phone" />
                </div>
              </div>

              <div className="formControl">
                <Styledlabel htmlFor="twoStepVerification">
                  Two-step verification
                </Styledlabel>

                {props.signInInfoData.editState && (
                  <Switch
                    onChange={(checked: boolean) => {
                      setFieldValue("twoStepVerification", checked);
                    }}
                    checked={values.twoStepVerification}
                  />
                )}
                {!props.signInInfoData.editState && (
                  <Switch
                    onChange={(checked: boolean) => {
                      setFieldValue("twoStepVerification", checked);
                    }}
                    disabled
                    checked={props.signInInfoData.twoStepVerification}
                  />
                )}
              </div>
              <div className="" style={{ display: "flex" }}>
                <Styledlabel htmlFor="biometric">Bio metric</Styledlabel>
                <div style={{ marginLeft: "400px", marginTop: "0px" }}>
                  Send request to user
                </div>
              </div>

              {props.signInInfoData.editState && (
                <div style={{ display: "flex" }}>
                  <div style={{ width: "100%", marginLeft: "100px" }}> </div>
                  <PrimaryButton
                    type="reset"
                    style={{
                      width: "40%",
                      marginRight: "100px",
                      marginTop: "20px",
                      backgroundColor: "pink",
                    }}
                  >
                    Clear
                  </PrimaryButton>
                  <PrimaryButton
                    type="submit"
                    onClick={() => {
                      if (!isEmpty(errors)) {
                        toast.error(
                          "Please fill all red alert fields to continue",
                          { containerId: "signIn" }
                        );
                      }
                    }}
                    style={{ width: "40%", marginTop: "20px" }}
                  >
                    Save
                  </PrimaryButton>
                </div>
              )}

              <ToastContainer
                enableMultiContainer
                containerId={"signIn"}
                className="toastContainer"
                toastClassName="toastBody"
                hideProgressBar={true}
              />
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default React.memo(SignInSecurity);
