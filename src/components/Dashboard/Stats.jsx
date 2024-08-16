import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { SiBookstack } from "react-icons/si";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ issues, confirmedBorrows, numDays, bookCount }) {
  const numIssues = issues.length;
  const sales = issues.reduce((acc, cur) => acc + cur.members.price, 0);
  const checkouts = confirmedBorrows.length;

  const borrowing =
    confirmedBorrows.reduce((acc, cur) => acc + cur.duration, 0) /
    (numDays * bookCount);
  // duration / all available nights (num days * num of cabins)

  return (
    <>
      <Stat
        title="Issues"
        color="blue"
        icon={<SiBookstack />}
        value={numIssues}
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        title="Check outs"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkouts}
      />
      <Stat
        title="Borrow Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(borrowing * 100) + "%"}
      />
    </>
  );
}

export default Stats;
