import * as React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export interface IProps {
  List: any[];
}

export const Navbar = (props: IProps) => {
  return (
    <nav className="navBar">
      <ul>
        {props.List.map((obj) => {
          let activeClass =
            window.location.pathname.indexOf(obj.Link) > -1 ? "active" : "";
          return (
            <li key={obj.Id}>
              <Link className={activeClass} to={obj.Link}>
                {obj.Name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
