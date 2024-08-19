import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Member = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, members, duration } = activity;

  return (
    <StyledTodayItem>
      {status === "pending" && <Tag type="green">pending</Tag>}
      {status === "checked-in" && <Tag type="blue">Completed</Tag>}

      <Flag src={members.countryFlag} alt={`Flag of ${members.country}`} />
      <Member>{members.fullName}</Member>
      <div>
        {duration} {duration > 1 ? "days" : "day"}
      </div>

      {status === "pending" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkout/${id}`}
        >
          Check out
        </Button>
      )}
      {status === "checked-out" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
