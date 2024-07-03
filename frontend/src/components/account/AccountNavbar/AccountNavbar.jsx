import "./AccountNavbar.css";
import { Link } from "react-router-dom";

import Logo from "../../../assets/icons/bemi.png";

import UserLogo from "../../../assets/icons/user.png";

import MenuIcon from "../../../assets/icons/menu_bar.png";

import { useState } from "react";

const AccountNavbar = ({ sidebar, handleShowSidebar, title }) => {
  const [displayDropDown, setDisplayDropDown] = useState(false);

  const handleDisplayDropDown = () => {
    setDisplayDropDown(!displayDropDown);
  };

  return (
    <nav className="navbar">
      <div className="container flex">
        <div className="logo_container flex">
          <div className="menu-icon" onClick={handleShowSidebar}>
            <img src={MenuIcon} alt="" />
          </div>
        </div>
        <div className="navigation">
          <div className="navigation_nav_ul flex">
            <p className="page-status id">ID.1234</p>
            <p className="page-status">{`${title}`}</p>
            <p className="page-status">ACCOUNT</p>
          </div>
        </div>
        <div className="profile-section flex">
          <div className="img-wrapper">
            <Link to="/client/profile">
              <img src={UserLogo} alt="" className="profile-image" />
            </Link>
          </div>
          <p className="large-headers name">Alexander!</p>
          <div className="arrow" onClick={handleDisplayDropDown}>
            <p>
              <i class="fa fa-caret-up"></i>
            </p>
          </div>
          <div className={`drop-down ${displayDropDown ? "active" : null}`}>
            {/* /admin/blogs */}
            <Link to="/admin/blogs">
              <button className="medium-btns">ADMIN</button>
            </Link>
            <Link to="/">
              <button className="medium-btns">HOME</button>
            </Link>
            <Link to="/">
              <button className="medium-btns">LOGOUT</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AccountNavbar;
