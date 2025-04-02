import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
    DataTableRow
} from "../../components/Component";

import { Tooltip } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { getRolePermissionListAPI, getRoleTypeAPI, getUserPermissionListAPI, saveUserPermissionAPI } from "../../api/permission";
import useLogout from "../../utils/useLogout";

const initialData = [
    {
        "menu_id": 1,
        "menu_name": "Dashboard",
        "sub_menu": "",
        "submenu_id": "",
        "isCreate": false,
        "isView": false,
        "isUpdate": false
    },
    {
        menu_id: 2,
        menu_name: "Task Report",
        sub_menu: "",
        isCreate: false,
        isView: false,
        isUpdate: false,
        submenu_id: 2,
    },
    {
        menu_id: 3,
        menu_name: "Masters",
        sub_menu: "Company Structure",
        isCreate: false,
        isView: true,
        isUpdate: false,
        submenu_id: 1,
    },
    {
        menu_id: 3,
        menu_name: "Masters",
        sub_menu: "Department",
        isCreate: false,
        isView: true,
        isUpdate: false,
        submenu_id: 2,
    },
    {
        menu_id: 3,
        menu_name: "Masters",
        sub_menu: "Designation",
        isCreate: true,
        isView: true,
        isUpdate: false,
        submenu_id: 3,
    },
    {
        menu_id: 3,
        menu_name: "Masters",
        sub_menu: "Priority",
        isCreate: true,
        isView: false,
        isUpdate: false,
        submenu_id: 4,
    },
    {
        menu_id: 4,
        menu_name: "Manage User",
        sub_menu: "User",
        isCreate: false,
        isView: false,
        isUpdate: true,
        submenu_id: 1,
    },
    {
        menu_id: 5,
        menu_name: "Manage Project",
        sub_menu: "Projects",
        isCreate: false,
        isView: false,
        isUpdate: false,
        submenu_id: 1,
    },
    {
        menu_id: 6,
        menu_name: "Manage Task",
        sub_menu: "Task",
        isCreate: false,
        isView: false,
        isUpdate: false,
        submenu_id: 1,
    },
];

const UserPermission = () => {
    const logout = useLogout();
    const [progress, setProgress] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRoleOption, setSelectedRoleOption] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [tooltipOpen, setOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState([]);
    const location = useLocation()
    const userToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const toggle = () => {
        setOpen(!tooltipOpen);
    };
    const tokenHeader = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${userToken}`,
        },
    };
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const saveMenu = (data) => {
        const bodyData = {
            name: data.name,
            order: data.order,
        };
        console.log("Body", bodyData);
    };
    //getRolePermissionList Table
    const getRolePermissionList = () => {
        getRolePermissionListAPI(tokenHeader)
            .then((res) => {
                if (res.data.status === "success") {
                    setIsLoading(false);
                    setData(res.data.data);
                } else if (res.data.status === "failed") {
                    setIsLoading(false);
                } else if (res.data.status === "expired") {
                    logout(res.data.message)
                }
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        handleRoleChange(location?.state);
        // const incrementProgress = () => {
        //   if (progress < 95) {
        //     setProgress(progress + 1); // Increment the progress value
        //   }
        // };

        // const interval = setInterval(incrementProgress, 150); // Adjust the interval duration

        // // Clean up the interval when the component unmounts
        // return () => {
        //   clearInterval(interval);
        // };
    }, []);
    // function to change the check property of an item
    const selectorCheckCreate = (e) => {
        let newData;
        newData = data.map((item) => {
            item.isCreate = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
        setUpdatedData([...data])
    };
    // function to change the selected property of an item
    const onSelectChangeCreate = (e, uniqueId) => {
        // let newData = data;
        // let index = newData.findIndex((item) => item.id === id);
        // newData[index].create = e.currentTarget.checked;
        // setData([...newData]);
        let index = data.findIndex((item) => item.uniqueId === uniqueId);
        if (index !== -1) {
            let newData = [...data];
            newData[index].isCreate = e.currentTarget.checked;
            setData(newData);
            // Update the updatedData state
            let updatedItemIndex = updatedData.findIndex((item) => item.uniqueId === uniqueId);
            if (updatedItemIndex !== -1) {
                let updatedDataCopy = [...updatedData];
                updatedDataCopy[updatedItemIndex] = newData[index];
                setUpdatedData(updatedDataCopy);
            } else {
                setUpdatedData([...updatedData, newData[index]]);
            }
        } else {
            console.log("hi! from else block!");
        }
    };
    // function to change the check property of an item
    const selectorCheckView = (e) => {
        let newData;
        newData = data.map((item) => {
            item.isView = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
        setUpdatedData([...data])
    };
    // function to change the selected property of an item
    const onSelectChangeView = (e, uniqueId) => {
        // let newData = data;
        // let index = newData.findIndex((item) => item.id === id);
        // newData[index].view = e.currentTarget.checked;
        // setData([...newData]);
        let index = data.findIndex((item) => item.uniqueId === uniqueId);
        if (index !== -1) {
            let newData = [...data];
            newData[index].isView = e.currentTarget.checked;
            setData(newData);
            // Update the updatedData state
            let updatedItemIndex = updatedData.findIndex((item) => item.uniqueId === uniqueId);
            if (updatedItemIndex !== -1) {
                let updatedDataCopy = [...updatedData];
                updatedDataCopy[updatedItemIndex] = newData[index];
                setUpdatedData(updatedDataCopy);
            } else {
                setUpdatedData([...updatedData, newData[index]]);
            }
        } else {
            console.log("hi! from else block!");
        }
    };
    // function to change the check property of an item
    const selectorCheckUpdate = (e) => {
        let newData;
        newData = data.map((item) => {
            item.isUpdate = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
        setUpdatedData([...data])
    };

    const onSelectChangeUpdate = (e, uniqueId) => {
        let index = data.findIndex((item) => item.uniqueId === uniqueId);
        if (index !== -1) {
            let newData = [...data];
            newData[index].isUpdate = e.currentTarget.checked;
            setData(newData);
            // Update the updatedData state
            let updatedItemIndex = updatedData.findIndex((item) => item.uniqueId === uniqueId);
            if (updatedItemIndex !== -1) {
                let updatedDataCopy = [...updatedData];
                updatedDataCopy[updatedItemIndex] = newData[index];
                setUpdatedData(updatedDataCopy);
            } else {
                setUpdatedData([...updatedData, newData[index]]);
            }
        } else {
            console.log("hi! from else block!");
        }
    };
    const handleRoleChange = (e) => {
        setSelectedRoleOption(e?.value);
        setIsLoading(true);
        setProgress(75);
        const bodyData = e;
        setUpdatedData([])
        getUserPermissionListAPI(bodyData, tokenHeader)
            .then((res) => {
                if (res.data.status === "success") {
                    setIsLoading(false);
                    setProgress(95);
                    const updatedData = res?.data?.data?.map((item) => ({
                        ...item,
                        uniqueId: item.sub_menu ? `${item.menu_id}_${item.sub_menu}` : item.menu_id,
                    }));
                    setData(updatedData);
                } else if (res.data.status === "failed") {
                    setIsLoading(false);
                    toast.error(res.data.message)
                } else if (res.data.status === "success") {
                    logout(res.data.message)
                }
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const onActionClick = (e) => {
        e.preventDefault();
        const bodyData = {
            employee_id: location?.state?.employee_id,
            designation_id: location?.state?.designation_id,
            data: data
        }
        // console.log(bodyData, "bodyData");

        setIsLoading(true)
        setProgress(75)
        saveUserPermissionAPI(bodyData).then((res) => {
            if (res.data.status === "success") {
                setIsLoading(false)
                setProgress(95)
                navigate(`${process.env.PUBLIC_URL}/user`);
                toast.success(res.data.message)
                handleRoleChange(location?.state)
            } else if (res.data.status === "failed") {
                toast.error(res.data.message)
                setIsLoading(false)
                setProgress(0)
            } else if (res.data.status === "expired") {
                logout(res.data.message)
            }
        }).catch((err) => {
            setIsLoading(false);
        });
    };

    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const Name = location?.state?.first_name + " " + location?.state?.last_name

    // console.log(Name,"Name");

    return (
        <>
            <Head title="User Permission | Menu" />
            <Content>
                <BlockHead className={`${isLoading ? "myclass" : ""} `} size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3">User Permission Menu List</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>You have total {currentItems?.length} menu</p>
                            </BlockDes>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <DataTable className="card-streach">
                        <div className="card-inner position-relative card-tools-toggle">
                            <div className="card-title-group">
                                <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                        <span className="h6 text-soft">{Name}</span>
                                    </div>
                                </div>
                                {currentItems?.length ? (
                                    <div className="btn-wrap" style={{ display: 'flex', justifyContent: 'end' }}>
                                        <span className="d-md-block d-none">
                                            <Button className="" color="primary" id="id" onClick={(e) => onActionClick(e)}>
                                                Save
                                            </Button>
                                            <Tooltip placement="right" isOpen={tooltipOpen} target="id" toggle={toggle}>
                                                save new changes
                                            </Tooltip>
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <DataTableBody>
                            <DataTableHead>
                                <DataTableRow className="nk-tb-col-check">
                                    <span className="sub-text">Menu</span>
                                </DataTableRow>
                                <DataTableRow className="nk-tb-col-check">
                                    <span className="sub-text">Sub-Menu</span>
                                </DataTableRow>
                                <DataTableRow className="nk-tb-col-check">
                                    <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            onChange={(e) => selectorCheckCreate(e)}
                                            id="uid-1"
                                        />
                                        <label className="custom-control-label" htmlFor="uid-1">
                                            Create
                                        </label>
                                    </div>
                                </DataTableRow>
                                <DataTableRow className="nk-tb-col-check">
                                    <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            onChange={(e) => selectorCheckView(e)}
                                            id="uid-2"
                                        />
                                        <label className="custom-control-label" htmlFor="uid-2">
                                            View
                                        </label>
                                    </div>
                                </DataTableRow>
                                <DataTableRow className="nk-tb-col-check">
                                    <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            onChange={(e) => selectorCheckUpdate(e)}
                                            id="uid-3"
                                        />
                                        <label className="custom-control-label" htmlFor="uid-3">
                                            Update
                                        </label>
                                    </div>
                                </DataTableRow>
                            </DataTableHead>
                            {currentItems?.length > 0
                                ? data?.map((item, index) => {
                                    return (
                                        <DataTableItem key={index}>
                                            <DataTableRow>
                                                <span>{item.menu_name}</span>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <span>{item.sub_menu}</span>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        defaultChecked={item.isCreate}
                                                        id={item.uniqueId}
                                                        key={Math.random()}
                                                        onChange={(e) => onSelectChangeCreate(e, item.uniqueId)}
                                                    />
                                                    <label className="custom-control-label" htmlFor={item.uniqueId}></label>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        defaultChecked={item.isView}
                                                        id={item.uniqueId + "ui3"}
                                                        key={Math.random()}
                                                        onChange={(e) => onSelectChangeView(e, item.uniqueId)}
                                                    />
                                                    <label className="custom-control-label" htmlFor={item.uniqueId + "ui3"}></label>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        defaultChecked={item.isUpdate}
                                                        id={item.uniqueId + "ui1"}
                                                        key={Math.random()}
                                                        onChange={(e) => onSelectChangeUpdate(e, item.uniqueId)}
                                                    />
                                                    <label className="custom-control-label" htmlFor={item.uniqueId + "ui1"}></label>
                                                </div>
                                            </DataTableRow>
                                        </DataTableItem>
                                    );
                                })
                                : null}
                        </DataTableBody>

                    </DataTable>
                </Block>
            </Content>
        </>
    );
};

export default UserPermission;
