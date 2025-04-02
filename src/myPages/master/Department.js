import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Badge, Form, Label, Spinner } from "reactstrap";
import { createDepartmentAPI, deleteDepartmentAPI, updateDepartmentAPI } from "../../api/master";
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
import { getDepartmentListTable } from "../../utils/myFunctions";
import { toast } from "react-toastify";
import useLogout from "../../utils/useLogout";
import moment from "moment";

const Department = () => {
  const logout = useLogout();
  const formClass = classNames({
    "form-validate": true,
    "is-alter": "",
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [rowData, setRowData] = useState(null);
  const [mode, setMode] = useState("Add");
  const [columns, setColumns] = useState([
    {
      name: "Department",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
          {row.status === true ? "Active" : "InActive"}
        </Badge>
      ),
      sortable: true,
    },
    // {
    //   name: "Created By",
    //   selector: (row) => moment(row.createdBy).format('DD-MMM-YYYY'),
    //   sortable: true,
    // },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format('DD-MMM-YYYY'),
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
  const userToken = localStorage.getItem("accessToken");

  const handleEdit = (data) => {
    setMode("Edit");
    setIsOpen(true);
    setRowData(data);
    setValue("status", {
      value: data.status === true ? true : false,
      label: data.status === true ? "Active" : "InActive",
    });
    setValue("department_name", data.name);
  };
  const handleDelete = (data) => {
    toggleDeleteModal();
    setIsOpen(false);
    setDeleteModal(true);
    setRowData(data);
  };
  const deleteRow = (data) => {
    setIsLoading(true);
    const bodyData = {
      id: data.id,
    };
    setDeleteModal(false);
    deleteDepartmentAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          getDepartmentListTable(setData);
          toast.success(res.data.message);
          setIsLoading(false);
          toast.clearWaitingQueue();
        } else if (res.data.status == "failed") {
          toast.error(res.data.message);
          setIsLoading(false);
          toast.clearWaitingQueue();
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };
  const handleStatusChange = (selectedOption) => {
    setValue("status", selectedOption || "");
    trigger("status");
  };
  const onFormSubmit = (e) => {
    setIsLoading(true)
    const stat = watch("status");
    if (mode === "Edit") {
      const bodyData = {
        id: rowData.id,
        name: watch("department_name"),
        status: stat?.value,
      };
      updateDepartmentAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getDepartmentListTable(setData);
            toast.success(res.data.message);
            setIsOpen(false);
            reset();
            setIsLoading(false)
          } else if (res.data.status == "failed") {
            toast.error(res.data.message);
          } else if (res.data.status == "expired") {
            logout(res.data.message);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    } else {
      const bodyData = {
        name: watch("department_name"),
        // status: stat?.value,
      };
      createDepartmentAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getDepartmentListTable(setData);
            toast.success(res.data.message);
            toast.clearWaitingQueue();
            setIsOpen(false);
            reset();
            setIsLoading(false)
          } else if (res.data.status == "failed") {
            toast.error(res.data.message);
            toast.clearWaitingQueue();
            setIsLoading(false)
          } else if (res.data.status == "expired") {
            logout(res.data.message);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    }
  };
  useEffect(() => {
    getDepartmentListTable(setData);
  }, []);
  return (
    <>
      <Head title="Master | Department" />
      <Content>
        <BlockHead size={`sm`}>
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Department
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
                          reset();
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
                      <Col md={`5`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="department_name">
                            Department
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter Department"
                              type="text"
                              id="department_name"
                              {...register("department_name", {
                                required: "Department name is required",
                                pattern: {
                                  value: /^[a-zA-Z /.]*$/,
                                  message: "Only alphabets are allowed.",
                                },
                                minLength: {
                                  value: 2,
                                  message: "Department name must be at least 2 characters long.",
                                },
                                maxLength: {
                                  value: 50,
                                  message: "Department name cannot exceed 50 characters.",
                                },
                              })}
                              className="form-control"
                              value={watch("department_name")}
                              onChange={(e) => {
                                setValue("department_name", e.target.value);
                                trigger("department_name");
                              }}
                            />
                            {errors.department_name && (
                              <span className="invalid">{errors?.department_name?.message}</span>
                            )}
                          </div>
                        </div>
                      </Col>
                      {mode == "Edit" && (
                        <Col md={`5`}>
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
                                  {errors?.status?.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </Col>
                      )}
                      <Col md="2" className={``}>
                        <div className="form-group" style={{ marginTop: "31px" }}>
                          <Button color="primary" size="md" disabled={isLoading}>
                            {isLoading ? (
                              <Spinner size="sm" color="light" />
                            ) : (
                              mode == "Add" ? "Save" : "Update"
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

          <MyDataTable title={"Department List"} columns={columns} data={data} isLoading={isLoading} />
        </Block>
      </Content>
      <MyDeleteModal
        rowData={rowData}
        deleteRow={deleteRow}
        name={rowData?.department_name}
        deleteModal={deleteModal}
        toggleDeleteModal={toggleDeleteModal}
      />
    </>
  );
};

export default Department;
