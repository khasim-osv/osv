import * as React from "react";
//import { Link } from "react-router-dom";
import "./SideNavbar.scss";
import { Link /*  animateScroll as scroll  */ } from "react-scroll";
import { ISideMenu } from "./CreateUserProfile.actionTypes";

export interface IProps {
  list: ISideMenu[];
}

export const SideNavbar = (props: IProps) => {
  return (
    <div className="sideNavWrapper" style={{ position: "fixed" }}>
      <nav className="sideNavBarUP">
        <ul>
          {/* 	{props.title && (
						<li className="sideNavBarTitle">
							<div>{props.title}</div>
						</li>
					)} */}
          {props.list.map((obj) => {
            let activeMenu =
              window.location.pathname.indexOf(obj.link) > -1
                ? "activeSideNav"
                : "";
            return (
              <li key={obj.id} className="Cursor">
                <Link
                  className={activeMenu}
                  to={obj.link}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {obj.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
