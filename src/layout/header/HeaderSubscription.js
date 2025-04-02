import React, { useState } from "react";
import classNames from "classnames";
import Logo from "../logo/Logo";
import User from "./dropdown/user/UserSubscription";
import Notification from "./dropdown/notification/Notification";
import Toggle from "../sidebar/Toggle";
import { Link } from "react-router-dom";

import { useTheme, useThemeUpdate } from "../provider/Theme";
import { Button } from "../../components/Component";

const Header = ({ fixed, className, ...props }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className,
  });
  const user = localStorage.getItem("userDetail");

  return (
    <div className={headerClass}>
      <div className="container-lg">
        <div className="nk-header-wrap">
          <div className="nk-header-brand">
            <Logo to={`${process.env.PUBLIC_URL}/dashboard`} />
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              {user != null ? (
                <li className="user-dropdown">
                  <User />
                </li>
              ) : (
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <Button color="primary" size="s" className={`me-1`}>
                    Login
                  </Button>
                </Link>
              )}

              {/* <li className="user-dropdown">
                <User />
              </li> */}
              {/* <li className="notification-dropdown">
                <Notification />
              </li> */}
              <li className="d-lg-none">
                <Toggle icon="menu" className="toggle nk-quick-nav-icon me-n1" click={themeUpdate.sidebarVisibility} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
