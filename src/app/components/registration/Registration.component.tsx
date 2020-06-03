import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Styledlabel,
  Gridcard,
  Maindiv,
  Childdiv,
  InnerDiv,
} from "./Registration.styled-component";
export interface IProps {
  onRegister1: (xyz: any) => {};
}

const RegistrationStep1 = (props: IProps) => {
  return (
    <Formik
      initialValues={{
        companyName: "",
        mobileNumber: "",
        emailId: "",
        password: "",
      }}
      validationSchema={Yup.object({
        companyName: Yup.string().required("Company Name is required"),
        mobileNumber: Yup.string().required("Mobile Number is required"),
        emailId: Yup.string()
          .email()
          .required("Email Id is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.onRegister1(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Gridcard>
        <Form>
          <Maindiv>Create Single View account</Maindiv>
          <Childdiv>
            one account for everything. Free access 60 days.
            <br />
            Learn More
          </Childdiv>
          <hr />

          <Styledlabel htmlFor="companyName">Company Name</Styledlabel>
          <br />
          <InnerDiv>
            <Field
              className="formControl"
              name="companyName"
              type="text"
              placeholder="Company Name"
            />
            <div style={{ color: "red" }}>
              <ErrorMessage name="companyName" />
            </div>
          </InnerDiv>

          <Styledlabel htmlFor="emailId">Email address</Styledlabel>
          <br />
          <InnerDiv>
            <Field
              className="formControl"
              name="emailId"
              type="text"
              placeholder="Email Id"
            />
            <div style={{ color: "red" }}>
              <ErrorMessage name="emailId" />
            </div>
          </InnerDiv>

          <Styledlabel htmlFor="mobileNumber">Phone</Styledlabel>
          <br />
          <InnerDiv>
            <Field
              name="mobileNumber"
              type="text"
              className="formControl"
              placeholder="Mobile Number"
            />
            <div style={{ color: "red" }}>
              <ErrorMessage name="mobileNumber" />
            </div>
          </InnerDiv>

          <Styledlabel htmlFor="password">Password</Styledlabel>
          <br />
          <InnerDiv>
            <Field
              name="password"
              type="password"
              className="formControl"
              placeholder="password"
            />
            <div style={{ color: "red" }}>
              <ErrorMessage name="password" />
            </div>
          </InnerDiv>

          <button
            style={{
              width: "100px",
              height: "40px",
              float: "right",
              backgroundColor: "blue",
            }}
            type="submit"
          >
            Register{" "}
          </button>
        </Form>
      </Gridcard>
    </Formik>
  );
};

export default RegistrationStep1;
