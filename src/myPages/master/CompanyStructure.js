import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import Select from "react-select";
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
import { useForm } from "react-hook-form";
import { Badge, Form, Label, Spinner } from "reactstrap";
import classNames from "classnames";
import MyDataTable from "../../components/table/MyDataTable";
import { createCompanyStructureAPI, deleteCompanyStructureAPI, updateCompanyStructureAPI } from "../../api/master";
import { getCompanyStructureListTable } from "../../utils/myFunctions";
import { toast } from "react-toastify";
import { MyDeleteModal } from "../../components/myModals/MyDeleteModal";
import { Link } from "react-router-dom";
import useLogout from "../../utils/useLogout";
import moment from "moment";

const CompanyStructure = () => {
  const logout = useLogout()
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("Add");
  const [data, setData] = useState([]);
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("DD-MMM-YYYY"),
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

  const handleEdit = (data) => {
    setMode("Edit");
    setIsOpen(true);
    setRowData(data);

    setValue("name", data?.name);
    setValue("level", data?.level);
  };
  const deleteRow = (data) => {
    const bodyData = {
      id: data.id,
    };
    setDeleteModal(false);
    deleteCompanyStructureAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          getCompanyStructureListTable(setData);
          toast.success(res.data.message);
        } else if (res.data.status == "failed") {
          toast.error(res.data.message);
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
    setIsLoading(true)
    const stat = watch("status");
    if (mode === "Edit") {
      const bodyData = {
        id: rowData.id,
        name: watch("name"),
        level: watch("level"),
      };
      updateCompanyStructureAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getCompanyStructureListTable(setData);
            toast.success(res.data.message);
            toast.clearWaitingQueue();
            setIsOpen(false);
            reset();
            setIsLoading(false)
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
            toast.clearWaitingQueue();
            setIsOpen(false);
            setIsLoading(false)
            reset();
          } else if (res.data.status == "expired") {
            logout(res.data.message);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    } else {
      const bodyData = {
        name: watch("name"),
        level: watch("level"),
      };
      createCompanyStructureAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getCompanyStructureListTable(setData);
            toast.success(res.data.message);
            setIsOpen(false);
            reset();
            setIsLoading(false);
          } else if (res.data.status == "failed") {
            toast.error(res.data.message);
            setIsLoading(false)
            toast.clearWaitingQueue();
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
    getCompanyStructureListTable(setData);
  }, []);
  return (
    <>
      <Head title="Master | Company Structure" />
      <Content>
        <BlockHead size={`sm`}>
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Company Structure
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
                    <li className="nk-block-tools-opt">
                      <Link to={"/company-structure"}>
                        <Button
                          color={`primary`}
                        >
                          Company Structure
                        </Button></Link>
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
                          <Label className="from-label" htmlFor="name">
                            Name
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter name"
                              type="text"
                              id="name"
                              {...register("name", {
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
                              value={watch("name")}
                              onChange={(e) => {
                                setValue("name", e.target.value);
                                trigger("name");
                              }}
                            />
                            {errors.name && <span className="invalid">{errors?.name?.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md={`4`}>
                        <div className="form-group">
                          <Label className="from-label" htmlFor="level">
                            Level
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              placeholder="Enter level"
                              type="text"
                              id="level"
                              {...register("level", {
                                required: "Level is required",
                                // pattern: {
                                //   value: /^[1-9]*$/,
                                //   message: "Only above 0 number are allowed.",
                                // },
                                // minLength: {
                                //   value: 1,
                                //   message: "Level must be at least 1 characters long.",
                                // },
                                // maxLength: {
                                //   value: 3,
                                //   message: "Level cannot exceed 3 characters.",
                                // },
                              })}
                              className="form-control"
                              value={watch("level")}
                              onChange={(e) => {
                                setValue("level", e.target.value);
                                trigger("level");
                              }}
                            />
                            {errors.level && <span className="invalid">{errors?.level?.message}</span>}
                          </div>
                        </div>
                      </Col>

                      <Col md="2" className={``}>
                        <div className="form-group" style={{ marginTop: "31px" }}>
                          <Button color="primary" size="md"
                            disabled={isLoading}
                          >
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
          <MyDataTable title={"Company Structure List"} columns={columns} data={data} isLoading={isLoading} />
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

export default CompanyStructure;
