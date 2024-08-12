import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../services/apiIssues";

export function useIssues() {
  const {
    isPending,
    data: issues,
    error,
  } = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  return { isPending, error, issues };
}
