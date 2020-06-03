import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export interface IProps {
  path: string;
  children: any;
  location?: any;
  companyName: string;
  breadcrumbItems: any;
  setBreadcrumbItems: any;
}

const items = [
  {
    to: "/userprofiles/allProfiles",
    label: "User Profiles",
    key: "/allProfiles",
  },
  {
    to: "/userprofiles/addUser",
    label: "Add new user profile",
    key: "/addUser",
  },
  { to: "/userprofiles/addRole", label: "Role management", key: "/addRole" },
];
const BreadcrumbItem = ({ children, ...props }) => (
  <li className="breadcrumb-item" {...props}>
    {children}
  </li>
);

const BreadcrumbSeparator = ({ children, ...props }) => (
  <li className="breadcrumb-separator" {...props}>
    {children}
  </li>
);

let breadcrumbItems = [];

let processBreadcrumbComponents = (
  props: IProps /* ,
  state: any,
  setState: any */
) => {
  console.log("processBreadcrumbComponents", props);
  breadcrumbItems = [];
  for (let i = 0; i < items.length; i++) {
    if (props.location.pathname === "/userprofiles/allProfiles") {
      break; //prevent display  on all user profiles page
    }
    //  breadcrumbItems.push(items[i]);
    //  if (items[i].to.indexOf(props.location.pathname) > -1) {
    if (props.location.pathname.indexOf(items[i].key) > -1) {
      items[i].label = props.companyName;
      if (items[i].key === "/addUser") {
        items[i].to = props.location.pathname;
        items[i].label = props.companyName ? props.companyName : "Add User";
      }
      breadcrumbItems.push(items[i]);
      break;
    } else {
      if (
        props.location.pathname.indexOf("usermanagement") > -1 &&
        items[i].key === "/addRole"
      ) {
        items[i].to = props.location.pathname;
        items[i].label = "User management";
      } else {
        if (items[i].key === "/addRole") {
          items[i].to = props.location.pathname;
          items[i].label = "Role management";
        }
      }
      breadcrumbItems.push(items[i]);
    }
  }
  /* if (!isEmpty(breadcrumbItems)) {
    props.setBreadcrumbItems(breadcrumbItems);
  } */
};

const Breadcrumb = ({ separator = ">", ...props }) => {
  /* {breadcrumbItems.map(({ to, label }) => (
    <Link key={to} to={to}>
      {label}
    </Link>
  ))} */

  //let children = React.Children.toArray(props.children)

  /* children = children.map((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  )) */

  //let children = props.breadcrumbItems.map(({ to, label }, index) => (

  let location = useLocation();

  ///useEffect(() => {
  const { pathname } = location;
  console.log("New path:", pathname);
  processBreadcrumbComponents(props);
  //});

  let children = breadcrumbItems.map(({ to, label }, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>
      {" "}
      <Link key={to} to={to}>
        {label}
      </Link>
    </BreadcrumbItem>
  ));

  // const lastIndex = children.length - 1
  //const lastIndex = props.breadcrumbItems.length - 1;
  const lastIndex = breadcrumbItems.length - 1;

  children = children.reduce((acc, child, index) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return <ol>{children}</ol>;
};

export default Breadcrumb;
