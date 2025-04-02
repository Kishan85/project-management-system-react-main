import React, { useEffect, useState } from "react";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  UserAvatar
} from "../../components/Component";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { Badge, Button, Col, Label, Progress, Row, Spinner } from "reactstrap";
import { findUpper } from "../../utils/Utils";
import { getemployeeTasksAPI, gettaskListAPI } from "../../api/report";
import { toast } from "react-toastify";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useForm } from "react-hook-form";
import useLogout from "../../utils/useLogout";
import TaskModal from "./TaskModal";
const TaskProgressReport = () => {
  const [taskData, setTaskData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    reset,
  } = useForm();
  useEffect(() => {
    taskList();
  }, []);
  const defaultStartDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    setValue("startDate", defaultStartDate);
    setValue("endDate", new Date());
  }, []);
  const logout = useLogout()
  const taskList = () => {
    const searchData = {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),

    };
    console.log(searchData, "searchData");

    gettaskListAPI(searchData)
      .then((res) => {
        if (res.data.status === "success") {
          setIsLoading(false);
          setTaskData(res?.data?.data || []);
        } else if (res.data.status === "failed") {
          setTaskData([]);
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

  const userType = JSON.parse(localStorage.getItem("userDetail"));
  // console.log(userType?.role == "company", "userType==");

  const onFormSubmit = (data) => {
    setIsLoading(true);
    const searchData = {
      startDate: data.startDate ? new Date(new Date(data.startDate).setDate(new Date(data.startDate).getDate() + 1)).toISOString() : null,
      endDate: data.endDate ? new Date(new Date(data.endDate).setDate(new Date(data.endDate).getDate())).toISOString() : null,

    };
    gettaskListAPI(searchData)
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setTaskData(res?.data?.data);
          setIsLoading(false);
          toast.clearWaitingQueue();
        } else if (res.data.status == "failed") {
          toast.error(res.data.message);
          setTaskData([])
          setIsLoading(false);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  const [openModal, setOpenModal] = useState(false);
  const [row, setRow] = useState([]);

  const onViewClick = (item) => {

    setOpenModal(true);
    const id = {
      id: item.user_id,
      ...(userType?.role === "employee" && { task_id: item.id })
    };
    getemployeeTasksAPI(id)
      .then((res) => {
        if (res.data.status == "success") {
          // toast.success(res.data.message);
          setRow(res.data.data)
          setIsLoading(false);
        } else if (res.data.status == "failed") {
          toast.error(res.data.message);
          setRow([])
          setIsLoading(false);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });

  }
  const closeOpenModal = () => {
    setOpenModal(false);
  }

  const employeeName = taskData?.employee
  return (
    <>
      <Head title={`Task Report`} />
      <Content>
        <BlockHead size="lg">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h2" className="fw-normal">
                {/* Daily Task Report ({new Date().toISOString().split('T')[0]}) */}
                Daily Task Report ( {moment().format('dddd, DD-MMMM-YYYY')} )
              </BlockTitle>
              <BlockDes>
                {/* <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row>
                    <Col md="3" sm="4" lg="3" xl="2" xxl="2">
                      <Label className="form-label">
                        Start Date
                      </Label>
                      <DatePicker
                        showIcon
                        className="form-control"
                        placeholderText="Please select start date"
                        {...register("startDate", {
                          required: "Start Date is required",
                        })}
                        onChange={(date) => {
                          setValue("startDate", date);
                          setStartDate(date);
                          trigger("startDate");
                        }}
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                      />
                      {errors.startDate && (
                        <p className="invalid">
                          {errors.startDate.message}
                        </p>
                      )}
                    </Col>

                    <Col md="3" sm="4" lg="3" xl="2" xxl="2">
                      <Label className="form-label">
                        End Date
                      </Label>
                      <DatePicker
                        showIcon
                        className="form-control"
                        placeholderText="Please select end date"
                        {...register("endDate", {
                          required: "End Date is required",
                        })}
                        onChange={(date) => {
                          setValue("endDate", date);
                          setEndDate(date);
                          trigger("endDate");
                        }}
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                      />
                      {errors.endDate && (
                        <p className="invalid">{errors.endDate.message}</p>
                      )}
                    </Col>
                    <Col md="3" sm="4" lg="3" xl="2" xxl="2" style={{ marginTop: "30px" }}>
                      <Button
                        outline
                        color="primary"
                        disabled={isLoading}
                        type="submit"
                      >
                        {isLoading ? <Spinner size="sm" color="light" /> : "Search"}
                      </Button>

                    </Col>
                  </Row>
                </form> */}
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <div className="text-end">
            <Button
              outline
              id="back"
              color="primary"
              onClick={() => window.history.back()}
              size="sm"
              aria-label="Go back"
            >
              <Icon name="arrow-left" /> Back
            </Button>
          </div>
        </Block>
        <Block>

          <table className="table table-bordered table-striped">
            <thead className="">
              <tr>
                {userType?.role === "company" ?
                  <>
                    <th scope="col" style={{ width: "100px" }}>Employee</th>
                    <th scope="col" style={{ width: "100px" }}>Department</th>
                    <th scope="col" style={{ width: "200px" }}>Designation</th>
                    <th scope="col" style={{ width: "40px" }}>Action</th>
                  </>
                  :
                  <>
                    <th scope="col" style={{ width: "100px" }}>Employee</th>
                    <th scope="col" style={{ width: "100px" }}>Project</th>
                    <th scope="col" style={{ width: "100px" }}>Task</th>
                    <th scope="col" style={{ width: "200px" }}>Description</th>
                    <th scope="col" style={{ width: "40px" }}>Action</th>
                  </>
                }
              </tr>
            </thead>
            <tbody>
              {taskData?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="user-card">
                      <UserAvatar
                        theme={item?.avatarBg}
                        text={findUpper(item?.employee || "")}
                        className={'xs'}
                      ></UserAvatar>
                      <div>
                        <span className="tb-lead mx-2">{item?.employee}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{item?.project}</td>
                  {
                    userType?.role === "company" &&
                    <td>
                      {item?.designation}
                    </td>
                  }
                  {
                    userType?.role !== "company" &&
                    <>
                      <td>{item?.task}</td>
                      <td style={{ textWrap: "auto", width: "250px" }}>{item?.description}</td>
                    </>
                  }

                  <td>
                    <Button color="primary" outline className="btn-white" onClick={() => onViewClick(item)}>
                      <Icon name="eye"></Icon>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </Block>
      </Content>
      <TaskModal
        row={row}
        modal={openModal}
        closeModal={closeOpenModal}
        employeeName={employeeName}
      />
    </>
  );
};

export default TaskProgressReport;
