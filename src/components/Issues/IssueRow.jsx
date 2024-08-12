import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiDocumentCheck,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { dateDifference, formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

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

function IssueRow({ issue }) {
  const {
    id: issueId,
    created_at,
    borrowDate,
    returnDate,
    status,
    memberId,
    bookId,
    members: { fullName, email },
    books: { name },
  } = issue;

  const navigate = useNavigate();

  const statusToTagName = {
    pending: "red",
    approved: "silver",
    returned: "green",
  };

  return (
    <Table.Row>
      <StyledCell>{name}</StyledCell>
      <StyledCell>
        <span>{fullName}</span>
        <span>{email}</span>
      </StyledCell>
      <StyledCell>
        <span>
          {isToday(new Date(borrowDate))
            ? "Today"
            : formatDistanceFromNow(borrowDate)}{" "}
          &rarr; {dateDifference(borrowDate, returnDate)}{" "}
          {dateDifference(borrowDate, returnDate) > 1 ? "days" : "day"}
        </span>
        <span>
          {format(borrowDate, "MMM dd yyyy")} &mdash;{" "}
          {format(returnDate, "MMM dd yyyy")}
        </span>
      </StyledCell>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={issueId} />
            <Menus.List id={issueId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/issues/${issueId}`)}
              >
                See details
              </Menus.Button>

              <Modal.Open opens="confirm">
                <Menus.Button icon={<HiDocumentCheck />}>Approve</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default IssueRow;
