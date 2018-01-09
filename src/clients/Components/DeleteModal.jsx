import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.open,
    };

    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteFunction();
    this.toggle();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { entityName } = this.props;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Delete</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Deleting {entityName}</ModalHeader>
          <ModalBody>
            <p>Are you sure? This will also delete anything related to it</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={this.toggle}
              className="deleteBtn"
            >
              Confirm deletion of {entityName}
            </Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  entityName: PropTypes.string.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  open: PropTypes.bool,
};
DeleteModal.defaultProps = {
  open: false,
};

export default DeleteModal;
