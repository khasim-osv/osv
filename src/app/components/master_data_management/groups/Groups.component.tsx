import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Styledlabel } from "./Groups.styled-component";
import "./Groups.scss";
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
  IGroupsDetails,
  IGroupsData,
  columns,
  IState,
  IRow,
  groupsType,
} from "./Groups.actionTypes";
export interface IProps {
  getGroupsData: (
    searchKey?: ISearchKey,
    page?: number,
    pageSize?: number
  ) => void;
  updateGroupsData: (data: IGroupsDetails) => void;
  getGroups: IGroupsData;
  editGroups: IGroupsData;
  popupEditClose: () => void;
  groupsDataChanged: (data: IGroupsData) => void;
}
export const SuccessMessage = () => {
  return <div>Success message</div>;
};
const Groups = (props: IProps) => {
  const [state, setState] = useState({
    IsEditOpen: false,
    selectedRow: {},
    pageSize: 3,
    initialPageSize: 3,
    searchResults: undefined,
  } as IState);
  useEffect(() => {
    props.getGroupsData(undefined, 1, state.pageSize);
  }, []);

  let listItem: IGroupsDetails[] = [],
    columnsList: columns[] = [];

  if (props.getGroups && props.getGroups.data) {
    Array.isArray(props.getGroups.data) &&
      props.getGroups.data.forEach((item: IGroupsDetails) => {
        listItem.push({
          _id: item._id,
          english: item.value ? item.value.english : "",
          arabic: item.value ? item.value.arabic : "",
          isActive: item.isActive,
          value: {
            english: item.value ? item.value.english : "",
            arabic: item.value ? item.value.arabic : "",
          },
        });
      });

    columnsList = [
      {
        Header: "English name",
        accessor: "english",
      },
      {
        Header: "Arabic name",
        accessor: "arabic",
      },
    ];
  }

  const editModalToggle = (row?: IRow) => {
    let selectedrow = row ? row : { original: groupsType };

    setState({
      ...state,
      IsEditOpen: !state.IsEditOpen,
      selectedRow: selectedrow,
    });
  };
  const disableGroups = (row: IRow) => {
    row.original.isActive = !row.original.isActive;
    props.updateGroupsData(row.original);
  };

  if (props.editGroups && props.editGroups.success && !state.IsEditOpen) {
    setTimeout(() => {
      props.groupsDataChanged({
        ...props.editGroups,
        operation: "Edit",
      });
      props.popupEditClose();
      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.editGroups.data) &&
            '"' +
              props.editGroups.data.english +
              '"' +
              " Group has been " +
              `${props.editGroups.data.isActive ? "enabled" : "disabled"}`,
          { toastId: "disabledRecord" }
        );
    }, 0);
  }

  if (props.editGroups && props.editGroups.success && state.IsEditOpen) {
    editModalToggle();
    setTimeout(() => {
      props.groupsDataChanged({
        ...props.editGroups,
        operation: "Edit",
      });
      props.popupEditClose();
      toast.success(
        !Array.isArray(props.editGroups.data) &&
          '"' +
            props.editGroups.data.english +
            '"' +
            " profile has been edited",
        { toastId: "disabledRecord" }
      );
    }, 0);
  }

  return (
    <div>
      <div className="isFlex">
        <div className="title">All groups</div>
        <Search
          formSubmit={(values: ISearchKey) => {
            setState({
              ...state,
              pageSize: state.initialPageSize,
              searchResults: values.search,
            });
            props.getGroupsData(values, 1, state.initialPageSize);
          }}
          resetSearch={() => {
            if (state.searchResults) {
              setState({
                ...state,
                pageSize: state.initialPageSize,
                searchResults: undefined,
              });
              props.getGroupsData(undefined, 1, state.initialPageSize);
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
            props.getGroups.totalRecords ? props.getGroups.totalRecords : 0
          }
          onPaginationChange={(page: number, pageSize?: number) => {
            pageSize && setState({ ...state, pageSize: pageSize });
            props.getGroupsData(
              state.searchResults ? { search: state.searchResults } : undefined,
              page,
              pageSize ? pageSize : state.pageSize
            );
          }}
          isSearch={state.searchResults}
          editModal={(row: IRow) => editModalToggle(row)}
          disableRecord={(row: IRow) => disableGroups(row)}
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
          <div className="editTitle">Edit Groups</div>
          <Formik
            initialValues={state.selectedRow && state.selectedRow.original}
            validationSchema={yupSchema.GroupsForm}
            onSubmit={(values, { setSubmitting }) => {
              values.value = {
                english: values.english,
                arabic: values.arabic,
              };
              props.updateGroupsData(values);
              setSubmitting(false);
            }}
          >
            <Form className="formMargin">
              <div className="formControl">
                <Styledlabel htmlFor="english">English Name</Styledlabel>
                <Field name="english" component="textarea" />
                <div className="errorMessage">
                  <ErrorMessage name="english" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="arabic">الاسم العربي</Styledlabel>
                <Field name="arabic" component="textarea" />
                <div className="errorMessage">
                  <ErrorMessage name="arabic" />
                </div>
              </div>
              <div className="errorMessage">{props.editGroups.message}</div>

              <PrimaryButton type="submit">Save</PrimaryButton>
            </Form>
          </Formik>
        </div>
      </Popup>
    </div>
  );
};

export default Groups;
