import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getIssue } from "../../services/apiIssues";

export function useIssue() {
  const { issueId } = useParams();

  const {
    isPending,
    data: issue,
    error,
  } = useQuery({
    queryKey: ["issues", issueId],
    queryFn: () => getIssue(issueId),
  });

  return { isPending, issue, error };
}
