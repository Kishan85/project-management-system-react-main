import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { Badge, Form, Label, Spinner } from "reactstrap";
import { createDesignationAPI, deleteDesignationAPI, updateDesignationAPI } from "../../api/master";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Icon,
  PreviewAltCard,
  Row,
} from "../../components/Component";
import { MyDeleteModal } from "../../components/myModals/MyDeleteModal";
import MyDataTable from "../../components/table/MyDataTable";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  getCompanyStructureDDList,
  getDepartmentDDList,
  getDepartmentList,
  getDesignationListTable,
} from "../../utils/myFunctions";
import { getCompanyStructureLevelDD } from "../../api/dropdowns";
import useFetchData from "../../myHooks/useFetchData";
import useLogout from "../../utils/useLogout";
import moment from "moment";
export const Designation = () => {

  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [rowData, setRowData] = useState(null);
  const [mode, setMode] = useState("Add");
  const [departmentList, setDepartmentList] = useState([]);
  const [companyLevelList, setCompanyLevelList] = useState([]);
  const [columns, setColumns] = useState([
    {
      name: "Department",
      selector: (row) => row.department_name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
    },
    // {
    //   name: "Created By",
    //   selector: (row) => moment(row.createdBy).format('DD-MMM-YYYY'),
    //   sortable: true,
    // },
    {
      name: "Created At",
      selector: (row) =>moment(row.createdAt).format('DD-MMM-YYYY'),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button outline color={`warning`} size={`xs`} className={`me-1`} onClick={() => handleEdit(row)}>
            {" "}
            <Icon name="edit"></Icon>
          </Button>
          <Button outline color={`danger`} size={`xs`} onClick={() => handleDelete(row)}>
            {" "}
            <Icon name="trash"></Icon>
          </Button>
        </div>
      ),
    },
  ]);
  const [data, setData] = useState([]);

  const formClass = classNames({
    "form-validate": true,
    "is-alter": "",
  });
  const userToken = localStorage.getItem("accessToken");

  const token = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${userToken}`,
    },
  };
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const handleDelete = (data) => {
    setIsOpen(false);
    toggleDeleteModal();
    setDeleteModal(true);
    setRowData(data);
  };
  const handleEdit = (data) => {
    setMode("Edit");
    setIsOpen(true);
    setRowData(data);
    setValue("designation_name", data.name);
    setValue("status", {
      value: data.status === true ? true : false,
      label: data.status === true ? "Active" : "InActive",
    });
    setValue("department_name", {
      value: data.department_id,
      label: data.department_name,
    });
    setValue("level", {
      value: data.level,
      label: data.label,
      level: data.level,
    });
  };
  const handleStatusChange = (selectedOption) => {
    setValue("status", selectedOption || "");
    trigger("status");
  };
  const handleLevelChange = (selectedOption) => {
    setValue("level", selectedOption || "");
    trigger("level");
  };
  const handleDepartmentChange = (selectedOption) => {
    setValue("department_name", selectedOption || "");
    trigger("department_name");
  };
  const onFormSubmit = (e) => {
    setIsLoading(true)
    if (mode === "Edit") {
      const bodyData = {
        id: rowData.id,
        department_id: e?.department_name?.value,
        status: e?.status?.value,
        name: e?.designation_name,
        level_id: e?.level?.level,
      };
      // console.log(bodyData,"bodyData");

      updateDesignationAPI(bodyData, token)
        .then((res) => {
          if (res.data.status === "success") {
            getDesignationListTable(setData);
            toast.success(res.data.message);
            setIsOpen(false);
            resetFormData();
            setIsLoading(false)
            toast.clearWaitingQueue();
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
            setIsLoading(false);
            toast.clearWaitingQueue()
          } else if (res.data.status === "expired") {
            logout(res.data.message)
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    } else {
      const bodyData = {
        department_id: e?.department_name?.value,
        status: e?.status?.value,
        name: e?.designation_name,
        level_id: e?.level?.level,
      };
      console.log(bodyData, "bodyData");
      createDesignationAPI(bodyData, token)
        .then((res) => {
          if (res.data.status === "success") {
            getDesignationListTable(setData);
            toast.success(res.data.message);
            setIsOpen(false);
            resetFormData();
            setIsLoading(false);
            toast.clearWaitingQueue()
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
            setIsLoading(false);
            toast.clearWaitingQueue()
          } else if (res.data.status === "expired") {
            logout(res.data.message)
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    }
  };

  const deleteRow = (data) => {
    setIsLoading(true);
    const bodyData = {
      id: data.id,
    };
    setDeleteModal(false);
    setDeleteModal(false);
    deleteDesignationAPI(bodyData, token)
      .then((res) => {
        if (res.data.status === "success") {
          getDesignationListTable(setData);
          setIsLoading(false);
        } else if (res.data.status === "failed") {
          toast.error(res.data.message);
          setIsLoading(false);
          toast.clearWaitingQueue()
        } else if (res.data.status === "expired") {
          logout(res.data.message)
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };
  useEffect(() => {
    getDesignationListTable(setData);
    getDepartmentDDList(setValue, "departmentList");
    getCompanyStructureDDList(setCompanyLevelList);
  }, []);
  const resetFormData = () => {
    setValue("designation_name", "");
    setValue("status", "");
    setValue("department_name", "");
    setValue("level", "");
  };
  const { status: designationStatus, data: designationData, error: designationError, loading: designationLoading } = useFetchData("designation-list");
  const { status: departmentStatus, data: departmentData, error: departmentError, loading: departmentLoading } = useFetchData("get-department-dd");

  // console.log("data1", designationData, "loading", designationLoading, "error", designationError, "status", designationStatus)
  // console.log("data1", departmentData, "loading", departmentLoading, "error", departmentError, "status", departmentStatus)

  return (
    <>
      <Head title="Master | Designation" />
      <Content>
        <BlockHead size={`sm`}>
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Designation
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <div className="toggle-expand-content">
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button
                        color={`primary`}
                        onClick={() => {
                          setIsOpen(!isOpen);
                          setMode("Add");
                          resetFormData();
                        }}
                      >
                        <Icon name={`${isOpen ? "minus" : "plus"}`} />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </div>
        </BlockHead>
        <Block>
          {isOpen ? (
            <Row className={`g-gs mb-1`}>
              <Col lg={`12`} xxl={`12`}>
                <PreviewAltCard className={`h-100`}>
                  <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className={`g-gs`}>
                      <Col md={`3`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="department_name">
                            Department
                          </Label>
                          <div className="form-control-wrap">
                            <Select
                              className=""
                              id="department_name"
                              options={watch("departmentList")}
                              {...register("department_name", { required: "please select department" })}
                              onChange={handleDepartmentChange}
                              value={watch("department_name")}
                            />
                            {errors.department_name && (
                              <span
                                className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              >
                                {errors.department_name.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col md={`3`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="designaton_name">
                            Designation
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter designation"
                              type="text"
                              id="designaton_name"
                              {...register("designation_name", {
                                required: "Designation is required",
                                pattern: {
                                  value: /^[a-zA-Z ]*$/,
                                  message: "Only alphabets are allowed.",
                                },
                                minLength: {
                                  value: 3,
                                  message: "Designation name must be at least 3 characters long.",
                                },
                                maxLength: {
                                  value: 25,
                                  message: "Designation name cannot exceed 25 characters.",
                                },
                              })}
                              className="form-control"
                              value={watch("designation_name")}
                              onChange={(e) => {
                                setValue("designation_name", e.target.value);
                                trigger("designation_name");
                              }}
                            />
                            {errors.designation_name && (
                              <span className="invalid">{errors.designation_name.message}</span>
                            )}
                          </div>
                        </div>
                      </Col>

                      <Col md={`3`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="level">
                            Level
                          </Label>
                          <div className="form-control-wrap">
                            <Select
                              className=""
                              id="level"
                              options={companyLevelList}
                              {...register("level", { required: "Please select level" })}
                              onChange={handleLevelChange}
                              value={watch("level")}
                            />
                            {errors.level && (
                              <span
                                className="invalid"
                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                              >
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>
                      </Col>
                      {mode == "Edit" && (
                        <Col md={`3`}>
                          <div className="form-group">
                            <Label className="from-label" htmlFor="status">
                              Status
                            </Label>
                            <div className="form-control-wrap">
                              <Select
                                className=""
                                id="status"
                                options={[
                                  { value: true, label: "Active" },
                                  { value: false, label: "InActive" },
                                ]}
                                {...register("status", { required: "Please select status" })}
                                onChange={handleStatusChange}
                                value={watch("status")}
                              />
                              {errors.status && (
                                <span
                                  className="invalid"
                                  style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                >
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                        </Col>
                      )}
                      <Col md="3" className={``}>
                        <div className="form-group" style={{ marginTop: "31px" }}>
                          <Button color="primary" size="md" disabled={isLoading}> 
                            {isLoading ? (
                              <Spinner size="sm" color="light" />
                            ) : (
                              mode == "Edit" ? "Update" : "Add"
                            )}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </PreviewAltCard>
              </Col>
            </Row>
          ) : null}
          <MyDataTable title={"Designation List"} columns={columns} data={data} />
        </Block>
      </Content>

      <MyDeleteModal
        deleteRow={deleteRow}
        deleteModal={deleteModal}
        rowData={rowData}
        toggleDeleteModal={toggleDeleteModal}
        name={rowData?.designation_name}
      />
    </>
  );
};
