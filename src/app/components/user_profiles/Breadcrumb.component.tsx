import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Breadcrumb from "./Breadcrumb";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import isEmpty from "lodash.isempty";

/* const items = [
  {
    to: "/userprofiles/allProfiles",
    label: "User Profiles",
    key: "/allProfiles",
  },
  { to: "/userprofiles/addUser", label: "Add User", key: "/addUser" },
  { to: "/userprofiles/addRole", label: "Add Role", key: "/addRole" },
]; */

//let breadcrumbItems = [];

export interface IProps {
  path: string;
  children: any;
  location?: any;
  companyName: string;
  breadcrumbItems: any;
  setBreadcrumbItems: any;
}

const BreadCrumbComp = (props: IProps) => {
  console.log("BreadCrumbComp props", props);
  /*   const [state, setState] = useState({
    breadcrumbItems: [],
  }); */

  let location = useLocation();
  /*   useEffect(() => {
    const { pathname } = location;
    console.log("New path:", pathname);
    processBreadcrumbComponents(props);breadcrumbItems
  }); */

  return (
    <>
      <div className="breadCrumb1">
        <Breadcrumb
          separator=">"
          /* breadcrumbItems={breadcrumbItems} */ {...props}
        >
          {/* {props.breadcrumbItems.map(({ to, label }) => ( */}
          {/* {breadcrumbItems.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))} */}
        </Breadcrumb>
      </div>
    </>
  );
};

export const mapStateToProps = (state) => {
  return {
    //...state,
    companyName: state.userProfile.companyInfoData.company?.english,
    // companyName: state.userProfile.companyInfoData.companyName,
    //  breadcrumbItems: state.breadcrumb,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setBreadcrumbItems: (items: any) => {
      console.log("items", items);
      dispatch({ type: "SET_BREADCRUMB_ITEMS", items });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbComp);
