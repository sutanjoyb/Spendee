import { Modal } from "react-bootstrap";
import TransactionForm from "./TransactionForm";

function TransactionModal({ show, handleClose, addTransaction }) {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header
        closeButton
        style={{
          borderBottom: "none",
          paddingBottom: "0",
        }}
      >
        <Modal.Title
          style={{
            fontFamily: "Croissant One",
            color: "#2563EB",
          }}
        >
          Add Transaction
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          paddingTop: "10px",
        }}
      >
        <TransactionForm
          addTransaction={addTransaction}
          handleClose={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
}

export default TransactionModal;
