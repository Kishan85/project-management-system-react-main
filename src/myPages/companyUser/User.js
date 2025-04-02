import React, { useEffect, useState } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockContent,
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
  RSelect,
  TooltipComponent,
  UserAvatar,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { bulkActionOptions, findUpper } from "../../utils/Utils";
import UserModal from "./UserModal";
import { filterStatus } from "../../pages/pre-built/user-manage/UserData";
import { getDepartmentList } from "../../utils/myFunctions";
import { deleteEmployeeAPI, getEmployeeTableListAPI, registerEmployeeAPI, updateEmployeeAPI } from "../../api/employee";
import { useForm } from "react-hook-form";
import { getDesignationDDAPI, getReportToDDAPI } from "../../api/dropdowns";
import { useNavigate } from "react-router";
import useLogout from "../../utils/useLogout";
import { toast } from "react-toastify";
import { MyDeleteModal } from "../../components/myModals/MyDeleteModal";

const User = () => {
  const [data, setData] = useState([
    // {
    //   id: 1,
    //   avatarBg: "purple",
    //   name: "Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: true,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "Abu Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: " Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "shtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "htiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "tiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "Abu Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
  ]);
  const [userData, setUserData] = useState([
    // {
    //   id: 1,
    //   avatarBg: "purple",
    //   name: "Abu Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: true,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "Abu Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "Abu Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "u Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "bu Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
    // {
    //   id: 2,
    //   avatarBg: "purple",
    //   name: "Abu Bin Ishtiyak",
    //   displayName: "Ishtiak",
    //   dob: "10 Aug, 1980",
    //   role: "Customer",
    //   checked: false,
    //   email: "manan@quaeretech.com",
    //   balance: "35040.34",
    //   phone: "818474958",
    //   emailStatus: "success",
    //   kycStatus: "success",
    //   lastLogin: "10 Feb 2020",
    //   status: false,
    //   address: "2337 Kildeer Drive",
    //   state: "Kentucky",
    //   country: "Canada",
    //   designation_name: "Intern",
    //   report_to: "Team Lead",
    //   department_name: "UI/UX Designer",
    //   projects: "213",
    //   performed: "87.5",
    //   tasks: "587",
    //   last_login: "30-Jan-2025",
    // },
  ]);
  const [rowData, setRowData] = useState(null);
  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [departmentList, setDepartmentList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [reportToList, setReportToList] = useState([]);
  const [onSearchText, setSearchText] = useState("");
  const [editId, setEditedId] = useState();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: {},
    department: {},
    reported_to: [],
    status: "Active",
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(3);
  const [sort, setSortState] = useState("");
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      departmentList: [],
    },
  });
  const logout = useLogout()
  const navigate = useNavigate();
  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.first_name.localeCompare(b.first_name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.first_name.localeCompare(a.first_name));
      setData([...sortedData]);
    }
  };
  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };
  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData?.filter((item) => {
        return (
          item?.first_name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item?.last_name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item?.designation_name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item?.last_login.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item?.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...userData]);
    }
  }, [onSearchText, setData]);
  
  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  // function which fires on applying selected action
  const onActionClick = (e) => {
    if (actionText === "suspend") {
      let newData = data.map((item) => {
        if (item.checked === true) item.status = "Suspend";
        return item;
      });
      setData([...newData]);
    } else if (actionText === "delete") {
      let newData;
      newData = data.filter((item) => item.checked !== true);
      setData([...newData]);
    }
  };
  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };
  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };
  const closeModal = () => {
    setModal({ add: false, edit: false });
    resetFormData();
  };
  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // submit function to add a new item
  const onFormSubmit = (submitData) => {

    if (modal?.edit) {
      const bodyData = {
        fname: submitData?.fname,
        lname: submitData?.lname,
        email: submitData?.email,
        mobile: submitData?.phone,
        department: submitData?.department?.value,
        designation: submitData?.designation?.value,
        report_to: submitData?.report_to?.value || 0,
        id: modal.edit && editId,
      };
      console.log(bodyData, "editdata");
      // return false
      updateEmployeeAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            getEmployeeList()
            resetFormData();
            setModal({ edit: false }, { add: false });
          } else if (res.data.status == "failed") {
            setData([])
          } else if (res.data.status == "expired") {
            logout(res.data.message);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    } else {
      const bodyData = {
        fname: submitData?.fname,
        lname: submitData?.lname,
        email: submitData?.email,
        mobile: submitData?.phone,
        department: submitData?.department?.value,
        designation: submitData?.designation?.value,
        report_to: submitData?.report_to?.value || 0,
      };
      registerEmployeeAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            toast.success(res.data.message);
            getEmployeeList()
            resetFormData();
            setModal({ edit: false }, { add: false });
          } else if (res.data.status == "failed") {
            setData([]);
            toast.error(res.data.message);
          } else if (res.data.status == "expired") {
            logout(res.data.message);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    }
  };
  const onDeleteClick = (data) => {
    toggleDeleteModal();
    setDeleteModal(true);
    setRowData(data);

  };
  const handleDelete = (data) => {
    const bodyData = {
      id: data.id,
    };
    // console.log(data,"delete-data");
    // return false
    setDeleteModal(false);
    deleteEmployeeAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          getEmployeeList()
          toast.success(res.data.message);
        }else if (res.data.status == "failed") {
          toast.error(res.data.message);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };
  // function that loads the want to editted data
  const onEditClick = (item) => {
    console.log(item, "edit-item");
    setModal({ edit: true }, { add: false });
    setEditedId(item?.id);
    setValue("fname", item.first_name);
    setValue("lname", item?.last_name);
    setValue("email", item?.email);
    setValue("phone", item?.phone);
    setValue("department", { value: item?.department_id, label: item?.department_name });
    setValue("designation", { value: item?.designation_id, label: item?.designation_name });
    setValue("report_to", { value: item?.report_to_id, label: item?.report_to_name });
    handleDepartmentChangeEdit({ value: item?.department_id, label: item?.department_name });
    // designation: submitData?.designation?.value,
    // report_to: submitData?.report_to?.value,
    // data.forEach((item) => {
    //   if (item.id === id) {
    //     setEditFormData({
    //       name: item.name,
    //       email: item.email,
    //       status: item.status,
    //       phone: item.phone,
    //       balance: item.balance,
    //     });
    //     setModal({ edit: true }, { add: false });
    //     setEditedId(id);
    //   }
    // });
  };


  const onPermissonClick = (row) => {
    navigate(`${process.env.PUBLIC_URL}/user-permission`, {
      state: row,
    });
    console.log(row, "rowData");

  }
  // getting initial data for the page
  useEffect(() => {
    getDepartmentList(setDepartmentList, setValue, "departmentList");
  }, []);
  useEffect(() => {
    getEmployeeList();
  }, [currentPage]);
  const getEmployeeList = () => {
    const bodyData = {
      current_page: currentPage,
      item_per_page: itemPerPage,
    };
    getEmployeeTableListAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.data);
          setUserData(res.data.data);
          toast.success(res.data.message);
          toast.clearWaitingQueue();
        } else if (res.data.status == "failed") {
          setData([]);
          setUserData([]);
          toast.error(res.data.message);
          toast.clearWaitingQueue();
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => { });
  };

  const handleDepartmentChange = (selectedOption) => {
    setValue("department", selectedOption || "");
    trigger("department");
    setValue("designation", "");
    trigger("designation");
    setValue("report_to", "");
    trigger("report_to");
    setReportToList([]);
    const bodyData = {
      department_id: selectedOption?.value,
    };
    getDesignationDDAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setDesignationList(res.data.data);
          // toast.success(res.data.message);
        } else if (res.data.status == "failed") {
          setDesignationList([]);
          // toast.error(res.data.message);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };
  const handleDepartmentChangeEdit = (selectedOption) => {
    setValue("department", selectedOption || "");
    trigger("department");
    const bodyData = {
      department_id: selectedOption?.value,
    };
    getDesignationDDAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setDesignationList(res.data.data);
          // toast.success(res.data.message);
        } else if (res.data.status == "failed") {
          setDesignationList([]);
          // toast.error(res.data.message);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };

  const handleDesignationChange = (selectedOption) => {
    setValue("designation", selectedOption || "");
    trigger("designation");
    setValue("report_to", "");
    trigger("report_to");
    setReportToList([]);
    const bodyData = {
      designation_id: selectedOption?.value,
      department_id: watch("department")?.value,
      designation_level: watch("designation")?.level,
    };
    getReportToDDAPI(bodyData)
      .then((res) => {
        if (res.data.status === "success") {
          setReportToList(res.data.data);
          toast.success(res.data.message);
        } else if (res.data.status == "failed") {
          setReportToList([]);
          toast.error(res.data.message);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };

  const resetFormData = () => {
    setEditedId(null);
    setValue("fname", "");
    setValue("lname", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("department", "");
    setValue("designation", "");
    setValue("report_to", "");
    clearErrors()
  };

  const Name = `${rowData?.first_name} ${rowData?.last_name}`
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Head title="Manage User" />
      <Content>
        <BlockHead size={`lg`}>
          <BlockContent>
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle page tag="h3">
                  Employee Lists
                </BlockTitle>
                <BlockDes className={`text-soft`}>
                  <p>You have total {data?.length} employee.</p>
                </BlockDes>
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
                      <li>
                        <Button color="light" outline className="btn-white">
                          <Icon name="download-cloud"></Icon>
                          <span>Export</span>
                        </Button>
                      </li>
                      <li className="nk-block-tools-opt">
                        <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                          <Icon name="plus"></Icon>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockContent>
        </BlockHead>
        <Block>
          <DataTable className={"card-stretch"}>
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">
                    <div className="form-wrap">
                      <RSelect
                        options={bulkActionOptions}
                        className="w-130px"
                        placeholder="Bulk Action"
                        onChange={(e) => onActionText(e)}
                      />
                    </div>
                    <div className="btn-wrap">
                      <span className="d-none d-md-block">
                        <Button
                          disabled={actionText !== "" ? false : true}
                          color="light"
                          outline
                          className="btn-dim"
                          onClick={(e) => onActionClick(e)}
                        >
                          Apply
                        </Button>
                      </span>
                      <span className="d-md-none">
                        <Button
                          color="light"
                          outline
                          disabled={actionText !== "" ? false : true}
                          className="btn-dim btn-icon"
                          onClick={(e) => onActionClick(e)}
                        >
                          <Icon name="arrow-right"></Icon>
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                          onClick={() => updateTableSm(true)}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle color="tranparent" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <Icon name="setting"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end className="dropdown-menu-xs">
                                  <ul className="link-check">
                                    <li>
                                      <span>Show</span>
                                    </li>

                                    <li className={itemPerPage === 10 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(10);
                                        }}
                                      >
                                        10
                                      </DropdownItem>
                                    </li>
                                    <li className={itemPerPage === 25 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(25);
                                        }}
                                      >
                                        25
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                  <ul className="link-check">
                                    <li>
                                      <span>Order</span>
                                    </li>
                                    <li className={sort === "dsc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("dsc");
                                          sortFunc("dsc");
                                        }}
                                      >
                                        DESC
                                      </DropdownItem>
                                    </li>
                                    <li className={sort === "asc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("asc");
                                          sortFunc("asc");
                                        }}
                                      >
                                        ASC
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Search by user or email"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DataTableBody>
              <DataTableHead>
                <DataTableRow className={"nk-tb-col-check"}>
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      onChange={(e) => selectorCheck(e)}
                      id="uid"
                    />
                    <label className="custom-control-label" htmlFor="uid"></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Employee</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Department</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Designation</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Report To</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">Phone</span>
                </DataTableRow>
                <DataTableRow size="xl">
                  <span className="sub-text">Last Login</span>
                </DataTableRow>
                {/* <DataTableRow size="md">
                  <span className="sub-text">Status</span>
                </DataTableRow> */}
                <DataTableRow size="xl">
                  <span className="sub-text" style={{ width: "45px" }}></span>
                </DataTableRow>
              </DataTableHead>
              {currentItems?.length > 0
                ? currentItems?.map((item) => {
                  return (
                    <DataTableItem key={item?.id}>
                      <DataTableRow className={`nk-tb-col-check`}>
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            defaultChecked={item.checked}
                            id={item.id + "uid1"}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        {/* <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item.id}`}> */}
                        <div className="user-card">
                          <UserAvatar
                            theme={item.avatarBg}
                            text={findUpper(item?.displayName)}
                            image={item?.image}
                          ></UserAvatar>
                          <div className="user-info">
                            <span className="tb-lead">
                              {item?.first_name} {item?.last_name}
                              <span
                                className={`dot dot-${item.status
                                  ? "success"
                                  : // : item.status === "Pending"
                                  // ? "warning"
                                  "danger"
                                  } d-md-none ms-1`}
                              ></span>
                            </span>
                            <span>{item?.email}</span>
                          </div>
                        </div>
                        {/* </Link> */}
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span>{item.department_name}</span>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span>{item.designation_name}</span>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span>{item.report_to_name}</span>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span>{item.phone}</span>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span>{item.last_login}</span>
                      </DataTableRow>
                      {/* <DataTableRow size="md">
                        <span className={`tb-status text-${item.status ? "success" : "danger"}`}>
                          {item.status ? "Active" : "InActive"}
                        </span>
                      </DataTableRow> */}
                      <DataTableRow className="nk-tb-col-tools" size="lg" >
                        <ul className="nk-tb-actions">
                          <li className="nk-tb-action-hidden" onClick={() => onEditClick(item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + item.id}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Edit"
                            />
                          </li>
                          <li className="nk-tb-action-hidden" onClick={() => onDeleteClick(item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delete" + item.id}
                              icon="trash-fill"
                              direction="top"
                              text="Delete"
                            />
                          </li>
                          <li className="nk-tb-action-hidden" onClick={() => onPermissonClick(item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"permisson" + item.id}
                              icon="lock-alt-fill"
                              direction="top"
                              text="Permission"
                            />
                          </li>
                          {/* {item.status !== "Suspend" && (
                              <React.Fragment>
                                <li className="nk-tb-action-hidden" onClick={() => suspendUser(item.id)}>
                                  <TooltipComponent
                                    tag="a"
                                    containerClassName="btn btn-trigger btn-icon"
                                    id={"suspend" + item.id}
                                    icon="user-cross-fill"
                                    direction="top"
                                    text="Suspend"
                                  />
                                </li>
                              </React.Fragment>
                            )} */}
                          {/* <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    <li onClick={() => onEditClick(item.id)}>
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
                                    {item.status !== "Suspend" && (
                                      <React.Fragment>
                                        <li className="divider"></li>
                                        <li onClick={() => suspendUser(item.id)}>
                                          <DropdownItem
                                            tag="a"
                                            href="#suspend"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="na"></Icon>
                                            <span>Suspend User</span>
                                          </DropdownItem>
                                        </li>
                                      </React.Fragment>
                                    )}
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li> */}
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {currentItems.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data?.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>

        <UserModal
          modal={modal}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onFormSubmit}
          closeModal={closeModal}
          filterStatus={filterStatus}
          setDesignationList={setDesignationList}
          designationList={designationList}
          reportToList={reportToList}
          setReportToList={setReportToList}
          reset={reset}
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          trigger={trigger}
          watch={watch}
          errors={errors}
          handleDepartmentChange={handleDepartmentChange}
          handleDesignationChange={handleDesignationChange}
        />
      </Content>
      <MyDeleteModal
        rowData={rowData}
        deleteRow={handleDelete}
        name={Name}
        deleteModal={deleteModal}
        toggleDeleteModal={toggleDeleteModal}
      />
    </>
  );
};

export default User;
