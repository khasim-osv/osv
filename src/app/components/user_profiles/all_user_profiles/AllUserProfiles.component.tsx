import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./AllUserProfiles.scss";
import {
  AllUserProfileDetails,
  AllUserProfileData,
  columns,
  IState,
  IRow,
  allUserProfileType,
  GetLicencesData,
} from "./AllUserProfiles.actionTypes";
import Datatable from "../../../common/datatable/Datatable.component";
import { toast, ToastContainer } from "react-toastify";
import Search, { ISearchKey } from "../../../common/search/search.component";
import SideNavbar from "../../../common/sidenavbar/SideNavbar.component";
import { Link } from "react-router-dom";

export interface IProps {
  getAllUserProfile: (
    searchKey?: ISearchKey,
    page?: number,
    pageSize?: number
  ) => void;
  updateUserProfile: (data: AllUserProfileDetails) => void;
  getAllUserProfileData: AllUserProfileData;
  editUserProfileData: AllUserProfileData;
  popupEditClose: () => void;
  userProfileDataChanged: (data: AllUserProfileData) => void;
  getLicences: () => void;
  getLicencesData: GetLicencesData;
  location: any;
}

const AllUserProfiles = (props: IProps) => {
  const [state, setState] = useState({
    selectedRow: {},
    pageSize: 3,
    initialPageSize: 3,
    searchResults: undefined,
  } as IState);

  useEffect(() => {
    props.getAllUserProfile(undefined, 1, state.pageSize);
    props.getLicences();
  }, []);

  let listItem: AllUserProfileDetails[] = [],
    columnsList: columns[] = [];
  if (props.getAllUserProfileData && props.getAllUserProfileData.data) {
    Array.isArray(props.getAllUserProfileData.data) &&
      props.getAllUserProfileData.data.forEach(
        (item: AllUserProfileDetails) => {
          listItem.push({
            _id: item._id,
            company: {
              english: item.company.english,
              arabic: item.company.arabic,
            },
            noOfUsers: item.noOfUsers,
            userId: item.userId,
            email: item.email,
            phone: item.phone,
            isActive: item.isActive,
          });
        }
      );

    columnsList = [
      {
        Header: "Company",
        accessor: "company.english",
      },
      {
        Header: "No. users",
        accessor: "noOfUsers",
      },
      {
        Header: "SPoc",
        accessor: "userId",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Mobile",
        accessor: "phone",
      },
    ];
  }

  const editModalToggle = (row?: IRow) => {
    console.log("Edit clkd");
    console.log(row);
    //return <Redirect to="/" />;
    props.history.push(`/userprofiles/addUser/${row.original._id}`);
    /*let selectedrow = row ? row : { original: allUserProfileType };
    setState({
      ...state,
      selectedRow: selectedrow,
    });*/
  };

  const disableUserProfile = (row: IRow) => {
    row.original.isActive = !row.original.isActive;
    props.updateUserProfile(row.original);
  };

  if (props.editUserProfileData && props.editUserProfileData.success) {
    setTimeout(() => {
      props.userProfileDataChanged({
        ...props.editUserProfileData,
        operation: "Edit",
      });
      props.popupEditClose();
      !toast.isActive("disabledRecord") &&
        toast.success(
          !Array.isArray(props.editUserProfileData.data) &&
            '"' +
              props.editUserProfileData.data.company.english +
              '"' +
              " profile has been " +
              `${
                props.editUserProfileData.data.isActive ? "enabled" : "disabled"
              }`,
          { toastId: "disabledRecord" }
        );
    }, 0);
  }

  let sideMenuList = [
    {
      Id: "All",
      Name: "All",
    },
  ];
  if (props.getLicencesData && props.getLicencesData.data) {
    props.getLicencesData.data.forEach((item) => {
      sideMenuList.push({ Id: item._id, Name: item.licenseName });
    });
  }

  const licenceTypeFilter = (licenceType: string) => {
    props.getAllUserProfile(
      licenceType === "All" ? undefined : { search: licenceType },
      1,
      state.pageSize
    );
  };

  return (
    <div className="allUserProfileWrapper">
      <div className="allUserProfileSideNav">
        <SideNavbar
          title={"Account Type"}
          List={sideMenuList}
          clickEvent={(licenceType: string) => licenceTypeFilter(licenceType)}
        />
      </div>
      <div className="allUserProfileContent">
        <div className="addUserProfileLink">
          <Link to="/userprofiles/addUser">+Add user profile</Link>
        </div>
        <div className="isFlex">
          <div>
            <div className="title">All user profiles</div>
            <div>
              Total number of accounts{" "}
              {props.getAllUserProfileData.totalRecords}
            </div>
          </div>
          <Search
            formSubmit={(values: ISearchKey) => {
              setState({
                ...state,
                pageSize: state.initialPageSize,
                searchResults: values.search,
              });
              props.getAllUserProfile(values, 1, state.initialPageSize);
            }}
            resetSearch={() => {
              if (state.searchResults) {
                setState({
                  ...state,
                  pageSize: state.initialPageSize,
                  searchResults: undefined,
                });
                props.getAllUserProfile(undefined, 1, state.initialPageSize);
              }
            }}
          />
        </div>
        <div>
          <Datatable
            listItem={listItem}
            columns={columnsList}
            filterable={true}
            pageSize={state.pageSize}
            initialPageSize={state.initialPageSize}
            totalRecords={
              props.getAllUserProfileData.totalRecords
                ? props.getAllUserProfileData.totalRecords
                : 0
            }
            onPaginationChange={(page: number, pageSize?: number) => {
              pageSize && setState({ ...state, pageSize: pageSize });
              props.getAllUserProfile(
                state.searchResults
                  ? { search: state.searchResults }
                  : undefined,
                page,
                pageSize ? pageSize : state.pageSize
              );
            }}
            isSearch={state.searchResults}
            editModal={(row: IRow) => editModalToggle(row)}
            disableRecord={(row: IRow) => disableUserProfile(row)}
          />
          <ToastContainer
            className="toastContainer"
            toastClassName="toastBody"
            hideProgressBar={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AllUserProfiles;
