import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateIssueForm from "./CreateIssueForm";

function AddIssue() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="issue-form">
          <Button> "Add new issue</Button>
        </Modal.Open>
        <Modal.Window name="issue-form">
          <CreateIssueForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddIssue;
