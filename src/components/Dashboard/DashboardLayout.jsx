import styled from "styled-components";
import Stats from "./Stats";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import { useRecentBorrows } from "./useRecentBorrows";
import { useRecentIssues } from "./useRecentIssues";
import { useBooks } from "../Books/useBooks";
import Spinner from "../../ui/Spinner";
import TodayActivity from "../Check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    isPending: isPending1,
    numDays,
    confirmedBorrows,
  } = useRecentBorrows();
  const { isPending: isPending2, issues } = useRecentIssues();
  const { isPending: isPending3, books } = useBooks({ fetchAll: true });

  if (isPending1 || isPending2 || isPending3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        issues={issues}
        confirmedBorrows={confirmedBorrows}
        numDays={numDays}
        bookCount={books.length}
      />
      <TodayActivity />
      <DurationChart confirmedBorrows={confirmedBorrows} />
      <SalesChart issues={issues} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
