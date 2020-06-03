import React, { useEffect, useState } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "./ErrorCodes.styled-component";
import "./ErrorCodes.scss";
import { yupSchema } from "../../../utils/Yup.validation";
import { toast, ToastContainer } from "react-toastify";
import Search, { ISearchKey } from "../../../common/search/search.component";

import {
  PrimaryButton,
  SecondaryButton,
  SearchButton,
} from "../../../common/styled-components";
import Datatable from "../../../common/datatable/Datatable.component";
import Popup from "reactjs-popup";
import {
  IErrorCodesDetails,
  IErrorCodesData,
  columns,
  IState,
  IRow,
  errorcodesType,
} from "./ErrorCodes.actionTypes";

export interface IProps {
  getErrorCodesData: (
    searchKey?: ISearchKey,
    page?: number,
    pageSize?: number
  ) => void;
  updateErrorCodesData: (data: IErrorCodesDetails) => void;
  getErrorCodes: IErrorCodesData;
  editErrorCode: IErrorCodesData;
  popupEditClose: () => void;
  errorCodesDataChanged: (data: IErrorCodesData) => void;
}
export const SuccessMessage = () => {
  return <div>Success message</div>;
};
const ErrorCodes = (props: IProps) => {
  const [state, setState] = useState({
    IsEditOpen: false,
    selectedRow: {},
    pageSize: 3,
    initialPageSize: 3,
    searchResults: undefined,
  } as IState);
  useEffect(() => {
    props.getErrorCodesData(undefined, 1, state.pageSize);
  }, []);

  let listItem: IErrorCodesDetails[] = [],
    columnsList: columns[] = [];
  if (props.getErrorCodes && props.getErrorCodes.data) {
    Array.isArray(props.getErrorCodes.data) &&
      props.getErrorCodes.data.forEach((item: IErrorCodesDetails) => {
        listItem.push({
          _id: item._id,
          errorcode: item.errorcode,
          key: item.key,
          english: item.value.english,
          arabic: item.value.arabic,
          value: {
            english: item.value.english,
            arabic: item.value.arabic,
          },
          isActive: item.isActive,
          modifiedBy: "khasim@onesingleview.com",
          modifiedDate: "14/04/2020",
        });
      });

    columnsList = [
      {
        Header: "Key",
        accessor: "key",
      },
      {
        Header: "Error code",
        accessor: "errorcode",
      },
      {
        Header: "English",
        accessor: "english",
      },
      {
        Header: "Arabic",
        accessor: "arabic",
      },
    ];
  }
  const disableErrorCode = (row: IRow) => {
    row.original.isActive = !row.original.isActive;
    props.updateErrorCodesData(row.original);
  };
  const editModalToggle = (row?: IRow) => {
    let selectedrow = row ? row : { original: errorcodesType };

    setState({
      ...state,
      IsEditOpen: !state.IsEditOpen,
      selectedRow: selectedrow,
    });
  };

  if (props.editErrorCode && props.editErrorCode.success && !state.IsEditOpen) {
    setTimeout(() => {
      props.errorCodesDataChanged({
        ...props.editErrorCode,
        operation: "Edit",
      });
      props.popupEditClose();
      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.editErrorCode.data) &&
            '"' +
              props.editErrorCode.data.errorcode +
              '"' +
              " Error Codes has been " +
              `${props.editErrorCode.data.isActive ? "enabled" : "disabled"}`,
          { toastId: "disabledRecord" }
        );
    }, 0);
  }

  if (props.editErrorCode && props.editErrorCode.success && state.IsEditOpen) {
    editModalToggle();
    setTimeout(() => {
      props.errorCodesDataChanged({
        ...props.editErrorCode,
        operation: "Edit",
      });
      props.popupEditClose();
      toast.success(
        !Array.isArray(props.editErrorCode.data) &&
          '"' +
            props.editErrorCode.data.english +
            '"' +
            " Error Code has been edited",
        { toastId: "disabledRecord" }
      );
    }, 0);
  }

  return (
    <div>
      <div className="isFlex">
        <div className="title">All error codes</div>
        <Search
          formSubmit={(values: ISearchKey) => {
            setState({
              ...state,
              pageSize: state.initialPageSize,
              searchResults: values.search,
            });
            props.getErrorCodesData(values, 1, state.initialPageSize);
          }}
          resetSearch={() => {
            if (state.searchResults) {
              setState({
                ...state,
                pageSize: state.initialPageSize,
                searchResults: undefined,
              });
              props.getErrorCodesData(undefined, 1, state.initialPageSize);
            }
          }}
        />
      </div>
      <div>
        <Datatable
          listItem={listItem}
          columns={columnsList}
          filterable={false}
          pageSize={state.pageSize}
          initialPageSize={state.initialPageSize}
          totalRecords={
            props.getErrorCodes.totalRecords
              ? props.getErrorCodes.totalRecords
              : 0
          }
          onPaginationChange={(page: number, pageSize?: number) => {
            pageSize && setState({ ...state, pageSize: pageSize });
            props.getErrorCodesData(
              state.searchResults ? { search: state.searchResults } : undefined,
              page,
              pageSize ? pageSize : state.pageSize
            );
          }}
          isSearch={state.searchResults}
          editModal={(row: IRow) => editModalToggle(row)}
          disableRecord={(row: IRow) => disableErrorCode(row)}
        />
        <ToastContainer
          className="toastContainer"
          toastClassName="toastBody"
          hideProgressBar={true}
        />
      </div>
      <Popup
        open={state.IsEditOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <div className="modal">
          <div
            className="icon-Close-outline-button close"
            onClick={() => editModalToggle()}
          ></div>
          <div className="editTitle">Edit error codes</div>
          <Formik
            initialValues={state.selectedRow && state.selectedRow.original}
            validationSchema={yupSchema.ErrorCodesForm}
            onSubmit={(values, { setSubmitting }) => {
              values.value = {
                english: values.english,
                arabic: values.arabic,
              };
              props.updateErrorCodesData(values);
              setSubmitting(false);
            }}
          >
            <Form className="formMargin">
              <div className="formControl">
                <Styledlabel htmlFor="key">Key</Styledlabel>
                <Field
                  name="key"
                  type="text"
                  autoComplete="off"
                  disabled={true}
                />
                <div className="errorMessage">
                  <ErrorMessage name="key" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="errorcode">Errorcode</Styledlabel>
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
                <Field name="arabic" component="textarea" />
                <div className="errorMessage">
                  <ErrorMessage name="arabic" />
                </div>
              </div>

              <PrimaryButton type="submit">Save</PrimaryButton>
            </Form>
          </Formik>
        </div>
      </Popup>
    </div>
  );
};

export default ErrorCodes;
