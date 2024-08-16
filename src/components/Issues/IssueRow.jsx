import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { differenceInDays, format, isToday } from "date-fns";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const StyledCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--color-grey-800);
  font-weight: 500;

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
    borrowDate,
    returnDate,
    status,
    members: { fullName, email },
    books: { name },
  } = issue;

  const navigate = useNavigate();

  const statusToTagName = {
    pending: "blue",
    "checked-in": "green",
    "checked-out": "silver",
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
          &rarr; {differenceInDays(returnDate, borrowDate)}{" "}
          {differenceInDays(returnDate, borrowDate) > 1 ? "days" : "day"}
        </span>
        <span>
          {format(borrowDate, "MMM dd yyyy")} &mdash;{" "}
          {format(returnDate, "MMM dd yyyy")}
        </span>
      </StyledCell>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
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

              {status === "checked-out" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${issueId}`)}
                >
                  Check in
                </Menus.Button>
              )}

              {status === "pending" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => navigate(`/checkout/${issueId}`)}
                >
                  Check out
                </Menus.Button>
              )}

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
