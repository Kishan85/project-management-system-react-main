import React from "react";
import { Form, Modal, ModalBody } from "reactstrap";
import { Button, Col, Icon, Row, RSelect } from "../../components/Component";
const DocumentModal = ({
    row,
    modal,
    closeModal,
    handleDownload
}) => {
// console.log(row,"jjjjj");

    return (
        <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
            <ModalBody>
                <a
                    href="#cancel"
                    onClick={(ev) => {
                        ev.preventDefault();
                        closeModal();
                    }}
                    className="close"
                >
                    <Icon name="cross-sm"></Icon>
                </a>
                <Row className={`g-gs mt-2`}>
                    <table
                        className="table table-bordered table-scroll mt-3"
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
                                        Title
                                    </label>
                                </th>
                                <th scope="col">
                                    <label className="form-label" htmlFor="file">
                                        Download
                                    </label>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {row?.document?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Col md={`10`}>
                                            <div className="form-group">
                                                <div className="form-control-wrap">
                                                    <label className="from-label" htmlFor="title">
                                                        {row?.title}
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>
                                    </td>
                                    <td>
                                        <Col md={`10`}>
                                            <div className="form-group">
                                                <div className="form-control-wrap">
                                                    <label className="from-label" htmlFor="title">
                                                        {item?.document_name}
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>
                                    </td>
                                    <td>
                                    <Col md={`10`}>
                                    <button
                                            className="btn btn-primary"
                                            onClick={() => handleDownload(item)}
                                        >
                                            <Icon name="download" />
                                        </button>
                                    </Col>
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Row>
            </ModalBody>
        </Modal>
    );
};

export default DocumentModal;
