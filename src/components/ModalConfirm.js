import { Modal, Button } from 'react-bootstrap';
;
import PropTypes from 'prop-types';

function ModalConfirmComponent({ show, setShow, handleConfirm, title, message }) {
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalConfirmComponent.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default ModalConfirmComponent;