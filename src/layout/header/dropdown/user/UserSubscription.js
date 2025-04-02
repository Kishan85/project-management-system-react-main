import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown, Modal, ModalBody, Button, Label, Input } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { useTheme, useThemeUpdate } from "../../../provider/Theme";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useLogout from "../../../../utils/useLogout";
import { chnagePasswordAPI } from "../../../../api/login";

const User = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const logout = useLogout()
  const themeUpdate = useThemeUpdate();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [toggleoldPassword, setToggleOldPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConPassword, setToggleConPassword] = useState(false);
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  const userToken = localStorage.getItem("accessToken");
  const toggle = () => {
    // themeUpdate.sidebarHide();
    setOpen((prevState) => !prevState);

  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/auth-login");
  };
  const handleChangePass = () => {
    setModal(true)

  };
  const handleToggle = () => {
    setModal(false)

  };
  const onFormSubmit = (data) => {
    // setIsLoading(true);
    const bodyData = {
      old_pass: data?.oldPass,
      new_pass: data?.new_password || ""
    }
    console.log("change Pass", bodyData);
    // return false
    chnagePasswordAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setIsLoading(false);
          setModal(false)
          toast.success(res.data.message);
        } else if (res.data.status === "failed") {
          setIsLoading(false);
          toast.error(res.data.message);
        } else if (res.data.status === "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
        <DropdownToggle
          tag="a"
          href="#toggle"
          className="dropdown-toggle"
          onClick={(ev) => {
            ev.preventDefault();
          }}
        >
          <div className="user-toggle">
            <div className="user-toggle">
              <UserAvatar icon="user-alt" className="sm" />
              <div className="user-name dropdown-indicator d-none d-sm-block">{userDetail?.name}</div>
            </div>
          </div>
        </DropdownToggle>
        <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
          <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
            <div className="user-card sm">
              <div className="user-avatar">
                <UserAvatar icon="user-alt" className="sm" />
              </div>
              <div className="user-info">
                <span className="lead-text">{userDetail?.name}</span>
                <span className="sub-text">{userDetail?.email}</span>
              </div>
            </div>
          </div>
          <div className="dropdown-inner">
            <LinkList>
               <LinkItem link="/subscription/profile" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            
           {/* <LinkItem link="/subscription/profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/subscription/profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem> */}
              <li>
                <a
                  className={`dark-switch ${theme.skin === "dark" ? "active" : ""}`}
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    const newSkin = theme.skin === "dark" ? "light" : "dark";
                    localStorage.setItem("theme", JSON.stringify(newSkin));
                    themeUpdate.skin(newSkin);
                  }}
                >
                  {theme.skin === "dark" ? (
                    <>
                      <em className="icon ni ni-sun"></em>
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <em className="icon ni ni-moon"></em>
                      <span>Dark Mode</span>
                    </>
                  )}
                </a>

              </li>
            </LinkList>
          </div>
          <div className="dropdown-inner">
            <LinkList>
              <a style={{ cursor: "pointer" }} onClick={() => handleChangePass()}>
                <Icon name="lock"></Icon>
                <span>Change Password</span>
              </a>
            </LinkList>
            <LinkList>
              <a style={{ cursor: "pointer" }} onClick={() => handleLogOut()}>
                <Icon name="signout"></Icon>
                <span>Sign Out</span>
              </a>
            </LinkList>
          </div>
        </DropdownMenu>
      </Dropdown>
      <>
        <Modal isOpen={modal} toggle={handleToggle}>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              handleToggle();
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <ModalBody className="modal-body-lg">
            <div className="nk-modal">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="form-group">
                  <Label className="from-label" htmlFor="oldPass">
                    Old Password
                  </Label>
                  <Input
                    autoComplete="off"
                    placeholder="Enter Old Password"
                    type={toggleoldPassword ? "text" : "password"}
                    id="oldPass"
                    {...register("oldPass", {
                      required: "Old Password is required"
                    })}
                    className="form-control"
                    value={watch("oldPass")}
                    onChange={(e) => {
                      setValue("oldPass", e.target.value);
                      trigger("oldPass");
                    }}
                  />
                  <div
                    className="show-hide1"
                  >
                    <Icon
                      name={toggleoldPassword ? "eye" : "eye-off"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setToggleOldPassword(!toggleoldPassword)}
                    ></Icon>
                  </div>
                  {errors.oldPass && (
                    <span
                      className="invalid"
                    >
                      {errors?.oldPass?.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type={togglePassword ? "text" : "password"}
                    {...register("new_password", {
                      required: "New Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,18}$/,
                        message:
                          "Password must contain 1 special character, 1 uppercase, 1 lowercase, 1 digit, and be 8-18 characters long",
                      },
                    })}
                    autoComplete="off"
                    placeholder="Enter New Password"
                    className="form-control"
                    onChange={(e) => {
                      setValue("new_password", e.target.value);
                      trigger("new_password");
                    }}
                  />
                  <div
                    className="show-hide1"
                  >
                    <Icon
                      name={togglePassword ? "eye" : "eye-off"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setTogglePassword(!togglePassword)}
                    ></Icon>
                  </div>
                  {errors.new_password && (
                    <p
                      className="invalid"
                    >
                      {errors.new_password.message}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={toggleConPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("new_password") || "Passwords do not match",
                    })}
                    placeholder="Enter Confirm Password"
                    className="form-control"
                    onChange={(e) => {
                      setValue("confirmPassword", e.target.value);
                      trigger("confirmPassword");
                    }}
                  />
                  <div
                    className="show-hide1"
                    onClick={() => setToggleConPassword(!toggleConPassword)}
                  >
                    <Icon
                      name={togglePassword ? "eye" : "eye-off"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setTogglePassword(!togglePassword)}
                    ></Icon>
                  </div>
                  {errors.confirmPassword && (
                    <p
                      className="invalid"
                    >
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="nk-modal-action mt-5">
                  <Button
                    size="lg"
                    className={`btn-mw`}
                    color={`primary`}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>

            </div>
          </ModalBody>
        </Modal>
      </>

    </>
  );
};

export default User;
