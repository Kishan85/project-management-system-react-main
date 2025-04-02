import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  TooltipComponent,
  UserAvatar,
} from "../../components/Component";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Progress, UncontrolledDropdown } from "reactstrap";
import { useForm } from "react-hook-form";
import ProjectModal from "./ProjectModal";
import { getDepartmentDDList, getDepartmentList } from "../../utils/myFunctions";
import { getDesignationDDAPI, getTeamListByDepartmentDDAPI } from "../../api/dropdowns";
import { addProjectProgressAPI, createProject, createProjectAPI, deleteProjectAPI, getProjectTableListAPI, updateProjectAPI } from "../../api/project";
import { calcPercentage, findUpper, setDeadlineDays } from "../../utils/Utils";
import DocumentModal from "./DocumentModal";
import { saveAs } from "file-saver";
import { BASE_URL_IMG } from "../../constants/myConstants";
import { toast } from "react-toastify";
import { MyDeleteModal } from "../../components/myModals/MyDeleteModal";
import useLogout from "../../utils/useLogout";
import AddProgressModal from "../../components/myModals/AddProgressModal";
const Project = () => {
  const logout = useLogout()
  const [sm, updateSm] = useState(false);
  const [row, setRow] = useState([]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [docModal, setDocModal] = useState(false)
  const [editId, setEditedId] = useState([
    { value: 1, label: "Abu Bin", theme: "purple" },
    { value: 2, label: "Newman John", theme: "primary" },
    { value: 3, label: "Milagros Betts", theme: "purple" },
    { value: 4, label: "Joshua Wilson", theme: "pink" },
    { value: 5, label: "Ryu Duke", theme: "orange" },
    { value: 6, label: "Aliah Pitts", theme: "blue" },
  ]);
  const [rowData, setRowData] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [progressModal, setProgressModal] = useState(false);
  const toggleProgressModal = () => setProgressModal(!progressModal);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [data, setData] = useState([
    // {
    //   id: 1,
    //   department_id: 17,
    //   department_name: "Quality Assurance",
    //   team_lead: "Manan",
    //   team_lead_id: "3",
    //   deadline: new Date(),
    //   start_date: new Date(),
    //   title: "MNCH Dashboard",
    //   description: "MNCH Description",
    //   team: [
    //     { value: 3, label: "Manan" },
    //     { value: 5, label: "Shubham" },
    //   ],
    // },
  ]);
  const {
    reset: reset1,
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    trigger: trigger1,
    watch: watch1,
    formState: { errors: errors1 },
  } = useForm({
    defaultValues: {
      start_date: new Date(),
      deadline: null,
      departmentList: [],
      teamList: [
        // { value: 1, label: "Abu Bin", theme: "purple" },
        // { value: 2, label: "Newman John", theme: "primary" },
        // { value: 3, label: "Manan", theme: "purple" },
        // { value: 4, label: "Joshua Wilson", theme: "pink" },
        // { value: 5, label: "Shubham", theme: "orange" },
        // { value: 6, label: "Aliah Pitts", theme: "blue" },
      ],
    },
  });

  // Form 2
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    setValue: setValue2,
    watch: watch2,
    trigger: trigger2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm();

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };
  // function to change the complete property of an item
  const selectorCompleteProject = () => {
    let newData;
    newData = data.map((item) => {
      // if (item.checked === true) item.deadline = setDeadline(0);
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteProject = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  useEffect(() => {
    getDepartmentDDList(setValue1, "departmentList");
  }, []);
  useEffect(() => {
    getProjectTableList();
  }, []);

  const getProjectTableList = () => {
    const bodyData = {
      //   current_page: currentPage,
      //   item_per_page: itemPerPage,
    };
    getProjectTableListAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.data);
        } else if (res.data.status === "failed") {
          setData([]);
        } else if (res.data.status === "expired") {
          logout(res.data.message);

        }
      })
      .catch((err) => { });
  };

  const handleDepartmentChange = (selectedOption) => {
    setValue1("department", selectedOption || "");
    trigger1("department");
    setValue1("team_list", []);
    setValue1("teamList", []);
    setValue1("team_lead", "");
    const ids = selectedOption.map((item) => item?.value?.toString());
    const idString = ids.join(",");
    console.log(idString,"ids");
    
    const bodyData = {
      department_id: idString,
    };
    console.log(bodyData,"bodydata");
    
    getTeamListByDepartmentDDAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setValue1("teamList", res.data.data);
        } else if (res.data.status === "failed") {
          setValue1("teamList", []);
        } else if (res.data.status === "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };

  const closeModal = () => {
    setModal({ add: false, edit: false });
    resetFormFields();
  };

  const closeDocModal = () => {
    setDocModal(false)
  };
  const onDocumentClick = (item) => {
    setDocModal(true);
    setRow(item);
  };

  const handleDownload = (item) => {
    console.log(item, "itemDownload");
    let url = `${BASE_URL_IMG}${item?.file}`;
    let fileName = item?.title;
    saveAs(url, fileName);
  };

  const addProgess = (item) => {
    setValue2("project_Id", item?.id)
    setValue2("progress", item?.progress)
    toggleProgressModal();
    setRow(item)

  }
  const closeProgessModal = () => {
    setProgressModal(false)
  };

  // function that loads the want to editted data
  const onEditClick = (item) => {
    setModal({ edit: true }, { add: false });
    setEditedId(item);
    setValue1("title", item?.title);
    setValue1("description", item?.description);
    setValue1("department", item?.department_name);
    setValue1("team_lead", { value: item?.team_lead_id, label: item?.team_lead });
    setValue1("team_list", item?.team);
    setValue1("deadline", new Date(item?.iso_end));
    setValue1("start_date", new Date(item?.iso_start));
  };
  const onDeleteClick = (data) => {
    toggleDeleteModal();
    setDeleteModal(true);
    setRowData(data);
  };
  const handleDelete = (data) => {
    const bodyData = {
      id: data?.id,
    };
    // console.log(data, "delete-data");
    // return false
    setDeleteModal(false);
    deleteProjectAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          getProjectTableList()
          toast.success(res.data.message);
        } else if (res.data.status === "failed") {
          toast.error(res.data.message);
        } else if (res.data.status === "expired") {
          logout(res.data.message)
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };

  // submit function to add a new item
  const onFormSubmit = (data) => {
    // console.log('data',data)
    const ids = data?.team_list.map((item) => item?.value?.toString());
    const idString = ids.join(",");
    const department_ids = data?.department?.map((item) => item?.value?.toString());
    const department_idS = department_ids.join(","); // Convert to string
    const departmentArray = department_idS.split(","); // Convert back to array

    const toLocalISO = (date) => {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDate.toISOString();
  };
  const bodyData = {
    start_date: toLocalISO(new Date(data?.start_date)),  
    deadline: toLocalISO(new Date(data?.deadline)),      
    project_title: data?.title,
    project_description: data?.description,
    team_lead_id: data?.team_lead?.value,
    department_id: departmentArray,
    team: idString,
    id: modal.edit && editId.id,
  };

  // console.log(bodyData,"submit");

  // return false
    if (modal?.add) {
      createProjectAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getProjectTableList();
            resetFormFields();
            setModal({ edit: false }, { add: false });
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
          } else if (res.data.status === "expired") {
            logout(res.data.status);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    } else if (modal?.edit) {
      updateProjectAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getProjectTableList();
            resetFormFields();
            setModal({ edit: false }, { add: false });
          } else if (res.data.status === "failed") {
            toast.error(res.data.message)
          } else if (res.data.status === "expired") {
            logout(res.data.message)
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    }
  };


  // submit add progress
  const onFormSubmit2 = (data) => {
    console.log(data, "progress data");
    const bodyData = {
      id: data.project_Id,
      progress: data.progress
    }

    addProjectProgressAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          getProjectTableList();
          resetFormFields2()
          setProgressModal(false)
        } else if (res.data.status === "failed") {
          toast.error(res.data.message)
          resetFormFields2()
        } else if (res.data.status === "expired") {
          logout(res.data.message)
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };


  const resetFormFields = () => {
    setValue1("title", "");
    setValue1("description", "");
    setValue1("department", "");
    setValue1("team_lead", "");
    setValue1("team_list", []);
    setValue1("teamList", []);
    setValue1("deadline", new Date());
    setValue1("start_date", new Date());
  };

  const resetFormFields2 = () => {
    setValue2("progress", "");
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Head title="Project List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> Projects</BlockTitle>
              <BlockDes className="text-soft">You have total {data.length} projects</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    {/* <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>Filtered By</span>
                          <Icon name="chevron-right" className="dd-indc"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Open</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Closed</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Onhold</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li> */}
                    <li className="nk-block-tools-opt" onClick={() => setModal({ add: true, edit: false })}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>Add Project</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <DataTable className={`card-stretch`}>
            <DataTableBody>
              <DataTableHead className={`nk-tb-item nk-tb-head`}>
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="pid-all"
                      onChange={(e) => selectorCheck(e)}
                    />
                    <label className="custom-control-label" htmlFor="pid-all"></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Project Name</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Department Name</span>
                </DataTableRow>
                <DataTableRow size="xl">
                  <span className="sub-text">Project Lead</span>
                </DataTableRow>
                <DataTableRow size="xl">
                  <span className="sub-text">Team</span>
                </DataTableRow>
                <DataTableRow size="mb">
                  <span className="sub-text">Start Date</span>
                </DataTableRow>
                <DataTableRow size="mb">
                  <span className="sub-text">Deadline</span>
                </DataTableRow>
                <DataTableRow size="mb">
                  <span className="sub-text">Progress</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools text-end">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="btn btn-xs btn-trigger btn-icon dropdown-toggle me-n1">
                      <Icon name="more-h"></Icon>
                    </DropdownToggle>
                    {/* <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li onClick={() => selectorCompleteProject()}>
                          <DropdownItem
                            tag="a"
                            href="#markasdone"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="check-round-cut"></Icon>
                            <span>Mark As Done</span>
                          </DropdownItem>
                        </li>
                        <li onClick={() => selectorDeleteProject()}>
                          <DropdownItem
                            tag="a"
                            href="#remove"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="trash"></Icon>
                            <span>Remove Projects</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu> */}
                  </UncontrolledDropdown>
                </DataTableRow>
              </DataTableHead>
              {currentItems.length > 0
                ? currentItems?.map((item) => {
                  var days = setDeadlineDays(new Date(item.iso_end));

                  return (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            defaultChecked={item.checked}
                            id={item.id + "pid-all"}
                            key={Math.random()}
                          // onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <a
                          href="#title"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="project-title"
                        >
                          <UserAvatar className="sq" text={findUpper(item.title)} />
                          <div className="project-info">
                            <h6 className="title">{item.title}</h6>
                          </div>
                        </a>
                      </DataTableRow>
                      <DataTableRow size="xl">
                        {/* <span>{item.department_name}</span> */}
                        <ul className="project-users g-1">
                          {item.department_name.slice(0, 2).map((member, idx) => {
                            return (
                              <li key={idx}>
                                <UserAvatar
                                  className="sm"
                                  text={findUpper(member.label)}
                                  // theme={member.theme}
                                  // image={member.image}
                                />
                              </li>
                            );
                          })}
                          {item.department_name.length > 2 && (
                            <li>
                              <UserAvatar theme="light" className="sm" text={`+${item.team.length - 2}`} />
                            </li>
                          )}
                        </ul>
                      </DataTableRow>
                      <DataTableRow size="xl">
                        <span>{item.team_lead}</span>
                      </DataTableRow>
                      <DataTableRow size="xl">
                        <ul className="project-users g-1">
                          {item.team.slice(0, 2).map((member, idx) => {
                            return (
                              <li key={idx}>
                                <UserAvatar
                                  className="sm"
                                  text={findUpper(member.label)}
                                  theme={member.theme}
                                  image={member.image}
                                />
                              </li>
                            );
                          })}
                          {item.team.length > 2 && (
                            <li>
                              <UserAvatar theme="light" className="sm" text={`+${item.team.length - 2}`} />
                            </li>
                          )}
                        </ul>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <Badge
                          className="badge-dim"
                        // color={
                        //   days > 10
                        //     ? "light"
                        //     : days <= 10 && days >= 2
                        //     ? "warning"
                        //     : days === 1
                        //     ? "danger"
                        //     : days <= 0 && "success"
                        // }
                        >
                          <Icon name="clock"></Icon>
                          <span>{item?.start_date || ""}</span>
                        </Badge>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <Badge
                          className="badge-dim"
                          color={
                            days > 10
                              ? "light"
                              : days <= 10 && days >= 2
                                ? "warning"
                                : days === 1
                                  ? "danger"
                                  : days <= 0 && "success"
                          }
                        >
                          <Icon name="clock"></Icon>
                          <span>{days <= 0 ? "Done" : days === 1 ? "Due Tomorrow" : days + " Days Left"}</span>
                        </Badge>
                      </DataTableRow>
                      <DataTableRow size="xl">
                        <div className="project-list-progress pointer" onClick={() => addProgess(item)}>
                          <Progress
                            className="progress-pill progress-md bg-light"
                            value={item?.progress}
                          ></Progress>
                          <div className="project-progress-percent">
                            {item?.progress}%
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools text-end">
                        <ul className="nk-tb-actions gx-1">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu end>
                                <ul className="link-list-opt no-bdr">
                                  <li onClick={() => onEditClick(item)}>
                                    <DropdownItem
                                      tag="a"
                                      href="#edit"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>Edit</span>
                                    </DropdownItem>
                                  </li>
                                  <li className="nk-tb-action-hidden" onClick={() => onDeleteClick(item)}>
                                    <DropdownItem
                                      tag="a"
                                      href="#delete"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      <Icon name="trash"></Icon>
                                      <span>Delete</span>
                                    </DropdownItem>
                                  </li>
                                  <li onClick={() => onDocumentClick(item)}>
                                    <DropdownItem
                                      tag="a"
                                      href="#edit"
                                      onClick={(ev) => {
                                        ev.preventDefault();

                                      }}
                                    >
                                      <Icon name="file"></Icon>
                                      <span>View Document</span>
                                    </DropdownItem>
                                  </li>
                                  {/* {days !== 0 && (
                                      <li onClick={() => completeProject(item.id)}>
                                        <DropdownItem
                                          tag="a"
                                          href="#markasdone"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="check-round-cut"></Icon>
                                          <span>Mark As Done</span>
                                        </DropdownItem>
                                      </li>
                                    )} */}
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {data.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No projects found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
      </Content>
      <ProjectModal
        modal={modal}
        closeModal={closeModal}
        onSubmit={onFormSubmit}
        handleDepartmentChange={handleDepartmentChange}
        register={register1}
        handleSubmit={handleSubmit1}
        setValue={setValue1}
        trigger={trigger1}
        watch={watch1}
        errors={errors1}
      />
      <AddProgressModal
        row={row}
        modal={progressModal}
        closeModal={closeProgessModal}
        onSubmit={onFormSubmit2}
        register={registerForm2}
        handleSubmit={handleSubmitForm2}
        setValue={setValue2}
        trigger={trigger2}
        watch={watch2}
        errors={errors2}
      />
      <DocumentModal
        row={row}
        modal={docModal}
        closeModal={closeDocModal}
        handleDownload={handleDownload}

      />
      <MyDeleteModal
        rowData={rowData}
        deleteRow={handleDelete}
        name={rowData?.title}
        deleteModal={deleteModal}
        toggleDeleteModal={toggleDeleteModal}
      />
    </>
  );
};

export default Project;
