import { GiBlackBook } from "react-icons/gi";
import styled from "styled-components";
import { dateDifference, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { Flag } from "../../ui/Flag";
import DataItem from "../../ui/DataItem";
import {
  HiMiniInboxStack,
  HiOutlineChatBubbleBottomCenterText,
} from "react-icons/hi2";
import Tag from "../../ui/Tag";

const StyledIssueDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 6rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    margin-left: 4px;
    font-size: 2rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function IssueDataBox({ issue }) {
  const {
    created_at,
    borrowDate,
    returnDate,
    duration,
    observations,
    members: {
      fullName,
      email,
      nationality,
      nationalID,
      countryFlag,
      type,
      maxDuration,
    },
    books: { name },
  } = issue;

  const typeToTagName = {
    regular: "bronze",
    classic: "silver",
    premium: "gold",
  };

  return (
    <StyledIssueDataBox>
      <Header>
        <div>
          <GiBlackBook />
          <p>
            Borrowed {name} for {dateDifference(borrowDate, returnDate)}{" "}
            {dateDifference(borrowDate, returnDate) > 1 ? "days" : "day"}
          </p>
        </div>

        <p>
          {format(new Date(borrowDate), "EEE, MMM dd yyyy")}(
          {isToday(new Date(borrowDate))
            ? "Today"
            : formatDistanceFromNow(borrowDate)}
          )&mdash; {format(new Date(returnDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Member>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <p>{fullName}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Member>

        {observations && (
          <DataItem icon={<HiOutlineChatBubbleBottomCenterText />}>
            {observations}
          </DataItem>
        )}

        {type && (
          <DataItem icon={<HiMiniInboxStack />}>
            <Tag type={typeToTagName[type]}>{type}</Tag>
          </DataItem>
        )}
      </Section>

      <Footer>
        <p>Issued {format(new Date(created_at), "EEE, MMM dd yyyy")}</p>
      </Footer>
    </StyledIssueDataBox>
  );
}

export default IssueDataBox;
