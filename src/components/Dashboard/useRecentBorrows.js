import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBorrowsAfterDate } from "../../services/apiIssues";

export function useRecentBorrows() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: borrows } = useQuery({
    queryFn: () => getBorrowsAfterDate(queryDate),
    queryKey: ["borrows", `last-${numDays}`],
  });

  const confirmedBorrows = borrows?.filter(
    (borrow) =>
      borrow.status === "checked-out" || borrow.status === "checked-in"
  );

  return { isPending, confirmedBorrows, numDays, borrows };
}
