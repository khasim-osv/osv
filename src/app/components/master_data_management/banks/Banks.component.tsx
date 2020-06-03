import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "./Banks.styled-component";
import "./Banks.scss";
import { yupSchema } from "../../../utils/Yup.validation";
import { toast, ToastContainer } from "react-toastify";
import Search, { ISearchKey } from "../../../common/search/search.component";
import {
  IBanksDetails,
  IBanksData,
  columns,
  IState,
  IRow,
  banksType,
} from "./Banks.actionTypes";
import {
  PrimaryButton,
  SecondaryButton,
  SearchButton,
} from "../../../common/styled-components";
import Datatable from "../../../common/datatable/Datatable.component";
import Popup from "reactjs-popup";
import { updateBanksData } from "./Banks.saga";

export interface IProps {
  getBanksData: (
    searchKey?: ISearchKey,
    page?: number,
    pageSize?: number
  ) => void;
  updateBanksData: (data: IBanksDetails) => void;
  getBanks: IBanksData;
  editBanks: IBanksData;
  popupEditClose: () => void;
  banksDataChanged: (data: IBanksData) => void;
}
export const SuccessMessage = () => {
  return <div>Success message</div>;
};
const Banks = (props: IProps) => {
  const [state, setState] = useState({
    IsEditOpen: false,
    selectedRow: {},
    pageSize: 3,
    initialPageSize: 3,
    searchResults: undefined,
  } as IState);
  useEffect(() => {
    props.getBanksData(undefined, 1, state.pageSize);
  }, []);

  let listItem: IBanksDetails[] = [],
    columnsList: columns[] = [];

  if (props.getBanks && props.getBanks.data) {
    Array.isArray(props.getBanks.data) &&
      props.getBanks.data.forEach((item: IBanksDetails) => {
        listItem.push({
          _id: item._id,
          logo: item.logo,
          bank: item.bank,
          url: item.url,
          type: item.type,
          isActive: item.isActive,
        });
      });

    columnsList = [
      {
        Header: "",
        accessor: "logo",
        Cell: (row: IRow) => {
          return (
            <div>
              <img alt="logo" height={25} src={row.original.logo} />
            </div>
          );
        },
      },
      {
        Header: "Bank",
        accessor: "bank",
      },

      {
        Header: "URL",
        accessor: "url",
      },
      {
        Header: "Type",
        accessor: "type",
      },
    ];
  }

  const editModalToggle = (row?: IRow) => {
    let selectedrow = row ? row : { original: banksType };
    setState({
      ...state,
      IsEditOpen: !state.IsEditOpen,
      selectedRow: selectedrow,
    });
  };

  const disableBanks = (row: IRow) => {
    row.original.isActive = !row.original.isActive;
    props.updateBanksData(row.original);
  };
  if (props.editBanks && props.editBanks.success && !state.IsEditOpen) {
    setTimeout(() => {
      props.banksDataChanged({
        ...props.editBanks,
        operation: "Edit",
      });
      props.popupEditClose();
      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.editBanks.data) &&
            '"' +
              props.editBanks.data.bank +
              '"' +
              " Bank has been " +
              `${props.editBanks.data.isActive ? "enabled" : "disabled"}`,
          { toastId: "disabledRecord" }
        );
    }, 0);
  }

  if (props.editBanks && props.editBanks.success && state.IsEditOpen) {
    editModalToggle();
    setTimeout(() => {
      props.banksDataChanged({
        ...props.editBanks,
        operation: "Edit",
      });
      props.popupEditClose();
      toast.success(
        !Array.isArray(props.editBanks.data) &&
          '"' + props.editBanks.data.bank + '"' + " profile has been edited",
        { toastId: "disabledRecord" }
      );
    }, 0);
  }

  return (
    <div>
      <div className="isFlex">
        <div className="title">All banks</div>
        <Search
          formSubmit={(values: ISearchKey) => {
            setState({
              ...state,
              pageSize: state.initialPageSize,
              searchResults: values.search,
            });
            props.getBanksData(values, 1, state.initialPageSize);
          }}
          resetSearch={() => {
            if (state.searchResults) {
              setState({
                ...state,
                pageSize: state.initialPageSize,
                searchResults: undefined,
              });
              props.getBanksData(undefined, 1, state.initialPageSize);
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
            props.getBanks.totalRecords ? props.getBanks.totalRecords : 0
          }
          onPaginationChange={(page: number, pageSize?: number) => {
            pageSize && setState({ ...state, pageSize: pageSize });
            props.getBanksData(
              state.searchResults ? { search: state.searchResults } : undefined,
              page,
              pageSize ? pageSize : state.pageSize
            );
          }}
          isSearch={state.searchResults}
          editModal={(row: IRow) => editModalToggle(row)}
          disableRecord={(row: IRow) => disableBanks(row)}
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
          <div className="editTitle">Edit bank</div>
          <Formik
            initialValues={state.selectedRow && state.selectedRow.original}
            validationSchema={yupSchema.BanksForm}
            onSubmit={(values, { setSubmitting }) => {
              props.updateBanksData(values);
              setSubmitting(false);
            }}
          >
            <Form className="formMargin">
              <div className="formControl">
                <Styledlabel htmlFor="bank">Bank</Styledlabel>
                <Field name="bank" component="textarea" />
                <div className="errorMessage">
                  <ErrorMessage name="bank" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="url">URL</Styledlabel>
                <Field name="url" component="textarea" />
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
                  <input name="bank" type="file" />
                </label>
                <div className="errorMessage">
                  <ErrorMessage name="logo" />
                </div>
              </div>
              <div className="errorMessage">{props.editBanks.message}</div>

              <PrimaryButton type="submit">Save</PrimaryButton>
            </Form>
          </Formik>
        </div>
      </Popup>
    </div>
  );
};

export default Banks;
