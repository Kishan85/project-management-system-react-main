import React, { useEffect, useMemo, useState } from 'react'
import Content from '../../layout/content/Content';
import Head from '../../layout/head/Head';
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Button, Icon } from '../../components/Component';
import { Modal } from 'reactstrap';
import TaskForm from './TaskForm';
import { columnData } from './TaskData';
import { TaskBoardForm } from './TaskBoardForm';
import TaskBoard from './TaskBoard';
import { toast } from 'react-toastify';
import { gettaskBoardListAPI } from '../../api/todo';
import useLogout from '../../utils/useLogout';
const Task = () => {
    const logout = useLogout()
    const [columns, setColumns] = useState([]);
    const [boardModal, setBoardModal] = useState(false);
    const [smBtn, setSmBtn] = useState(false);
    const [taskModal, setTaskModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userDetail = JSON.parse(localStorage.getItem("userDetail"));
    const toggleBoardModal = () => {
        setBoardModal(!boardModal);
    };

    // console.log('>>>',columns)

    const toggleTaskModal = () => {
        setTaskModal(!taskModal);
    };
    useEffect(() => {
        taskBoardList();
    }, []);

    const taskBoardList = () => {
        gettaskBoardListAPI()
            .then((res) => {
                if (res.data.status === "success") {
                    setIsLoading(false);
                    setColumns(res.data.data || []);
                } else if (res.data.status === "failed") {
                    setColumns([]);
                    setIsLoading(false);
                    toast.error(res.data.message);
                } else if (res.data.status === "expired") {
                    logout(res.data.message);
                }
            })
            .catch((err) => {
                console.error("API error:", err);
                setIsLoading(false);
            });
    };

    // Memoize pricingCardData to avoid unnecessary re-renders
    const memoizedTaskTableData = useMemo(() => columns, [columns]);
    //  console.log(memoizedTaskTableData,"memoizedTaskTableData");


    return (
        <>
            <Head title="Task Board"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Task Board</BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <a
                                    href="#toggle"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setSmBtn(!smBtn);
                                    }}
                                    className="btn btn-icon btn-trigger toggle-expand me-n1"
                                >
                                    <Icon name="menu-alt-r"></Icon>
                                </a>
                                <div className={`toggle-expand-content ${smBtn ? "expanded" : ""}`}>
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <Button color="light" outline className="btn-white" onClick={() => toggleTaskModal()}>
                                                <Icon name="plus" />
                                                <span>Add Task</span>
                                            </Button>
                                        </li>
                                        {userDetail?.role === "employee" ? null :
                                            <li>
                                                <Button color="primary" onClick={() => toggleBoardModal()}>
                                                    <Icon name="plus" />
                                                    <span>Add Task Board</span>
                                                </Button>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <div className="nk-kanban">
                        <TaskBoard columns={memoizedTaskTableData} setColumns={setColumns} taskBoardList={taskBoardList} />
                    </div>
                </Block>

                <Modal size="lg" isOpen={taskModal} toggle={toggleTaskModal}>
                    <TaskForm toggle={toggleTaskModal} data={memoizedTaskTableData} setData={setColumns} taskBoardList={taskBoardList} />
                </Modal>


                <Modal size="lg" isOpen={boardModal} toggle={toggleBoardModal}>
                    <TaskBoardForm toggle={toggleBoardModal} data={memoizedTaskTableData} setData={setColumns} taskBoardList={taskBoardList} />
                </Modal>

            </Content>
        </>
    )
}

export default Task;