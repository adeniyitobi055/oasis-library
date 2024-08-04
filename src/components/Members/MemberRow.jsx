import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import { useDeleteMember } from "./useDeleteMember";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateMembershipForm from "./CreateMembershipForm";
import { dateDifference, formatDistanceFromNow } from "../../utils/helpers";

const StyledCell = styled.div`
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

function MemberRow({ member }) {
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

  const typeToTagName = {
    regular: "bronze",
    classic: "silver",
    premium: "gold",
  };

  const { deleteMember, isDeleting } = useDeleteMember();

  return (
    <Table.Row>
      <StyledCell>
        <span>{fullName}</span>
        <span>{email}</span>
      </StyledCell>
      <StyledCell>
        <span>{nationality}</span>
        <span>{nationalID}</span>
      </StyledCell>
      <StyledCell>
        <span>
          {isToday(new Date(issueDate))
            ? "Today"
            : formatDistanceFromNow(issueDate)}{" "}
          &rarr; {dateDifference(issueDate, expiryDate)}{" "}
          {dateDifference(issueDate, expiryDate) > 1 ? "days" : "day"}
        </span>
        <span>
          {format(issueDate, "MMM dd yyyy")} &mdash;{" "}
          {format(expiryDate, "MMM dd yyyy")}
        </span>
      </StyledCell>
      <Tag type={typeToTagName[type]}>{type}</Tag>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={memberId} />

            <Menus.List id={memberId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit">
              <CreateMembershipForm memberToEdit={member} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="members"
                disabled={isDeleting}
                onConfirm={() => deleteMember(memberId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default MemberRow;
