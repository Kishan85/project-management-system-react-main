import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Alert, Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from "reactstrap";
import { Icon, UserAvatar } from "../../components/Component";
import TaskForm from "./TaskForm";
import { useTimer } from 'react-timer-hook';
import { findUpper, setDeadlineDays } from "../../utils/Utils";
import MyTimer from "../../pages/components/timer";

const TaskCard = ({ data, setData, card, index, column }) => {
  const [open, setOpen] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); 

  // console.log('data===> TCard',data)

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };
  const deleteTask = (id) => {
    let defaultData = data;
    delete defaultData.task[id];

    defaultData.columns[column.id].tasks = defaultData.columns[column.id].tasks.filter((item) => item !== id);

    setData({ ...defaultData });
  };
  

  const { id, title, desc, meta } = card;
  // console.log(meta,"meta----",card);
  // console.log(data, meta, "TaskCard");

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')} : ${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Draggable draggableId={id} key={id} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mt-2">
            <div className="kanban-item">
              <div className="kanban-item-title">
                <div className={`text`}>
                  <Badge className="badge-dot badge-dot-xs text-capitalize" color={` bg-${meta?.priority?.color_name}`}>
                    <h6 className="title text-capitalize task-title" id="title">
                      {title}
                    </h6>
                  </Badge>
                </div>
                {/* <h6 className="title">{title}</h6> */}
                <Dropdown isOpen={open} toggle={toggleOpen}>
                  <DropdownToggle
                    tag="a"
                    href="#toggle"
                    className="dropdown-toggle"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    <div className="user-avatar-group">
                      {/* {meta?.assign_id?.map((user, index) => (
                                                <UserAvatar key={index} className="xs text-capitalize" theme={user?.theme} text={findUpper(user?.label || "")}></UserAvatar>
                                            ))} */}
                      {meta?.assign_id?.slice(0, 2).map((member, idx) => {
                        return (
                          <UserAvatar
                            className="xs text-capitalize"
                            theme={member?.theme}
                            text={findUpper(member.label)}
                          />
                        );
                      })}
                      {meta?.assign_id?.length > 2 && (
                        <div>
                          <UserAvatar theme="light" className="sm" text={`+${meta?.assign_id?.length - 2}`} />
                        </div>
                      )}
                    </div>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <ul className="link-list-opt no-bdr p-3 g-2">
                      {meta?.assign_id?.map((user, index) => (
                        <li key={index}>
                          <div className="user-card" onClick={toggleOpen}>
                            <UserAvatar
                              className="sm text-capitalize"
                              theme={user.theme}
                              text={findUpper(user?.label || "")}
                            ></UserAvatar>
                            <div className="user-name">
                              <span className="tb-lead text-capitalize">{user.label}</span>
                            </div>
                          </div>
    
                        </li>
                      ))}
                    </ul>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="kanban-item-text">
                <p>{desc}</p>
              </div>
              <ul className="kanban-item-tags mb-1">
                {
                  <>
                    <li key={index}>
                      <Badge color="primary">{meta?.project_id?.label}</Badge>
                    </li>
                  </>
                }
              </ul>
              {/* <div className="kanban-item-text d-flex">
                                <p>Assigned To : <span className='text-primary'>
                                    {meta?.user_id?.map((user, index) => (
                                        <span className="tb-lead text-capitalize">{user.label}</span>
                                    ))}
                                </span></p>
                            </div>
                            <div className="kanban-item-text">
                                <p>Assigned By : <span className='text-primary'>{meta ? meta.created_by : 'self'}</span></p>
                            </div> */}
              <div className="kanban-item-text d-flex">
                <p>
                  <Icon name="notes"></Icon>
                  {meta.department_name}
                </p>
              </div>
              {/* <div className="kanban-item-text d-flex">
                {
                  meta.start_time (
                    <MyTimer expiryTimestamp ={meta.start_time} />
                  )
                }
              </div> */}
              <div className="kanban-item-meta">
                <ul className="kanban-item-meta-list">
                  {meta.end_date && (
                    <li
                      className={
                        setDeadlineDays(new Date(meta.end_date)) > 10
                          ? "text-light"
                          : setDeadlineDays(new Date(meta.end_date)) <= 10 &&
                            setDeadlineDays(new Date(meta.end_date)) >= 2
                          ? "text-warning"
                          : setDeadlineDays(new Date(meta.end_date)) === 1
                          ? "text-danger"
                          : setDeadlineDays(new Date(meta.end_date)) <= 0 && "text-success"
                      }
                    >
                      <Icon name="calendar"></Icon>
                    
                     {meta?.task_status == "Review" || meta?.task_status == "Completed" ? <span>{'Taken Time: '+formatTime(meta.task_duration)}</span> :   <span>{meta.due_days}d Due</span>} 
                    </li>
                  )}
                
                </ul>

                {/* <ul className="kanban-item-meta-list">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            tag="a"
                                            href="toggle"
                                            onClick={(ev) => ev.preventDefault()}
                                            className="dropdown-toggle btn btn-xs btn-icon btn-trigger me-n1"
                                        >
                                            <Icon name="more-v"></Icon>
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <ul className="link-list-opt no-bdr">
                                                <li>
                                                    <DropdownItem
                                                        tag="a"
                                                        href="#item"
                                                        onClick={(ev) => {
                                                            ev.preventDefault();
                                                            toggleTaskModal();
                                                        }}
                                                    >
                                                        <Icon name="edit"></Icon>
                                                        <span>Edit Task</span>
                                                    </DropdownItem>
                                                </li>
                                                <li>
                                                    <DropdownItem
                                                        tag="a"
                                                        href="#item"
                                                        onClick={(ev) => {
                                                            ev.preventDefault();
                                                            deleteTask(card.id);
                                                        }}
                                                    >
                                                        <Icon name="trash"></Icon>
                                                        <span>Delete Task</span>
                                                    </DropdownItem>
                                                </li>
                                            </ul>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </ul> */}
              </div>
              <div>
                <MyTimer data={meta} expiryTimestamp={meta?.start_date} status={meta?.task_status}/>
              </div>
           
              <div className="kanban-item-text d-flex justify-content-between" style={{marginTop: '10px'}}>
              <div className="kanban-item-text">
                <Badge color="orange">{meta ? "By: " + meta.created_by : "By Self"}</Badge>
              </div>
                <div>
                <span className="text-primary">
                  {meta?.user_id?.map((user, index) => (
                    <Badge color="primary">{"To: "+user?.label}</Badge>
                  ))}
                </span>
              </div>
           
              </div>
            </div>
          </div>
        )}
      </Draggable>

     {/* <div>
      <MyTimer expiryTimestamp={time} />
    </div>   */}

      <Modal size="lg" isOpen={taskModal} toggle={toggleTaskModal}>
        <TaskForm toggle={toggleTaskModal} data={data} setData={setData} editTask={card} taskToBoard={column} />
      </Modal>
    </>
  );
};

export default TaskCard;
