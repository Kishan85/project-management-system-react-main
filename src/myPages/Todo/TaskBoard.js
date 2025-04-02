import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';
import { gettaskBoardListAPI } from '../../api/todo';
import { toast } from 'react-toastify';
import useLogout from '../../utils/useLogout';

const TaskBoard = ({ columns, setColumns, taskBoardList }) => {
    const logout = useLogout()
    const [isLoading, setIsLoading] = useState(false)
    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId, type } = result;
        console.log(result, "result");
        setIsLoading(true)
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        if (type === "column") {
            const newColumnOrder = Array.from(columns.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            // Optimistic UI update before API call
            setColumns((prev) => ({
                ...prev,
                columnOrder: newColumnOrder,
            }));
            const newState = { columnOrder: newColumnOrder };
            gettaskBoardListAPI(newState)
                .then((res) => {
                    if (res.data.status === "success") {
                        setIsLoading(false)
                        setColumns(res.data.data || []);
                    } else if (res.data.status === "failed") {
                        setColumns([]);
                        toast.error(res.data.message);
                    } else if (res.data.status === "expired") {
                        logout(res.data.message)
                    }
                })
                .catch((err) => {
                    console.error("API error:", err);
                });

        } else {
            const home = columns.columns[source?.droppableId || []];
            const foreign = columns.columns[destination?.droppableId || []];
            // console.log(home, "home tasks");
            // check for same column
            if (home === foreign) {
                const items = Array.from(home.tasks || []);
                items.splice(source.index, 1);
                items.splice(destination.index, 0, draggableId);
                const homeId = Object.keys(columns.columns).find(
                    (key) => columns.columns[key].id === home?.id
                );
                const newState = {
                    ...columns,
                    columns: {
                        ...columns.columns,
                        [homeId]: {
                            ...home,
                            tasks: items,
                        },
                    },
                };
                // console.log(newState, "newState");
                setColumns(newState);
                const data = {
                    taskOrder: {
                        homeId: home?.id,
                        items: items
                    }
                }
                // console.log(homeId, items, home, "same column");
                // console.log(data, "same column");
                // return false
                gettaskBoardListAPI(data)
                    .then((res) => {
                        if (res.data.status === "success") {
                            setIsLoading(false)
                            setColumns(res.data.data || []);
                        } else if (res.data.status === "failed") {
                            setColumns([]);
                            toast.error(res.data.message);
                        } else if (res.data.status === "expired") {
                            logout(res.data.message)
                        }
                    })
                    .catch((err) => {
                        console.error("API error:", err);
                    });

                return;
            } else {
                // moving from one list to another
                const items = Array.from(home.tasks || []);
                items.splice(source.index, 1);
                const newHome = {
                    ...home,
                    tasks: items,
                };

                const foreigntasks = Array.from(foreign.tasks || []);
                foreigntasks.splice(destination.index, 0, draggableId);
                const newForeign = {
                    ...foreign,
                    tasks: foreigntasks,
                };

                const homeId = Object.keys(columns.columns).find(
                    (key) => columns.columns[key].id === newHome?.id
                );
                const foreignId = Object.keys(columns.columns).find(
                    (key) => columns.columns[key].id === newForeign?.id
                );
                const newState = {
                    ...columns,
                    columns: {
                        ...columns.columns,
                        [homeId]: newHome,
                        [foreignId]: newForeign,
                    },
                };
                setColumns(newState);
                const data = {
                    newHome: newHome,
                    newItem: newForeign
                }

                // console.log(data, "one list to another DATA");
                // console.log(newState, "one list to another");
                // console.log(home, "one list to another home");
                // console.log(columns, "one list to another columns");
                // console.log(newHome,newForeign ,"newHome newForeign one list to another");

                // return false
                gettaskBoardListAPI(data)
                    .then((res) => {
                        if (res.data.status === "success") {
                            setIsLoading(false)
                            setColumns(res.data.data || []);
                        } else if (res.data.status === "failed") {
                            setColumns([]);
                            setIsLoading(false);
                            toast.error(res.data.message);
                        } else if(res.data.status === "expired"){
                            logout(res.data.message)
                        }
                    })
                    .catch((err) => {
                        console.error("API error:", err);
                    });

                return;
            }
        }


    };


    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {(provided) => (
                        <div
                            className="kanban-container"
                            id="kanban-container"
                            style={{ width: `${columns?.columnOrder?.length * 320}px` }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {columns?.columnOrder?.map((columnId, index) => {
                                const column = columns.columns[columnId];
                                return (
                                    <>
                                        {
                                            <TaskColumn data={columns} setData={setColumns} column={column} key={columnId} index={index} taskBoardList={taskBoardList} />
                                        }
                                    </>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </>
    )
}

export default TaskBoard;