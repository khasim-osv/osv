import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../utils/Yup.validation";
import { Link, Redirect } from "react-router-dom";
import { IUserDetails, IUserResponse } from "./Login.actionTypes";
import { Styledlabel, LoginWrapper } from "./Login.styled-component";
import { PrimaryButton } from "../../common/styled-components";
//import { useHistory } from "react-router-dom";
import logo from "./../../assets/images/adminLogo.png";
import "./Login.scss";

export interface IProps {
  onLogin?: ((values: IUserDetails) => void) | undefined;
  user: IUserResponse;
}

const Login = (props: IProps) => {
  //let history = useHistory();
  if (props.user.success) {
    return <Redirect to="/overview" />;
  } else {
  }
  return (
    <LoginWrapper>
      <div className="loginBorder">
        <div className="logoWrapper">
          <img src={logo} alt="Admin" />
        </div>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={yupSchema.Login}
          onSubmit={(values: IUserDetails, { setSubmitting }) => {
            props.onLogin && props.onLogin(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="formControl">
              <Styledlabel htmlFor="userName">User ID</Styledlabel>
              <Field name="userName" type="text" autoComplete="off" />
              <div className="errorMessage">
                <ErrorMessage name="userName" />
              </div>
            </div>
            <div className="formControl">
              <Styledlabel htmlFor="password">Password</Styledlabel>
              <Field name="password" type="password" />
              <div className="errorMessage">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="rememberMe">
              <div>
                <Field name="rememberMe" type="checkbox" />
                <label>Remember me</label>
              </div>
              <div>
                <Link to="/">Forgot my password</Link>
              </div>
            </div>
            <div className="errorMessage">{props.user.message}</div>
            <PrimaryButton type="submit">Log In</PrimaryButton>
          </Form>
        </Formik>
      </div>
    </LoginWrapper>
  );
};

export default Login;
