import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookForm from "./CreateBookForm";

function AddBook() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="book-form">
          <Button>Add new book</Button>
        </Modal.Open>
        <Modal.Window name="book-form">
          <CreateBookForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBook;
