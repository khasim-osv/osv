import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../../utils/Yup.validation";
import { Styledlabel } from "./Translations.styled-component";
import "./Translations.scss";

import {
  PrimaryButton,
  SecondaryButton,
} from "../../../common/styled-components";
import {
  ITranslationDetails,
  ITranslationData,
  columns,
  IState,
  IRow,
  translationType,
} from "./Translation.actionTypes";
import Datatable from "../../../common/datatable/Datatable.component";
import Popup from "reactjs-popup";
import { toast, ToastContainer } from "react-toastify";
import Search, { ISearchKey } from "../../../common/search/search.component";

export interface IProps {
  getTranslationData: (
    searchKey?: ISearchKey,
    page?: number,
    pageSize?: number
  ) => void;
  updateTranslationData: (data: ITranslationDetails) => void;
  deleteTranslationData: (deleteId: string) => void;
  getTranslations: ITranslationData;
  editTranslation: ITranslationData;
  popupEditClose: () => void;
  deleteTranslation: ITranslationData;
  popupDeleteClose: () => void;
  translationDataChanged: (data: ITranslationData) => void;
}

const Translations = (props: IProps) => {
  const [state, setState] = useState({
    IsEditOpen: false,
    IsDeleteOpen: false,
    selectedRow: {},
    deleteId: "",
    pageSize: 3,
    initialPageSize: 3,
    searchResults: undefined,
  } as IState);

  useEffect(() => {
    props.getTranslationData(undefined, 1, state.pageSize);
  }, []);

  let listItem: ITranslationDetails[] = [],
    columnsList: columns[] = [];
  if (props.getTranslations && props.getTranslations.data) {
    Array.isArray(props.getTranslations.data) &&
      props.getTranslations.data.forEach((item: ITranslationDetails) => {
        listItem.push({
          _id: item._id,
          key: item.key,
          english: item.value.english,
          arabic: item.value.arabic,
          value: {
            english: item.value.english,
            arabic: item.value.arabic,
          },
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
        Header: "English",
        accessor: "english",
      },
      {
        Header: "Arabic",
        accessor: "arabic",
      },

      {
        Header: "Modified by",
        accessor: "modifiedBy",
      },
      {
        Header: "Modified date",
        accessor: "modifiedDate",
      },
    ];
  }

  const editModalToggle = (row?: IRow) => {
    let selectedrow = row ? row : { original: translationType };
    setState({
      ...state,
      IsEditOpen: !state.IsEditOpen,
      selectedRow: selectedrow,
    });
  };

  const deleteModalToggle = (row?: IRow) => {
    let selectedid = row ? row.original && row.original._id : null;
    setState({
      ...state,
      IsDeleteOpen: !state.IsDeleteOpen,
      deleteId: selectedid ? selectedid : "",
    });
  };

  if (
    props.editTranslation &&
    props.editTranslation.success &&
    state.IsEditOpen
  ) {
    editModalToggle();
    setTimeout(() => {
      props.translationDataChanged({
        ...props.editTranslation,
        operation: "Edit",
      });
      props.popupEditClose();
      toast.success(
        !Array.isArray(props.editTranslation.data) &&
          '"' +
            props.editTranslation.data.key +
            '"' +
            " translation has been edited"
      );
    }, 0);
  }

  if (
    props.deleteTranslation &&
    props.deleteTranslation.success &&
    state.IsDeleteOpen
  ) {
    deleteModalToggle();
    setTimeout(() => {
      props.translationDataChanged({
        ...props.deleteTranslation,
        operation: "Delete",
      });
      props.popupDeleteClose();
      toast.info(
        !Array.isArray(props.deleteTranslation.data) &&
          '"' +
            props.deleteTranslation.data.key +
            '"' +
            " translation has been deleted"
      );
    }, 0);
  }

  return (
    <div>
      <div className="isFlex">
        <div className="title">English &amp; Arabic Translations</div>
        <Search
          formSubmit={(values: ISearchKey) => {
            setState({
              ...state,
              pageSize: state.initialPageSize,
              searchResults: values.search,
            });
            props.getTranslationData(values, 1, state.initialPageSize);
          }}
          resetSearch={() => {
            if (state.searchResults) {
              setState({
                ...state,
                pageSize: state.initialPageSize,
                searchResults: undefined,
              });
              props.getTranslationData(undefined, 1, state.initialPageSize);
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
            props.getTranslations.totalRecords
              ? props.getTranslations.totalRecords
              : 0
          }
          onPaginationChange={(page: number, pageSize?: number) => {
            pageSize && setState({ ...state, pageSize: pageSize });
            props.getTranslationData(
              state.searchResults ? { search: state.searchResults } : undefined,
              page,
              pageSize ? pageSize : state.pageSize
            );
          }}
          isSearch={state.searchResults}
          editModal={(row: IRow) => editModalToggle(row)}
          deleteModal={(row: IRow) => deleteModalToggle(row)}
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
          <div className="editTitle">Edit translations</div>
          <Formik
            initialValues={state.selectedRow && state.selectedRow.original}
            validationSchema={yupSchema.TranslationForm}
            onSubmit={(values: ITranslationDetails, { setSubmitting }) => {
              values.value = {
                english: values.english,
                arabic: values.arabic,
              };
              props.updateTranslationData(values);
              setSubmitting(false);
            }}
          >
            <Form className="formMargin">
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
              <div className="errorMessage">
                {props.editTranslation.message}
              </div>
              <PrimaryButton type="submit" className="saveBtn">
                Save
              </PrimaryButton>
            </Form>
          </Formik>
        </div>
      </Popup>
      <Popup
        closeOnDocumentClick={false}
        open={state.IsDeleteOpen}
        closeOnEscape={false}
      >
        <div className="modal">
          <div
            className="icon-Close-outline-button close"
            onClick={() => deleteModalToggle()}
          ></div>

          <div>Are you sure to delete?</div>
          <div className="isFlex">
            <PrimaryButton
              type="submit"
              onClick={() => props.deleteTranslationData(state.deleteId)}
            >
              Confirm
            </PrimaryButton>
            <SecondaryButton type="submit" onClick={() => deleteModalToggle()}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Translations;
