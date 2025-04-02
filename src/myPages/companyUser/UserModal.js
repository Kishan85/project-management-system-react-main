import React from "react";
import { Form, Modal, ModalBody } from "reactstrap";
import { Button, Col, Icon, RSelect } from "../../components/Component";

const UserModal = ({
  designationList,
  reportToList,
  modal,
  closeModal,
  onSubmit,
  register,
  handleSubmit,
  setValue,
  trigger,
  watch,
  errors,
  handleDepartmentChange,
  handleDesignationChange,
}) => {

  return (
    <>
      <Modal isOpen={modal?.add || modal?.edit} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              closeModal();
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title"> {modal?.add ? "Add " : "Update "}Employee</h5>
            <div className="mt-4">
              <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Col md={`6`}>
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("fname", { required: "This field is required" })}
                      value={watch("fname")}
                      onChange={(e) => {
                        setValue("fname", e.target.value);
                        trigger("fname");
                      }}
                      placeholder="Enter first name"
                    />
                    {errors.fname && <span className="invalid">{errors.fname.message}</span>}
                  </div>
                </Col>
                <Col md={`6`}>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("lname", { required: "This field is required" })}
                      value={watch("lname")}
                      onChange={(e) => {
                        setValue("lname", e.target.value);
                        trigger("lname");
                      }}
                      placeholder="Enter last name"
                    />
                    {errors.lname && <span className="invalid">{errors.lname.message}</span>}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Email </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                      value={watch("email")}
                      onChange={(e) => {
                        setValue("email", e.target.value);
                        trigger("email");
                      }}
                      placeholder="Enter email"
                    />
                    {errors.email && <span className="invalid">{errors.email.message}</span>}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      className="form-control"
                      type="number"
                      {...register("phone", { required: "This field is required" })}
                      value={watch("phone")}
                      placeholder="Enter phone"
                      onChange={(e) => {
                        setValue("phone", e.target.value);
                        trigger("phone");
                      }}
                    />

                    {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={watch("departmentList")}
                        {...register("department", {
                          required: "Please select department",
                        })}
                        value={watch("department")}
                        onChange={(e) => {
                          handleDepartmentChange(e);
                        }}
                      />
                    </div>
                    {errors.department && <span className="invalid">{errors.department.message}</span>}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={designationList}
                        {...register("designation", {
                          required: "Please select designation",
                        })}
                        value={watch("designation")}
                        onChange={(e) => {
                          setValue("designation", e || "");
                          trigger("designation");
                          handleDesignationChange(e);
                        }}
                      />
                    </div>
                    {errors.designation && <span className="invalid">{errors.designation.message}</span>}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Report To</label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={reportToList}
                        {...register("report_to", {
                          // required: "Please select report to",
                        })}
                        value={watch("report_to")}
                        onChange={(e) => {
                          setValue("report_to", e || "");
                          trigger("report_to");
                          // handleDesignationChange(e);
                        }}
                      />
                    </div>
                    {errors.report_to && <span className="invalid">{errors.report_to.message}</span>}
                  </div>
                </Col>
                {/* <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={filterStatus}
                        {...register("status", {
                          required: "Please select status",
                        })}
                        value={watch("status")}
                        onChange={(e) => {
                          setValue("status", e || "");
                          trigger("status");
                        }}
                      />
                    </div>
                    {errors.status && <span className="invalid">{errors.status.message}</span>}
                  </div>
                </Col> */}
                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button color="primary" size="md" type="submit">
                        {modal?.add ? "Add " : "Update "}Employee
                      </Button>
                    </li>
                    <li>
                      <a
                        href="#cancel"
                        onClick={(ev) => {
                          ev.preventDefault();
                          closeModal();
                        }}
                        className="link link-light"
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </Col>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UserModal;
