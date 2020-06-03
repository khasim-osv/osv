import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import Pagination from "./Pagination.component";
import "react-table/react-table.css";

export interface IProps {
  listItem: any;
  filterable: boolean;
  columns: any;
  pageSize?: number;
  totalRecords?: number;
  editModal?: (row: any) => void;
  deleteModal?: (row: any) => void;
  onPaginationChange?: (page: number, pageSize?: number) => void;
  initialPageSize?: number;
  changePage?: (page: number) => void;
  activePage?: number;
  isSearch?: string | undefined;
  disableRecord?: (row: any) => void;
}

const NoRecordFound = () => {
  return <div className="noRecordFound">No records found</div>;
};

const Datatable = (props: IProps) => {
  const {
    listItem,
    filterable,
    columns,
    editModal,
    deleteModal,
    disableRecord,
  } = props;
  const dataTableState = {
    filtered: [],
    pageSize: props.pageSize,
    totalRecords: props.totalRecords,
    activePage: 1,
    columnsInitialCount: columns.length,
  };
  const [state, setState] = useState(dataTableState as any);

  useEffect(() => {
    setState({ ...state, activePage: 1, pageSize: props.initialPageSize });
  }, [props.isSearch]);

  if (columns.length > 0 && state.columnsInitialCount === columns.length) {
    editModal &&
      columns.push({
        Header: "Edit",
        filterable: false,
        Cell: (row: any) => (
          <div
            className={
              row.original.isActive === false
                ? "icon-Edit disabledClass"
                : "icon-Edit"
            }
            onClick={() => editModal(row)}
          ></div>
        ),
      });
    deleteModal &&
      columns.push({
        Header: "Delete",
        filterable: false,
        Cell: (row: any) => (
          <div className="icon-trash" onClick={() => deleteModal(row)}></div>
        ),
      });
    disableRecord &&
      columns.push({
        Header: "Disable",
        filterable: false,
        Cell: (row: any) => (
          <div
            onClick={() => disableRecord(row)}
            className={
              row.original.isActive === false
                ? "icon-Disabled"
                : "icon-Disabled enabledClass"
            }
          ></div>
        ),
      });
  }

  const onFilteredChangeCustom = (value: any, accessor: any) => {
    let insertNewFilter = 1;
    if (state.filtered.length) {
      state.filtered.forEach((filter: any, i: any) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) state.filtered.splice(i, 1);
          else filter["value"] = value;
          insertNewFilter = 0;
        }
      });
    }
    if (insertNewFilter) {
      state.filtered.push({ id: accessor, value: value });
    }
    setState({ ...state, filtered: state.filtered });
  };

  const onDefaultFilterMethod = (filter: any, row: any, column: any) => {
    const id = filter.pivotId || filter.id;
    if (typeof filter.value === "object") {
      return row[id] !== undefined ? filter.value.indexOf(row[id]) > -1 : true;
    } else {
      return row[id] !== undefined
        ? String(row[id]).indexOf(filter.value) > -1
        : true;
    }
  };

  const changePageSize = (pagesize: number) => {
    setState({ ...state, pageSize: pagesize });
  };

  const changePage = (page: number) => {
    setState({ ...state, activePage: page });
  };

  const customProps = {
    customPageSize: (pageSize: number) => changePageSize(pageSize),
    totalRecords: props.totalRecords,
    onPaginationChange: props.onPaginationChange,
    initialPageSize: props.initialPageSize,
    changePage: (page: number) => changePage(page),
    activePage: state.activePage,
  };

  let totalPages =
    props.totalRecords && props.pageSize && props.totalRecords / props.pageSize;
  totalPages && totalPages % 1 !== 0 && (totalPages = Math.ceil(totalPages));

  return (
    <ReactTable
      getTrProps={({}, rowInfo: any) => {
        return {
          style: {
            background:
              rowInfo && rowInfo.index % 2 === 0 ? "#f3f5fd" : "#ffffff",
            fontFamily: "Avenir-Roman",
            height: "40px",
            fontSize: "16px",
            color: "#384150",
          },
        };
      }}
      getTheadThProps={() => {
        return {
          style: {
            background: "#dbe1e9",
            height: "40px",
            fontFamily: "Avenir-Medium",
            fontSize: "18px",
            fontWeight: "500",
            color: "#000001",
            textAlign: "left",
          },
        };
      }}
      PaginationComponent={Pagination}
      data={listItem}
      filterable={filterable}
      onFilteredChange={(filtered, column, value) => {
        onFilteredChangeCustom(value, column.id || column.accessor);
      }}
      defaultFilterMethod={(filter, row, column) => {
        return onDefaultFilterMethod(filter, row, column);
      }}
      columns={columns}
      defaultPageSize={props.pageSize}
      pageSize={
        props.totalRecords && state.pageSize >= props.totalRecords
          ? props.totalRecords
          : state.pageSize
      }
      pages={totalPages}
      getPaginationProps={() => customProps}
      NoDataComponent={NoRecordFound}
      className="-striped -highlight"
    />
  );
};

export default Datatable;
