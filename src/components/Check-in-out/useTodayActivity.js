import { useQuery } from "@tanstack/react-query";
import { getBorrowsTodayActivity } from "../../services/apiIssues";

export function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryFn: getBorrowsTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isPending, activities };
}
