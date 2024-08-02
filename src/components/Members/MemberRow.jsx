import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateMember } from "./useCreateMember";
import { format } from "date-fns";
import Tag from "../../ui/Tag";

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

function MemberRow({ member }) {
  const { createMember, isCreating } = useCreateMember();

  const {
    id: memberId,
    fullName,
    email,
    nationality,
    nationalID,
    issueDate,
    expiryDate,
    type,
    status,
  } = member;

  const statusToTagName = {
    unconfirmed: "blue",
    expired: "red",
    active: "green",
  };

  return (
    <Table.Row>
      <Member>
        <span>{fullName}</span>
        <span>{email}</span>
      </Member>
      <Member>
        <span>{nationality}</span>
        <span>{nationalID}</span>
      </Member>
      <Date>
        {format(issueDate, "MMM dd yyyy")} &mdash;{" "}
        {format(expiryDate, "MMM dd yyyy")}
      </Date>
      <Type>{type}</Type>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={memberId} />

            <Menus.List>
              <Menus.Button icon={<HiSquare2Stack />}>Duplicate</Menus.Button>
              <Modal.Open>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
              {/* <Modal.Window></Modal.Window>
              <Modal.Window></Modal.Window> */}
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default MemberRow;
