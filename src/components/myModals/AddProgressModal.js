import React from 'react';
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const AddProgressModal = (
    {
        row,
        modal,
        closeModal,
        handleSubmit,
        register,
        onSubmit,
        setValue,
        trigger,
        watch,
        errors, }
) => {


    return (
        <>
            <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
            <ModalHeader toggle={() => closeModal()}>{row?.title}</ModalHeader>
                <ModalBody>
                    <Form className="row gy-4" onSubmit={handleSubmit(onSubmit)}>
                        <Row className={`g-gs mt-2`}>
                            <Col md="12">
                                <div className="form-group">
                                    <label className="form-label">Progress</label>
                                    {/* <input
                                        type="text"
                                        {...register("progress", { required: "This field is required" })}
                                        value={watch("progress")}
                                        placeholder="Enter progress"
                                        className="form-control"
                                    /> */}
                                    <input
                                        type="text"
                                        {...register("progress", {
                                            required: "This field is required",
                                            validate: (value) => {
                                                const isNumber = /^\d+$/.test(value); // Checks if it's a number
                                                const numValue = parseInt(value, 10); // Convert to number
                                                if (isNumber && numValue >= 1 && numValue <= 100) return true;
                                                return "Only numbers between 1-100 or '100%' are allowed";
                                            }
                                        })}
                                        value={watch("progress")}
                                        placeholder="Enter progress"
                                        className="form-control"
                                    />

                                    {errors.progress && <span className="invalid">{errors.progress.message}</span>}
                                </div>
                            </Col>
                        </Row>
                        <Row className={`g-gs mt-2`}>
                            <Col size="12">
                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                    <li>
                                        <Button color="primary" size="md" type="submit">
                                            Submit
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                closeModal();
                                            }}
                                            color="danger" size="md"
                                        >
                                            Cancel
                                        </Button>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AddProgressModal;