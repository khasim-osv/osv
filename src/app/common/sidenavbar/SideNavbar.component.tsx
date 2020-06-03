import * as React from "react";
import { Link } from "react-router-dom";
import "./SideNavbar.scss";

export interface IProps {
  List: any[];
  title?: String;
  clickEvent?: (feature: string) => void;
}

export const SideNavbar = (props: IProps) => {
  return (
    <div className="sideNavWrapper">
      <nav className="sideNavBar">
        <ul>
          {props.title && (
            <li className="sideNavBarTitle">
              <div>{props.title}</div>
            </li>
          )}
          {props.List.map((obj) => {
            let activeMenu =
              window.location.pathname.indexOf(obj.Link) > -1
                ? "activeSideNav"
                : "";
            return (
              <li key={obj.Id}>
                <Link
                  className={activeMenu}
                  to={obj.Link}
                  onClick={() => props.clickEvent && props.clickEvent(obj.Id)}
                >
                  {obj.Name}
                </Link>
                <ul>
                  {activeMenu === "activeSideNav" &&
                    obj.subMenu &&
                    obj.subMenu.map((item: any) => {
                      let activeSubMenu =
                        window.location.pathname.indexOf(item.Link) > -1
                          ? "activeSubMenu"
                          : "";
                      return (
                        <li key={item.Id}>
                          <Link className={activeSubMenu} to={item.Link}>
                            {item.Name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
