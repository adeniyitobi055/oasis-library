import { format, isToday } from "date-fns";
import { FaUsers } from "react-icons/fa6";
import styled from "styled-components";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { Flag } from "../../ui/Flag";
import DataItem from "../../ui/DataItem";
import Tag from "../../ui/Tag";
import {
  HiClock,
  HiMiniInboxStack,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const StyledMemberDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.div`
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

const Paid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.div`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function MemberDataBox({ member }) {
  const {
    fullName,
    created_at,
    email,
    address,
    nationality,
    nationalID,
    type,
    issueDate,
    expiryDate,
    countryFlag,
    maxDuration,
    isPaid,
    price,
  } = member;

  const typeToTagName = {
    regular: "bronze",
    classic: "silver",
    premium: "gold",
  };
  return (
    <StyledMemberDataBox>
      <Header>
        <div>
          <FaUsers />
          <p>{fullName}</p>
        </div>

        <p>
          {format(new Date(issueDate), "EEE, MMM dd yyyy")}
          {isToday(
            new Date(issueDate) ? "Today" : formatDistanceFromNow(issueDate)
          )}
          &mdash; {format(new Date(expiryDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Member>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
          <span>&bull;</span>
          <p>{address}</p>
        </Member>

        {type && (
          <DataItem icon={<HiMiniInboxStack />} label="Type">
            <Tag type={typeToTagName[type]}>{type}</Tag>
          </DataItem>
        )}

        {maxDuration && (
          <DataItem icon={<HiClock />} label="Maximum Duration">
            Borrow a book for max {maxDuration} days
          </DataItem>
        )}
      </Section>

      <Paid isPaid={isPaid}>
        <DataItem icon={<HiOutlineCurrencyDollar />} label="Total Price">
          {formatCurrency(price)}
        </DataItem>

        <p>{isPaid ? "Paid" : "Will pay at property"}</p>
      </Paid>

      <Footer>
        <p>Created {format(new Date(created_at), "EEE, MMM dd yyyy")}</p>
      </Footer>
    </StyledMemberDataBox>
  );
}

export default MemberDataBox;
