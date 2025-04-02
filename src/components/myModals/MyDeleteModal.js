import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { Button, Icon } from '../Component';

export const MyDeleteModal = (props) => {
  return (
    <Modal isOpen={props?.deleteModal} toggle={props?.toggleDeleteModal}>
    <ModalBody className="modal-body-lg text-center">
      <div className="nk-modal">
        <Icon className={`nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger`}></Icon>
        <h4 className="nk-modal-title">{props?.name}</h4>
        <div className="nk-modal-text">
          <p className="lead">Are you sure? You won't be able to revert this!</p>
        </div>
        <div className="nk-modal-action mt-5">
        <Button
            size="lg"
            className={`btn-mw me-2`}
            color={`primary`}
            onClick={props?.toggleDeleteModal}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className={`btn-mw`}
            color={`danger`}
            onClick={(e) => {
              props?.deleteRow(props?.rowData);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </ModalBody>
  </Modal>
  )
}
