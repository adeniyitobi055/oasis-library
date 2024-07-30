import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddMember() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="member-form">
          <Button>Add new member</Button>
        </Modal.Open>
        <Modal.Window name="member-form"></Modal.Window>
      </Modal>
    </div>
  );
}

export default AddMember;
