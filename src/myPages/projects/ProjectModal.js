import React from "react";
import { Form, Modal, ModalBody } from "reactstrap";
import { Button, Col, Icon, RSelect } from "../../components/Component";
import DatePicker from "react-datepicker";
import moment from "moment";
const ProjectModal = ({
  handleDepartmentChange,
  modal,
  closeModal,
  onSubmit,
  handleSubmit,
  register,
  setValue,
  trigger,
  watch,
  errors,
}) => {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };


  return (
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
          <h5 className="title">
            {modal?.add && "Add Project"} {modal?.edit && "Update Project"}
          </h5>
          <div className="mt-4">
            <Form className="row gy-4" onSubmit={handleSubmit(onSubmit)}>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    {...register("title", { required: "This field is required" })}
                    onChange={(e) => {
                      const newTitle = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                      setValue("title", newTitle);
                    }}
                    value={watch("title")}
                    placeholder="Enter Title"
                    className="form-control"
                  />
                  {errors.title && <span className="invalid">{errors.title.message}</span>}
                </div>
              </Col>

              <Col size="12">
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    {...register("description", { required: "This field is required" })}
                    value={watch("description")}
                    placeholder="Your description"
                    className="form-control-xl form-control no-resize"
                  />
                  {errors.description && <span className="invalid">{errors.description.message}</span>}
                </div>
              </Col>

              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <DatePicker
                    selected={watch("start_date")}
                    {...register("start_date", {
                      required: "Start Date is required",
                    })}
                    onChange={(date) => {
                      setValue("start_date", date);
                      trigger("start_date");
                    }}
                    showTimeSelect
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                    minDate={new Date()}
                  />
                  {errors.start_date && <span className="invalid">{errors.start_date.message}</span>}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Deadline Date</label>
                  <DatePicker
                    selected={watch("deadline")}
                    {...register("deadline", {
                      required: "Deadline Date is required",
                    })}
                    onChange={(date) => {
                      setValue("deadline", date);
                      console.log(date, "end date");
                      trigger("deadline");
                    }}
                    showTimeSelect
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                    minDate={new Date()}
                    placeholderText='Select Deadline Date'
                  />
                  {errors.deadline && <span className="invalid">{errors.deadline.message}</span>}
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
                      isMulti
                    />
                  </div>
                  {errors.department && <span className="invalid">{errors.department.message}</span>}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Team Members</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={watch("teamList")}
                      {...register("team_list", {
                        required: "Please select team members",
                      })}
                      isMulti
                      value={watch("team_list")}
                      onChange={(e) => {
                        if (e?.length > 0) {
                          setValue("team_list", e);
                          trigger("team_list");
                        } else {
                          setValue("team_list", e);
                          trigger("team_list");
                          setValue("team_lead", "")
                        }
                      }}
                    />
                  </div>
                  {errors.team_list && <span className="invalid">{errors.team_list.message}</span>}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Lead</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={watch("team_list")}
                      {...register("team_lead", {
                        required: "Please select team lead",
                      })}
                      value={watch("team_lead")}
                      onChange={(e) => {
                        setValue("team_lead", e);
                        trigger("team_lead");
                      }}
                    />
                  </div>
                  {errors.team_lead && <span className="invalid">{errors.team_lead.message}</span>}
                </div>
              </Col>
              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      {modal?.add && "Add Project"} {modal.edit && "Update Project"}
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={(ev) => {
                        ev.preventDefault();
                        closeModal();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </Button>
                  </li>
                </ul>
              </Col>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ProjectModal;
