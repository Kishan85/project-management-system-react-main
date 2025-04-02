import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Col, ModalBody } from 'reactstrap';
import { Button, Icon, RSelect } from '../../components/Component';
import DatePicker from "react-datepicker";
import { tagSet, teamList } from './TaskData';
import { getDateStructured } from '../../utils/Utils';
import { getDepartmentList, getPriorityDDList, getProjectDDList } from '../../utils/myFunctions';
import { getTeamListByDepartmentDDAPI, getUserListByProjectDDAPI } from '../../api/dropdowns';
import { toast } from 'react-toastify';
import { createTaskAPI } from '../../api/todo';
import { ColorOptions, PriorityColorOptions } from '../../components/partials/color-select-menu/ColorMenu';
import useLogout from '../../utils/useLogout';
const TaskForm = ({ toggle, data, setData, taskToBoard, taskBoardList }) => {
    const { register, handleSubmit, watch, setValue, reset, trigger, clearErrors, formState: { errors } } = useForm();
    const [editTask, setEditTask] = useState(false)
    const [boardOptions, setBoardOptions] = useState(
        Object.keys(data?.columns || {}).map((item) => ({
            value: data?.columns[item]?.id,
            label: data?.columns[item]?.text,
            id: data?.columns[item]?.id,
        }) || [])


    );
    console.log('options', boardOptions)

    const [departmentList, setDepartmentList] = useState([])
    const userDetail = JSON.parse(localStorage.getItem("userDetail"));
    console.log(userDetail?.role, "role");
    const logout = useLogout();
    useEffect(() => {
        getDepartmentList(setDepartmentList, setValue, "departmentList")
        getProjectDDList(setValue, "projectList")
        getPriorityDDList(setValue, "priorityList")
    }, [])

    const handleProjectChange = (selectedOption) => {
        setValue("project", selectedOption || "");
        trigger("project");
        setValue("users", "");
        setValue("users", []);
        setValue("assign_id", "");
        setValue("assign_id", []);
        const bodyData = {
            project_id: selectedOption?.value,
        };
        getUserListByProjectDDAPI(bodyData)
            .then((res) => {
                if (res.data.status === "success") {
                    // console.log(res.data.data);
                    setValue("usersList", res.data.data);
                } else {
                    setValue("users", []);
                }
            })
            .catch((err) => {
                console.log("something went wrong");
            });
    };
    const handlePriorityChange = (selectedOption) => {
        setValue("priority", selectedOption || "");
        trigger("priority");
    };
    //    console.log("list pri", watch("priorityList"))

    const handleBoardChange = (selectedOption) => {
        setValue("board", selectedOption || "");
        console.log(selectedOption, "bord");
        // console.log(selectedOption, "selectedOptionboard");
        trigger("board");
    };
    console.log(watch("board"), "board");

    const handleUserAssignedChange = (selectedOption) => {
        setValue("assign_id", selectedOption || "");
        trigger("assign_id");

    };
    const handleUserChange = (selectedOption) => {
        setValue("users", selectedOption || "");
        trigger("users");
        const bodyData = {
            user_id: selectedOption?.value,
            project_id: watch("project").value,
        };
        // console.log(bodyData,"selectedOption");
        // return false
        getUserListByProjectDDAPI(bodyData)
            .then((res) => {
                if (res.data.status === "success") {
                    // console.log(res.data.data);
                    setValue("visibilityList", res.data.data);
                    // setValue("assign_id", res?.data?.data)
                } else if (res.data.status === "failed") {
                    setValue("assign_id", []);
                    setValue("visibilityList", []);
                    toast.error(res.data.message);
                } else if (res.data.status === "expired") {
                    logout(res.data.message)
                }
            })
            .catch((err) => {
                console.log("something went wrong");
            });
    };

    const deleteTask = () => { }

    const submitForm = (taskdata) => {
        console.log('taskData', taskdata)
         
        let board = taskToBoard && boardOptions.find((item) => item.id === taskToBoard.id);
        const ids = taskdata?.assign_id.map((item) => item?.value?.toString());
        const idString = ids.join(",");
        const assign_ids = taskdata?.users?.map((item) => item?.value?.toString());
        const assign_idS = assign_ids.join(","); // Convert to string
        const assignArray = assign_idS.split(","); // Convert back to array
        console.log(assignArray, "119");

        const toLocalISO = (date) => {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            return localDate.toISOString();
        };
        const bodyData = {
            project_id: taskdata?.project?.value,
            priority: taskdata?.priority?.value,
            board: taskdata.board.value,
            user_id:assignArray ,
            assign_id: idString,
            title: taskdata.title,
            description: taskdata.desc,
            start_date: new Date(taskdata.startdate).toISOString(),  // Convert to UTC
            end_date: new Date(taskdata.enddate).toISOString()
        };

        console.log('data',bodyData)


       
        const TaskData = {
            task: {
                ...data.task,
                [`task-` + taskdata.title]: {
                    id: `task-` + taskdata.title,
                    title: taskdata.title,
                    desc: taskdata.desc,
                    meta: {
                        project_id: taskdata?.project?.value,
                        priority: taskdata?.priority?.value,
                        board: taskdata.board.value,
                        user_id: taskdata?.users?.value,
                        assign_id: idString,
                        start_date: taskdata.startdate,
                        end_date: taskdata.enddate,
                    },
                },
            },
        };
        const boardId = Object.keys(data.columns).find(
            (key) => data.columns[key].id === board?.id
        );
        let defaultColumns = {
            columns: {
                ...data.columns,
                [boardId]: {
                    ...data.columns[boardId],
                    tasks: [...(data.columns[boardId]?.tasks || [])],
                },
            },
        };
        console.log(bodyData, "bodyData");
        setData({ columnOrder: data.columnOrder, task: TaskData.task, columns: defaultColumns.columns });
        // return false
        createTaskAPI(bodyData)
            .then((res) => {
                if (res.data.status === "success") {
                    toast.success(res.data.message);
                    setData(res.data.data);
                    taskBoardList()
                    reset();
                    toggle()
                } else if (res.data.status === "failed") {
                    toast.error(res.data.message);
                } else if (res.data.status === "expired") {
                    logout(res.data.message)
                }
            })
            .catch((err) => {
                console.log("something went wrong");
            });
    }
    useEffect(() => {
        if (taskToBoard) {
            const board = boardOptions.find((item) => item.id === taskToBoard.id);
            if (board) {
                setValue("board", board);
            }
        }
    }, [taskToBoard, boardOptions, setValue]);

    const defaultValue = userDetail?.role === "employee"
        ? (boardOptions.find(option => option.label === "Pending") || boardOptions[0])
        : undefined;
    useEffect(() => {
        if (defaultValue) {
            setValue("board", defaultValue);
            clearErrors("board");
        }
    }, [defaultValue, setValue, clearErrors]);
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };


    return (
        <ModalBody>
            <a
                href="#cancel"
                onClick={(ev) => {
                    ev.preventDefault();
                    toggle();
                }}
                className="close"
            >
                <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
                <h5 className="title">{editTask ? "Update" : "Add"} Task</h5>
                <div className="mt-4">
                    <form className="row gy-4"
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Project</label>
                                <RSelect
                                    placeholder='Select Project'
                                    options={watch("projectList")}
                                    // isMulti
                                    {...register("project", { required: "Please select project." })}
                                    onChange={handleProjectChange}
                                    value={watch("project")}
                                />
                                {errors.project && <span className="invalid">{errors.project.message}</span>}
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Priority </label>
                                <RSelect
                                    formatOptionLabel={PriorityColorOptions}
                                    placeholder='Select Priority'
                                    options={watch("priorityList")}
                                    {...register("priority", { required: "Please select priority" })}
                                    onChange={handlePriorityChange}
                                    value={watch("priority")}
                                />
                                {errors.priority && <span className="invalid">{errors.priority.message}</span>}
                            </div>
                        </Col>
                        {/* {userDetail?.role === "employee" ? null : */}
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Users Assigned</label>
                                <RSelect
                                    placeholder='Select User'
                                    options={watch("usersList")}
                                    isMulti
                                    {...register("users", { required: "Please select user" })}
                                    onChange={handleUserChange}
                                    value={watch("users")}
                                />
                                {errors.users && <span className="invalid">{errors.users.message}</span>}
                            </div>
                        </Col>
                        {/* } */}
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Task Visibility</label>
                                <RSelect
                                    placeholder='Select Task Visibility'
                                    options={watch("visibilityList")}
                                    isMulti
                                    {...register("assign_id", { required: "Please select task visibility" })}
                                    onChange={handleUserAssignedChange}
                                    value={watch("assign_id")}
                                />
                                {errors.assign_id && <span className="invalid">{errors.assign_id.message}</span>}
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Task Title</label>
                                <input
                                    type="text"
                                    {...register('title', { required: "This field is required" })}
                                    value={watch("title")}
                                    onChange={(e) => {
                                        // const newTitle = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                        const newTitle = e.target.value.replace(/^./, (char) => char.toUpperCase());
                                        setValue("title", newTitle);
                                        trigger("title");

                                    }}
                                    placeholder='Enter Title'
                                    className="form-control" />
                                {errors.title && <span className="invalid">{errors.title.message}</span>}
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Select Board</label>
                                <RSelect
                                    defaultValue={defaultValue}
                                    isDisabled={taskToBoard || userDetail?.role === "employee"}
                                    options={boardOptions}
                                    placeholder="Select a board"
                                    {...register("board", {
                                        required: "Please select Board"
                                    })}
                                    onChange={handleBoardChange}
                                    value={watch("board")}
                                />
                                {errors.board && <span className="invalid">{errors.board.message}</span>}
                            </div>
                        </Col>


                        {/* <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Select Board</label>
                                <RSelect
                                    defaultValue={taskToBoard && boardOptions.find((item) => item.id === taskToBoard.id)}
                                    isDisabled={taskToBoard ? true : false}
                                    options={boardOptions}
                                    placeholder="Select a board"
                                    {...register("board",
                                        {
                                            required: "Please select Board"
                                        })}
                                    onChange={handleBoardChange}
                                    value={watch("board")}
                                />
                                {errors.board && <span className="invalid">{errors.board.message}</span>}
                            </div>
                        </Col> */}
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Start Date</label>
                                <DatePicker
                                    selected={watch("startdate")}
                                    {...register("startdate", {
                                        required: "Startdate is required",
                                    })}
                                    onChange={(date) => {
                                        setValue("startdate", date);
                                        trigger("startdate");
                                    }}
                                    showTimeSelect
                                    filterTime={filterPassedTime}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="form-control date-picker"
                                    placeholderText='Select Start Date'
                                    minDate={new Date()}
                                />
                                {errors.startdate && <span className="invalid">{errors.startdate.message}</span>}
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">End Date</label>
                                <DatePicker
                                    selected={watch("enddate")}
                                    {...register("enddate", {
                                        required: "Enddate is required",
                                    })}
                                    onChange={(date) => {
                                        setValue("enddate", date);
                                        trigger("enddate");
                                    }}
                                    className="form-control date-picker"
                                    placeholderText='Selete End Date'
                                    minDate={new Date()}
                                    showTimeSelect
                                    filterTime={filterPassedTime}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                                {errors.enddate && <span className="invalid">{errors.enddate.message}</span>}
                            </div>
                        </Col>
                        {/* <Col sm="6">
                            <div className="form-group">
                                <label className="form-label">Department</label>
                                <RSelect
                                    placeholder='Select Department.'
                                    options={departmentList}
                                    // isMulti
                                    {...register("department", { required: "Please select department" })}
                                    onChange={handleDepartmentChange}
                                    value={watch("department")}
                                />
                                {errors.department && <span className="invalid">{errors.department.message}</span>}
                            </div>
                        </Col> */}

                        <Col className="col-12">
                            <div className="form-group">
                                <label className="form-label">Task Description</label>
                                <textarea
                                    {...register('desc', { required: "This field is required" })}
                                    value={watch("desc")}
                                    onChange={(e) => {
                                        setValue("desc", e.target.value);
                                        trigger("desc");
                                    }}
                                    placeholder='Enter Description'
                                    className="form-control no-resize" />
                                {errors.desc && <span className="invalid">{errors.desc.message}</span>}
                            </div>
                        </Col>
                        <Col className="col-12">
                            <ul className="d-flex justify-content-between mt-3">
                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                    <li>
                                        <Button color="primary" size="md" type="submit" disabled={editTask} >
                                            {editTask ? "Update" : "Add"} Task
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                toggle();
                                            }}
                                            className="link link-light"
                                        >
                                            Cancel
                                        </Button>
                                    </li>
                                </ul>
                                {/* {editTask && (
                                    <ul>
                                        <li>
                                            <Button color="danger" size="md" onClick={() => deleteTask()}>
                                                Delete Task
                                            </Button>
                                        </li>
                                    </ul>
                                )} */}
                            </ul>
                        </Col>
                    </form>
                </div>
            </div>
        </ModalBody>
    );
}

export default TaskForm