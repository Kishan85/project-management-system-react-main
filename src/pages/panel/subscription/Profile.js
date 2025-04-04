import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Button,RSelect, Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, BlockDes, Col, Icon, Row } from "../../../components/Component";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";

import DatePicker from "react-datepicker";
import { Modal, ModalBody } from "reactstrap";

import { getDateStructured } from "../../../utils/Utils";
import { getEmployeeProfile } from "../../../api/employee";
import { set } from "react-hook-form";

const userData = {
  id: 1,
  avatarBg: "purple",
  name: "Abu Bin Ishtiyak",
  displayName: "Ishtiak",
  dob: "10 Aug, 1980",
  role: "Customer",
  checked: false,
  email: "info@softnio.com",
  balance: "35040.34",
  phone: "818474958",
  emailStatus: "success",
  kycStatus: "success",
  lastLogin: "10 Feb 2020",
  status: "Active",
  address: "2337 Kildeer Drive",
  state: "Kentucky",
  country: "Canada",
  designation: "UI/UX Designer",
  projects: "213",
  performed: "87.5",
  tasks: "587",
}

const countryOptions = [
  { value: "Canada", label: "Canada" },
  { value: "USA", label: "USA" },
  { value: "India", label: "India" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "France", label: "France" },
  { value: "England", label: "England" },
];

const Profile = () => {
  const [modalTab, setModalTab] = useState("1");
  const [userInfo, setUserInfo] = useState(userData);
  const [formData, setFormData] = useState();
  const [modal, setModal] = useState(false);
  const fetchData = async()=>{
    const res = await getEmployeeProfile();
    setFormData(res.data.data)
  }
  useEffect(()=>{
    fetchData();
  },[])
  console.log('formData==>',formData)

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    let submitData = {
      ...formData,
    };
    setUserInfo(submitData);
    setModal(false);
  };

  return (
    <React.Fragment>
      <Head title="Profile Info"></Head>

      <Block>
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h5">Personal Information</BlockTitle>
            {/* <BlockDes>
              <p>Basic info, like your name and address, that you use on Nio Platform.</p>
            </BlockDes> */}
          </BlockHeadContent>
        </BlockHead>
        <Card className="card-bordered">
          <div className="nk-data data-list">
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Full Name</span>
                <span className="data-value">{formData.name}</span>
              </div>
              {/* <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div> */}
            </div>
            {/* <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Display Name</span>
                <span className="data-value">{formData.name}</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div> */}
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Email</span>
                <span className="data-value">{formData?.email}</span>
              </div>
              {/* <div className="data-col data-col-end">
                <span className="data-more disable">
                  <Icon name="lock-alt"></Icon>
                </span>
              </div> */}
            </div>
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Phone Number</span>
                <span className="data-value text-soft">{formData.mobile}</span>
              </div>
              {/* <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div> */}
            </div>
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Designation</span>
                <span className="data-value">{formData.designation}</span>
              </div>
              {/* <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div> */}
            </div>
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Department</span>
                <span className="data-value">
                 {formData.department}
                </span>
              </div>
              {/* <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div> */}
            </div>
          </div>
        </Card>
        {/* <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h5">Personal Preferences</BlockTitle>
            <BlockDes>
              <p>Your personalized preference allows you best use.</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead> */}
        {/* <Card className="card-bordered">
          <div className="nk-data data-list">
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Language</span>
                <span className="data-value">English (United State)</span>
              </div>
              <div className="data-col data-col-end">
                <a
                  href="#language"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                  className="link link-primary"
                >
                  Change Language
                </a>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Date Format</span>
                <span className="data-value">MM/DD/YYYY</span>
              </div>
              <div className="data-col data-col-end">
                <a
                  href="#link"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                  className="link link-primary"
                >
                  Change
                </a>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Timezone</span>
                <span className="data-value">Bangladesh (GMT +6)</span>
              </div>
              <div className="data-col data-col-end">
                <a
                  href="#link"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                  className="link link-primary"
                >
                  Change
                </a>
              </div>
            </div>
          </div>
        </Card> */}
      </Block>
      <Modal className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update Profile</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "1" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("1");
                  }}
                  href="#personal"
                >
                  Personal
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "2" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("2");
                  }}
                  href="#address"
                >
                  Address
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                <Row className="gy-4">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        className="form-control"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                        // defaultValue={formData.name}
                        placeholder="Enter Full name"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="display-name">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="display-name"
                        className="form-control"
                        name="displayName"
                        onChange={(e) => onInputChange(e)}
                        // defaultValue={formData.displayName}
                        placeholder="Enter display name"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone-no">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone-no"
                        className="form-control"
                        name="phone"
                        onChange={(e) => onInputChange(e)}
                        // defaultValue={formData.phone}
                        placeholder="Phone Number"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="birth-day">
                        Date of Birth
                      </label>
                      <DatePicker
                        // selected={new Date(formData.dob)}
                        className="form-control"
                        onChange={(date) => setFormData({ ...formData, dob: getDateStructured(date) })}
                        maxDate={new Date()}
                      />
                    </div>
                  </Col>
                  <Col size="12">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="latest-sale" />
                      <label className="custom-control-label" htmlFor="latest-sale">
                        Use full name to display{" "}
                      </label>
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="lg"
                          onClick={(ev) => {
                            ev.preventDefault();
                            submitForm();
                          }}
                        >
                          Update Profile
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
              <div className={`tab-pane ${modalTab === "2" ? "active" : ""}`} id="address">
                <Row className="gy-4">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-l1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="address-l1"
                        name="address"
                        onChange={(e) => onInputChange(e)}
                        // defaultValue={formData.address}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-l2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="address-l2"
                        name="address2"
                        onChange={(e) => onInputChange(e)}
                        // defaultValue={formData.address2}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-st">
                        State
                      </label>
                      <input
                        type="text"
                        id="address-st"
                        name="state"
                        onChange={(e) => onInputChange(e)}
                        // defaultValue={formData.state}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-county">
                        Country
                      </label>
                      <RSelect
                        options={countryOptions}
                        placeholder="Select a country"
                        // defaultValue={[
                        //   {
                        //     value: formData.country,
                        //     label: formData.country,
                        //   },
                        // ]}
                        onChange={(e) => setFormData({ ...formData, country: e.value })}
                      />
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="lg" onClick={() => submitForm()}>
                          Update Address
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Profile;
