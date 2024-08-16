import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getIssuesAfterDate } from "../../services/apiIssues";

export function useRecentIssues() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: issues } = useQuery({
    queryFn: () => getIssuesAfterDate(queryDate),
    queryKey: ["issues", `last-${numDays}`],
  });

  return { isPending, issues };
}
