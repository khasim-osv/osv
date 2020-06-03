import * as React from "react";
import logo from "../../assets/images/1x_logo.png";
import "./Header.scss";

export const Header = () => {
  return (
    <header>
      <div>
        <div>
          <img src={logo} width="70px" height="30px" alt="logo" />
        </div>
        {/*<div>
          syed@onesingleview.com
          <img src={user_logo} width="20px" height="15px" />
        </div>*/}
      </div>
    </header>
  );
};

export default Header;
