import React from "react";
import "./UserProfiles.scss";
import BreadCrumbComp from "./Breadcrumb.component";

export interface IState {
  breadcrumbItems: object[];
}

export interface IProps {
  path: string;
  children: any;
  location?: any;
}

export default (props: IProps) => {
  return (
    <>
      <BreadCrumbComp {...props}></BreadCrumbComp>
      {props.children}
    </>
  );
};
