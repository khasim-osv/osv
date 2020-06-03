import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel, PrimaryButton } from "../../../common/styled-components";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import {
  IBank,
  IBankState,
  IBankMaster,
} from "./CreateUserProfile.actionTypes";
import isEmpty from "lodash.isempty";
import { yupSchema } from "../../../utils/Yup.validation";

interface IProps {
  banks: IBankMaster;
  saveBankAccounts: (values: IBank) => void;
  bankAccountsData: IBankState;
  editBankAccount: (bank: IBank) => void;
  addBankAccount: () => void;
  closeBankForm: () => void;
  openBankForm: () => void;
  disabled: boolean;
}

//class BankAccounts extends React.PureComponent<IProps> {
const BankAccounts = (props: IProps) => {
  if (!props.bankAccountsData.load && props.bankAccountsData.saved === false) {
    toast.error("Something wrong with the API...!", {
      containerId: "bankAccts",
    });
  }
  if (!props.bankAccountsData.load && props.bankAccountsData.saved === true) {
    toast.success("Bank account successfully saved", {
      containerId: "bankAccts",
    });
  }

  return (
    <div
      className="isFlex"
      style={props.disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <div className="modal">
        <div className="editTitle">Bank accounts</div>
        <span>Manage user and add admins,accountants and other users</span>
        <Formik
          initialValues={props.bankAccountsData.selectedBank}
          enableReinitialize
          validationSchema={yupSchema.bankAccountsForm}
          onSubmit={(values: IBank, { setSubmitting }) => {
            props.saveBankAccounts(values);

            setSubmitting(false);
          }}
          render={({ errors, values, resetForm, setFieldValue, touched }) => (
            <>
              <div className="formControl">
                {props.bankAccountsData.saved &&
                  props.bankAccountsData.banks &&
                  props.bankAccountsData.banks.map((bank: IBank, i: number) => {
                    return (
                      <div key={bank._id}>
                        <div style={{ marginTop: "10px" }}>
                          <span>Bank {i + 1}:</span>
                          <span style={{ color: "blue" }}>
                            {" "}
                            {/*props.bankAccountsData.bank */}
                            <br /> Abdulaziz khan pvt. ltd.(....9867)
                          </span>
                        </div>
                        {props.bankAccountsData.showBankForm &&
                          props.bankAccountsData.selectedBank &&
                          props.bankAccountsData.selectedBank.bankId !==
                            bank.bankId && (
                            <div style={{ textAlign: "right" }}>
                              <button
                                className="editBtn"
                                onClick={() => props.editBankAccount(bank)}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        {!props.bankAccountsData.showBankForm && (
                          <div style={{ textAlign: "right" }}>
                            <button
                              className="editBtn"
                              onClick={() => props.editBankAccount(bank)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              {props.bankAccountsData.showBankForm && (
                <>
                  <div style={{ textAlign: "right" }}>
                    {!isEmpty(props.bankAccountsData.banks) && (
                      <button
                        className="closeBtn"
                        onClick={props.closeBankForm}
                      >
                        Close
                      </button>
                    )}
                  </div>
                  <Form>
                    <div className="formControl">
                      <Styledlabel htmlFor="bankId">Bank</Styledlabel>
                      <Select
                        className="reactSelect"
                        options={Object.values(props.banks)}
                        name="bankId"
                        onChange={(selecetedOption: any) => {
                          setFieldValue("bankId", selecetedOption.value);
                        }}
                        value={
                          props.banks &&
                          props.banks[
                            props.bankAccountsData.selectedBank.bankId
                          ]
                        }
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="bankId" />
                      </div>
                    </div>

                    <div className="formControl">
                      <>
                        <Styledlabel htmlFor="accountId">
                          Account ID
                        </Styledlabel>
                        <Field
                          name="accountId"
                          type="text"
                          autoComplete="off"
                          className={
                            errors &&
                            errors.accountId &&
                            touched &&
                            touched.accountId
                              ? "textBoxBorder"
                              : "defaultTextBox"
                          }
                        />
                      </>
                      <div className="errorMessage">
                        <ErrorMessage name="accountId" />
                      </div>
                    </div>
                    <div className="formControl">
                      <>
                        <Styledlabel htmlFor="password">Password</Styledlabel>
                        <Field
                          name="password"
                          type="password"
                          autoComplete="off"
                          className={
                            errors &&
                            errors.password &&
                            touched &&
                            touched.password
                              ? "textBoxBorder"
                              : "defaultTextBox"
                          }
                        />
                      </>
                      <div className="errorMessage">
                        <ErrorMessage name="password" />
                      </div>
                    </div>

                    <div style={{ display: "flex", marginLeft: "300px" }}>
                      <PrimaryButton
                        type="reset"
                        style={{
                          width: "40%",
                          marginRight: "100px",
                          marginTop: "20px",
                        }}
                      >
                        Verify & Add
                      </PrimaryButton>
                      <PrimaryButton
                        type="submit"
                        onClick={() => {
                          if (!isEmpty(errors)) {
                            toast.error(
                              "Please fill all red alert fields to continue",
                              { containerId: "bankAccts" }
                            );
                          }
                        }}
                        style={{ width: "40%", marginTop: "20px" }}
                      >
                        Add account
                      </PrimaryButton>
                    </div>

                    <ToastContainer
                      enableMultiContainer
                      containerId={"bankAccts"}
                      className="toastContainer"
                      toastClassName="toastBody"
                      hideProgressBar={true}
                    />
                  </Form>
                </>
              )}
            </>
          )}
        />

        {props.bankAccountsData.saved && !props.bankAccountsData.showBankForm && (
          <div style={{ textAlign: "left", marginTop: "70px" }}>
            <button
              className="addMoreAcc"
              style={{ color: "blue" }}
              onClick={props.openBankForm}
            >
              +Add more bank accounts
            </button>
          </div>
        )}
      </div>
    </div>
  );
  //}
};

export default React.memo(BankAccounts);
