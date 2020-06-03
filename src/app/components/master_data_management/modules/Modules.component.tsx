import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Styledlabel } from "../MasterDataManagement.styled-component";
import "./Modules.scss";
import { yupSchema } from "../../../utils/Yup.validation";
import { toast, ToastContainer } from "react-toastify";
import Search, { ISearchKey } from "../../../common/search/search.component";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../common/styled-components";
import Datatable from "../../../common/datatable/Datatable.component";
import Popup from "reactjs-popup";
import { Input } from "./Modules.styled-component";
import {
  IModulesDetails,
  IModulesData,
  columns,
  IState,
  CheckForTrue,
  IRow,
  modulesType,
} from "./Modules.actionTypes";
export interface IProps {
  getModulesData: (page?: number, pageSize?: number) => void;
  updateModuleData: (data: IModulesDetails) => void;
  getModules: IModulesData;
  editModule: IModulesData;
  popupEditClose: () => void;
  modulesDataChanged: (data: IModulesData) => void;
}
export const SuccessMessage = () => {
  return <div>Success message</div>;
};
const Modules = (props: IProps) => {
  const [state, setState] = useState({
    IsEditOpen: false,
    selectedRow: {},
    pageSize: 3,
    initialPageSize: 3,
    searchResults: undefined,
  } as IState);
  useEffect(() => {
    props.getModulesData(1, state.pageSize);
  }, []);

  let listItem: IModulesDetails[] = [],
    columnsList: columns[] = [];

  if (props.getModules && props.getModules.data) {
    Array.isArray(props.getModules.data) &&
      props.getModules.data.forEach((item: IModulesDetails) => {
        listItem.push({
          _id: item._id,
          isActive: item.isActive,
          moduleName: item.moduleName,
          Web: item.Web,
          Mobile: item.Mobile,
          App: item.App,
          APIs: item.APIs,
        });
      });
    columnsList = [
      {
        Header: "Module",
        accessor: "moduleName",
        headerStyle: { textAlign: "left" },
      },
      {
        Header: "Web",
        accessor: "",
        headerStyle: { textAlign: "left" },
        Cell: (props: IRow) => {
          var opts: any = {};
          if (props.original.Web) {
            opts.checked = "checked";
          }
          opts.disabled = "disabled";
          return <Input id="input" type="checkbox" {...opts}></Input>;
        },
      },
      {
        Header: "Mobile",
        headerStyle: { textAlign: "left" },
        accessor: "",
        Cell: (props: IRow) => {
          var opts: any = {};
          if (props.original.Mobile) {
            opts["checked"] = "checked";
          }
          opts["disabled"] = "disabled";
          return <Input id="input" type="checkbox" {...opts}></Input>;
        },
      },
      {
        Header: "App",
        accessor: "",
        headerStyle: { textAlign: "left" },
        Cell: (props: IRow) => {
          var opts: any = {};
          if (props.original.App) {
            opts["checked"] = "checked";
          }
          opts["disabled"] = "disabled";
          return <Input id="input" type="checkbox" {...opts}></Input>;
        },
      },
      {
        Header: "APIs",
        accessor: "",
        headerStyle: { textAlign: "left" },
        Cell: (props: IRow) => {
          var opts: any = {};
          if (props.original.APIs) {
            opts["checked"] = "checked";
          }
          opts["disabled"] = "disabled";
          return <Input id="input" type="checkbox" {...opts}></Input>;
        },
      },
    ];
  }
  const disableModule = (row: IRow) => {
    row.original.isActive = !row.original.isActive;
    props.updateModuleData(row.original);
  };
  const editModalToggle = (row?: IRow) => {
    console.log(row, "row");
    let selectedrow = row ? row : { original: modulesType };

    setState({
      ...state,
      IsEditOpen: !state.IsEditOpen,
      selectedRow: selectedrow,
    });
  };

  if (props.editModule && props.editModule.success && !state.IsEditOpen) {
    setTimeout(() => {
      props.modulesDataChanged({
        ...props.editModule,
        operation: "Edit",
      });
      props.popupEditClose();
      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.editModule.data) &&
            '"' +
              props.editModule.data.moduleName +
              '"' +
              " Module has been " +
              `${props.editModule.data.isActive ? "enabled" : "disabled"}`,
          { toastId: "disabledRecord" }
        );
    }, 0);
  }

  if (props.editModule && props.editModule.success && state.IsEditOpen) {
    editModalToggle();
    setTimeout(() => {
      props.modulesDataChanged({
        ...props.editModule,
        operation: "Edit",
      });
      props.popupEditClose();
      toast.success(
        !Array.isArray(props.editModule.data) &&
          '"' +
            props.editModule.data.moduleName +
            '"' +
            " Module has been edited",
        { toastId: "disabledRecord" }
      );
    }, 0);
  }

  return (
    <div>
      <div className="isFlex">
        <div>
          <h2>All modules</h2>
          View modules or change existing
        </div>
      </div>
      <div>
        <Datatable
          listItem={listItem}
          columns={columnsList}
          filterable={false}
          pageSize={state.pageSize}
          initialPageSize={state.initialPageSize}
          totalRecords={
            props.getModules.totalRecords ? props.getModules.totalRecords : 0
          }
          onPaginationChange={(page: number, pageSize?: number) => {
            pageSize && setState({ ...state, pageSize: pageSize });
            props.getModulesData(page, pageSize ? pageSize : state.pageSize);
          }}
          editModal={(row: IRow) => editModalToggle(row)}
          disableRecord={(row: IRow) => disableModule(row)}
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
          <div className="editTitle">Edit Module</div>
          <Formik
            initialValues={state.selectedRow && state.selectedRow.original}
            validationSchema={yupSchema.ModulesForm}
            onSubmit={(values, { setSubmitting }) => {
              props.updateModuleData(values);
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="formControl">
                <Styledlabel htmlFor="moduleName">Name</Styledlabel>
                <Field name="moduleName" type="text" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="moduleName" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="web">Web</Styledlabel>
                <Field name="Web" type="checkbox" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="Web" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="Mobile">Mobile</Styledlabel>
                <Field name="Mobile" type="checkbox" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="Mobile" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="App">App</Styledlabel>
                <Field name="App" type="checkbox" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="App" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="APIs">APIs</Styledlabel>
                <Field name="APIs" type="checkbox" autoComplete="off" />
                <div className="errorMessage">
                  <ErrorMessage name="APIs" />
                </div>
              </div>
              {props.editModule && props.editModule.success === false && (
                <div className="errorMessage">
                  Something wrong with the API...!
                </div>
              )}
              <PrimaryButton type="submit">Save</PrimaryButton>
            </Form>
          </Formik>
        </div>
      </Popup>
    </div>
  );
};

export default Modules;
