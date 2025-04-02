import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MyDeleteModal } from "../../components/myModals/MyDeleteModal";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
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
  RSelect,
} from "../../components/Component";
import { Badge, Form, Label, Spinner } from "reactstrap";
import MyDataTable from "../../components/table/MyDataTable";
import classNames from "classnames";
import { createPriorityAPI, deletePriorityAPI, updatePriorityAPI } from "../../api/master";
import { getPriorityListTable } from "../../utils/myFunctions";
import { ColorOptions } from "../../components/partials/color-select-menu/ColorMenu";
import { themes } from "../../pages/app/kanban/KanbanData";
import { toast } from "react-toastify";
import useLogout from "../../utils/useLogout";
import moment from "moment";

const Priority = () => {
  const logout = useLogout()
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("Add");
  const [data, setData] = useState([
    {
      priority: "High",
      id: 1,
      color_name: "Info",
      color_id: "info",
      status: true,
      //   createdAt: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
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
  const [columns, setColumns] = useState([
    {
      name: "Priority",
      selector: (row) => row.priority_name,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => (
        <div className="d-flex" style={{ textTransform: "capitalize" }}>
          <span className={`dot dot-${row?.color_code} m-1 `}></span>
          {row?.color_code}
        </div>
      ),
      sortable: true,
    },

    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format('DD-MMM-YYYY'),
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
  const handleStatusChange = (selectedOption) => {
    setValue("status", selectedOption || "");
    trigger("status");
  };
  const handleEdit = (data) => {
    setMode("Edit");
    setIsOpen(true);
    setRowData(data);
    setValue("status", {
      value: data.status === true ? true : false,
      label: data.status === true ? "Active" : "InActive",
    });
    setValue("priority", data?.priority_name);

    setValue("color", themes.find(color => color.value === data?.color_code));
  };
  const deleteRow = (data) => {
    setIsLoading(true);
    const bodyData = {
      id: data.id,
    };
    setDeleteModal(false);
    deletePriorityAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setIsLoading(false);
          getPriorityListTable(setData);
          toast.success(res.data.message);
        } else if (res.data.status == "failed") {
          toast.error(res.data.message);
          setIsLoading(false);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };
  const handleDelete = (data) => {
    toggleDeleteModal();
    setIsOpen(false);
    setDeleteModal(true);
    setRowData(data);
  };
  const onFormSubmit = (e) => {
    setIsLoading(true);
    if (mode === "Edit") {
      const bodyData = {
        id: rowData.id,
        priority_name: watch("priority"),
        color_name: watch("color")?.value,
        status: e?.status?.value,
      };
      updatePriorityAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getPriorityListTable(setData);
            toast.success(res.data.message);
            setIsOpen(false);
            reset();
            setIsLoading(false);
            toast.clearWaitingQueue()
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
            setIsLoading(false);
            toast.clearWaitingQueue()
          } else if (res.data.status === 'expired') {
            logout(res.data.message);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    } else {
      const bodyData = {
        priority_name: watch("priority"),
        color_name: watch("color")?.value,
      };
      // console.log("e", e, watch("color"));
      createPriorityAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getPriorityListTable(setData);
            toast.success(res.data.message);
            setIsOpen(false);
            reset();
            isLoading(false)
            toast.clearWaitingQueue();
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
            isLoading(false)
            toast.clearWaitingQueue();
          } else if(res.data.status === "expired"){
            logout(res.data.status)
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    }
  };
  useEffect(() => {
    getPriorityListTable(setData);
  }, []);
  return (
    <>
      <Head title="Master | Priority" />
      <Content>
        <BlockHead size={`sm`}>
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Priority
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
          {isOpen && (
            <Row className={`g-gs mb-1`}>
              <Col lg={`12`} xxl={`12`}>
                <PreviewAltCard className={`h-100`}>
                  <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className={`g-gs`}>
                      <Col md={`4`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="priority">
                            Name
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter priority"
                              type="text"
                              id="priority"
                              {...register("priority", {
                                required: "Name is required",
                                pattern: {
                                  value: /^[a-zA-Z ]*$/,
                                  message: "Only alphabets are allowed.",
                                },
                                minLength: {
                                  value: 2,
                                  message: "Name must be at least 3 characters long.",
                                },
                                maxLength: {
                                  value: 25,
                                  message: "Name cannot exceed 25 characters.",
                                },
                              })}
                              className="form-control"
                              value={watch("priority")}
                              onChange={(e) => {
                                setValue("priority", e.target.value);
                                trigger("priority");
                              }}
                            />
                            {errors.priority && <span className="invalid">{errors?.priority?.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md={`4`}>
                        <div className="form-group">
                          <label className="form-label">Select Color</label>
                          <div className="form-control-select">
                            <RSelect
                              className="react-select-container"
                              classNamePrefix="react-select"
                              formatOptionLabel={ColorOptions}
                              options={themes}
                              {...register("color", {
                                required: "Color is required",
                              })}
                              value={watch("color")}
                              onChange={(e) => {
                                setValue("color", e);
                                trigger("color");
                              }}
                            />
                            {errors.color && <span className="invalid">{errors?.color?.message}</span>}
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
                              <RSelect
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
                      <Col md="2" className={``}>
                        <div className="form-group" style={{ marginTop: "31px" }}>
                          <Button color="primary" size="md">
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
              </Col>{" "}
            </Row>
          )}
          <MyDataTable title={"Priority List"} columns={columns} data={data} isLoading={isLoading} />
        </Block>
      </Content>
      <MyDeleteModal
        rowData={rowData}
        deleteRow={deleteRow}
        name={rowData?.name}
        deleteModal={deleteModal}
        toggleDeleteModal={toggleDeleteModal}
      />
    </>
  );
};

export default Priority;
