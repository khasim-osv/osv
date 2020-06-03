import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel, PrimaryButton } from "../../../common/styled-components";
import Select from "react-select";
import isEmpty from "lodash.isempty";
import { toast, ToastContainer } from "react-toastify";
import { yupSchema } from "../../../utils/Yup.validation";
import {
  ILicensesMaster,
  IGroupsMaster,
  ICompanyInfoState,
  ICompanyInfoSelectField,
  ICompanyInfo,
  CONST_BUSINESS_TYPES,
  CONST_ERP_TYPES,
  defaultCompanyInfoState,
} from "./CreateUserProfile.actionTypes";
export interface IProps {
  //pageData: IPageData;
  licenses: ILicensesMaster;
  groups: IGroupsMaster;
  saveCompanyInfo: (values: ICompanyInfo) => void;
  companyInfoData: ICompanyInfoState;
  makeCompanyInfoEditable: () => void;
}

//class CompanyInfo extends React.PureComponent<IProps> {
const CompanyInfo = (props: IProps) => {
  if (!props.companyInfoData.load && props.companyInfoData.saved === false) {
    toast.error("Something wrong with the API...!", {
      containerId: "companyInfo",
    });
  }
  if (!props.companyInfoData.load && props.companyInfoData.saved === true) {
    toast.success("Company Info successfully saved", {
      containerId: "companyInfo",
    });
    // props.history.replaceState({}, null, '/hello');
    if (
      props.companyInfoData._id &&
      window &&
      window.location.href.indexOf(props.companyInfoData._id) === -1
    ) {
      window.history.replaceState(
        {},
        //   null,
        "",
        `addUser/${props.companyInfoData._id}`
      );
    }
  }

  //render() {

  return (
    <div className="isFlex">
      <div className="modal">
        {!props.companyInfoData.editState && (
          <div style={{ textAlign: "right" }}>
            <button
              className="editBtn link"
              //href="javascript:void(0)"
              onClick={props.makeCompanyInfoEditable}
            >
              Edit
            </button>
          </div>
        )}
        <div className="editTitle">Company Info</div>
        <span>
          This is the information we use for all your single view products
        </span>
        <Formik
          initialValues={{
            ...props.companyInfoData,
            /* companyName: props.companyInfoData.company
              ? props.companyInfoData.company.english
              : "",
            companyNameAr: props.companyInfoData.company
              ? props.companyInfoData.company.arabic
              : "", */
          }}
          enableReinitialize
          validationSchema={yupSchema.companyInfoForm}
          onSubmit={(values: ICompanyInfo, { setSubmitting }) => {
            values.company = {
              english: values.companyName,
              arabic: values.companyNameAr,
            };

            props.saveCompanyInfo(values);
            setSubmitting(false);
          }}
          render={({ errors, values, resetForm, setFieldValue, touched }) => (
            <Form>
              <div style={{ display: "flex" }}>
                <div className="formControl">
                  <Styledlabel htmlFor="companyName">Name</Styledlabel>
                  {!props.companyInfoData.editState &&
                    props.companyInfoData.companyName}
                  {props.companyInfoData.editState && (
                    <Field
                      name="companyName"
                      type="text"
                      autoComplete="off"
                      className={
                        errors &&
                        errors.companyName &&
                        touched &&
                        touched.companyName
                          ? "textBoxBorder"
                          : "defaultTextBox"
                      }
                    />
                  )}
                  <div className="errorMessage">
                    <ErrorMessage name="companyName" />
                  </div>
                </div>
                <div className="formControl">
                  <Styledlabel
                    htmlFor="companyNameAr"
                    style={{ textAlign: "right" }}
                  >
                    عربى
                  </Styledlabel>
                  {!props.companyInfoData.editState && (
                    <span style={{ marginLeft: "200px" }}>
                      {props.companyInfoData.companyNameAr}
                    </span>
                  )}
                  {props.companyInfoData.editState && (
                    <Field
                      name="companyNameAr"
                      dir="rtl"
                      type="text"
                      autoComplete="off"
                      style={{ marginLeft: "20px" }}
                      className={
                        errors &&
                        errors.companyNameAr &&
                        touched &&
                        touched.companyNameAr
                          ? "textBoxBorder"
                          : "defaultTextBox"
                      }
                    />
                  )}
                  <div className="errorMessage">
                    <ErrorMessage name="companyNameAr" />
                  </div>
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="groupId ">Group</Styledlabel>
                {!props.companyInfoData.editState && (
                  <span style={{ color: "blue" }}>
                    {" "}
                    {!isEmpty(props.companyInfoData.groupId) &&
                    !isEmpty(props.groups)
                      ? //   ? props.groups[props.companyInfoData.groupId].groupName
                        props.companyInfoData.groupId.groupName
                      : "Add group of company(Optional)"}{" "}
                  </span>
                )}
                {props.companyInfoData.editState && (
                  <Select
                    className="reactSelect"
                    options={Object.values(props.groups)}
                    name="groupId"
                    /* value={
                      props.groups &&
                      props.groups[props.companyInfoData.groupId]
                    } */
                    /* onChange={(selectedOption: any) => {
                      setFieldValue("groupId", selectedOption.value);
                      console.log("values", values);
                      props.updateSelectFieldCompanyInfo({
                        ...values,
                        groupId: selectedOption.value,
                      });
                    }} */
                    value={values.groupId}
                    onChange={(selectedOption: any) => {
                      setFieldValue("groupId", selectedOption);
                    }}
                  />
                )}
              </div>

              <div className="formControl">
                <Styledlabel htmlFor="address">Address</Styledlabel>
                {!props.companyInfoData.editState && (
                  <span style={{ color: "blue" }}>
                    {" "}
                    {props.companyInfoData.address
                      ? props.companyInfoData.address
                      : "Add address(Optional)"}{" "}
                  </span>
                )}
                {props.companyInfoData.editState && (
                  <Field
                    name="address"
                    type="text"
                    autoComplete="off"
                    placeholder="Optional"
                  />
                )}
                <div className="errorMessage">
                  <ErrorMessage name="address" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="businessType ">Business Type</Styledlabel>
                {!props.companyInfoData.editState && (
                  <span style={{ color: "blue" }}>
                    {" "}
                    {props.companyInfoData.businessType
                      ? props.companyInfoData.businessType.value
                      : "Add business type(Optional)"}{" "}
                  </span>
                )}
                {props.companyInfoData.editState && (
                  <Select
                    className="reactSelect"
                    options={CONST_BUSINESS_TYPES}
                    name="businessType"
                    /* value={CONST_BUSINESS_TYPES.find(
                      (business) =>
                        business.value === props.companyInfoData.businessType
                    )}
                    onChange={(selectedOption: any) => {
                      setFieldValue("businessType", selectedOption.value);
                    }} */
                    value={values.businessType}
                    onChange={(selectedOption: any) => {
                      setFieldValue("businessType", selectedOption);
                    }}
                  />
                )}
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="licenceTypeId">License Type</Styledlabel>
                {!props.companyInfoData.editState && (
                  <span style={{ color: "blue" }}>
                    {" "}
                    {!isEmpty(props.companyInfoData.licenceTypeId)
                      ? props.companyInfoData.licenceTypeId.licenseName
                      : "Add License(Optional)"}{" "}
                  </span>
                )}
                {props.companyInfoData.editState && (
                  <Select
                    className="reactSelect"
                    options={Object.values(props.licenses)}
                    name="licenceTypeId"
                    /* value={
                      props.licenses &&
                      props.licenses[props.companyInfoData.licenceTypeId]
                    }
                    onChange={(selectedOption: any) => {
                      setFieldValue("licenceTypeId", selectedOption.value);
                      props.updateSelectFieldCompanyInfo({
                        selectId: "licenceTypeId",
                        value: selectedOption.value,
                      });
                    }} */
                    value={values.licenceTypeId}
                    onChange={(selectedOption: any) => {
                      setFieldValue("licenceTypeId", selectedOption);
                    }}
                  />
                )}
                <div className="errorMessage">
                  <ErrorMessage name="licenceTypeId" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="erpService ">ERP</Styledlabel>
                {!props.companyInfoData.editState && (
                  <span style={{ color: "blue" }}>
                    {" "}
                    {props.companyInfoData.erpService
                      ? props.companyInfoData.erpService.value
                      : "Add ERP service type(Optional)"}
                  </span>
                )}
                {props.companyInfoData.editState && (
                  <Select
                    className="reactSelect"
                    options={CONST_ERP_TYPES}
                    name="erpService"
                    /* value={CONST_ERP_TYPES.find(
                      (erp) => erp.value === props.companyInfoData.erpService
                    )}
                    onChange={(selectedOption: any) => {
                      setFieldValue("erpService", selectedOption.value);
                      props.updateSelectFieldCompanyInfo({
                        selectId: "erpService",
                        value: selectedOption.value,
                      });
                    }} */
                    value={values.erpService}
                    onChange={(selectedOption: any) => {
                      setFieldValue("erpService", selectedOption);
                    }}
                  />
                )}
              </div>

              {props.companyInfoData.editState && (
                <div style={{ display: "flex" }}>
                  <div style={{ width: "100%", marginLeft: "100px" }}> </div>
                  <PrimaryButton
                    //  type="reset"
                    type="button"
                    // onClick={() => resetForm(defaultCompanyInfoState)}
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
                          { containerId: "companyInfo" }
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
                containerId={"companyInfo"}
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
  //}
};

//export default CompanyInfo;
export default React.memo(CompanyInfo);
