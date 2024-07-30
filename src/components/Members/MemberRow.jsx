import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

const Member = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Date = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
  white-space: nowrap;
`;

const Type = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Status = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: 400;
  font-family: "Sono";
`;

function MemberRow() {
  return (
    <Table.Row>
      <Member>
        <span>John Doe</span>
        <span>johndoe@gmail.com</span>
      </Member>
      <Member>
        <span>Nigerian</span>
        <span>888023267678</span>
      </Member>
      <Date>31/07/2024 - 31/12/2024</Date>
      <Type>Premium</Type>
      <Status>Active</Status>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle />

            <Menus.List>
              <Menus.Button icon={<HiSquare2Stack />}>Duplicate</Menus.Button>

              <Modal.Open>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>

              <Modal.Window></Modal.Window>

              <Modal.Window></Modal.Window>
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default MemberRow;
