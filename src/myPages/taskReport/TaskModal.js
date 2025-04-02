import moment from 'moment';
import React from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';

const TaskModal = ({
    row,
    modal,
    closeModal,
}) => {

    return (
        <>
            <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="xl">
                <ModalHeader toggle={() => closeModal()}>{row[0]?.employee}</ModalHeader>
                <ModalBody >
                    <Row>
                        <div className='table-responsive'>
                            <table
                                className="table table-bordered table-scroll"
                                id="productTable"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="project">
                                                Project Name
                                            </label>
                                        </th>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="title">
                                                Task
                                            </label>
                                        </th>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="title">
                                                Status
                                            </label>
                                        </th>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="title">
                                                Start Date
                                            </label>
                                        </th>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="title">
                                                End Date
                                            </label>
                                        </th>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="title">
                                                Due Days
                                            </label>
                                        </th>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="title">
                                                Time
                                            </label>
                                        </th>
                                        <th scope="col">
                                            <label className="from-label" htmlFor="title">
                                                Progress
                                            </label>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.project}</td>
                                            <td>{item?.task}</td>
                                            <td> {item?.status?.label}</td>
                                            <td> {item?.start_date}</td>
                                            <td>{item?.end_date}</td>
                                            <td> {item?.due_days}</td>
                                            <td> {item?.time}</td>
                                            <td>
                                                <div className="project-list-progress cursor-pointer">
                                                    <Progress
                                                        className="progress-pill progress-md bg-light"
                                                        color={item?.progress?.color}
                                                        value={item?.progress?.value}
                                                    ></Progress>
                                                    <div className="project-progress-percent">
                                                        {item?.progress?.value}%
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => closeModal()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default TaskModal;