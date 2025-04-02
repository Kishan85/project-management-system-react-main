import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../components/Component";
import TaskCardList from "./TaskCardList";
import TaskForm from "./TaskForm";
import { TaskBoardForm } from "./TaskBoardForm";
import { deleteBoardAPI } from "../../api/todo";
import { toast } from "react-toastify";
import useLogout from "../../utils/useLogout";


const TaskColumn = ({ data, setData, column, index, taskBoardList }) => {
  const logout = useLogout()
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  const toggleModal = () => {
    
    setOpen(!open);
    // console.log(column, "column");

  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };


  const deleteBoard = (item) => {
    // console.log(item, "item");
    const data = {
      id: item.id,
    }
    deleteBoardAPI(data)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          taskBoardList()
        } else if (res.data.status === "failed") {
          toast.error(res.data.message);
        } else if (res.data.status === "expired") {
          logout(res.data.message)
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
    // let defaultData = data;
    // delete defaultData.columns[item.id];
    // defaultData.columnOrder = defaultData.columnOrder.filter((el) => el !== item.id);

    // setData({ ...defaultData });
  };





  const emptyList = (item) => {
    // let defaultData = data;
    // defaultData.columns[item.id].tasks = [];

    // setData({ ...defaultData });
  };
  // console.log(column,"colum--");
// console.log(userDetail?.role === "employee","userDetail");

  return (
    <>
      <Draggable draggableId={`column-${column?.text}`} key={column.id} index={index}>
        {(provided) => (
          <div className="kanban-board" ref={provided.innerRef} {...provided.draggableProps}>
            <div className={`kanban-board-header kanban-${column.theme}`} {...provided.dragHandleProps}>
              <div className="kanban-title-board">
                <div className="kanban-title-content">
                  <h6 className="title">{column.text}</h6>
                  <Badge className="text-dark" pill color="outline-light">{column.tasks.length}</Badge>
                </div>
             {userDetail?.role === "company" && (
                 <div className="kanban-title-content">
                 <UncontrolledDropdown>
                   <DropdownToggle
                     tag="a"
                     href="toggle"
                     onClick={(ev) => ev.preventDefault()}
                     className="dropdown-toggle btn btn-sm btn-icon btn-trigger me-n1"
                   >
                     <Icon name="more-h"></Icon>
                   </DropdownToggle>
                   <DropdownMenu end>
                     <ul className="link-list-opt no-bdr">
                       {userDetail?.role === "employee" ? null :
                         <>
                           <li>
                             <DropdownItem
                               tag="a"
                               href="#item"
                               onClick={(ev) => {
                                 ev.preventDefault();
                                 toggleEditModal();
                               }}
                             >
                               <Icon name="edit"></Icon>
                               <span>Edit Board</span>
                             </DropdownItem>
                           </li>
                           <li>
                             <DropdownItem
                               tag="a"
                               href="#item"
                               onClick={(ev) => {
                                 ev.preventDefault();
                                 deleteBoard(column);
                               }}
                             >
                               <Icon name="trash"></Icon>
                               <span>Delete Board</span>
                             </DropdownItem>
                           </li>
                         </>
                       }
                       {/* <li>
                         <DropdownItem
                           tag="a"
                           href="#item"
                           onClick={(ev) => {
                             ev.preventDefault();
                             emptyList(column);
                           }}
                         >
                           <Icon name="trash-empty"></Icon>
                           <span>Empty Board</span>
                         </DropdownItem>
                       </li> */}
                       <li>
                         <DropdownItem
                           tag="a"
                           href="#item"
                           onClick={(ev) => {
                             ev.preventDefault();
                             toggleModal();
                           }}
                         >
                           <Icon name="plus-sm"></Icon>
                           <span>Add Task</span>
                         </DropdownItem>
                       </li>
                     </ul>
                   </DropdownMenu>
                 </UncontrolledDropdown>
               </div>
             ) }
              </div>
            </div>
            <Droppable droppableId={`column-${column?.text}`} type="task">
              {(provided) => (
                <div className="kanban-drag" {...provided.droppableProps} ref={provided.innerRef}>
                  <TaskCardList data={data} setData={setData} tasks={column.tasks} column={column} />
                  {/* <button className="kanban-add-task mt-2 btn btn-block" onClick={toggleModal}>
                    <Icon name="plus-sm"></Icon>
                    <span>{column.tasks.length > 0 ? "Add another " : "Add "} task</span>
                  </button> */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
      <Modal size="lg" isOpen={open} toggle={toggleModal}>
        <TaskForm toggle={toggleModal} data={data} setData={setData} taskToBoard={column} taskBoardList={taskBoardList} />
      </Modal>

      <Modal size="lg" isOpen={editModal} toggle={toggleEditModal}>
        <TaskBoardForm toggle={toggleEditModal} data={data} setData={setData} editBoard={column} taskBoardList={taskBoardList} />
      </Modal>
    </>
  )
}

export default TaskColumn;