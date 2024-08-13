import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "../../services/apiIssues";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useIssues({ fetchAll = false } = {}) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "borrowDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data: issues, count } = {},
    error,
  } = useQuery({
    queryKey: ["issues", filter, sortBy, fetchAll ? null : page],
    queryFn: () => getIssues({ filter, sortBy, page: fetchAll ? null : page }),
  });

  if (!fetchAll) {
    // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["issues", filter, sortBy, page + 1],
        queryFn: () => getIssues({ filter, sortBy, page: page + 1 }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["issues", filter, sortBy, page - 1],
        queryFn: () => getIssues({ filter, sortBy, page: page - 1 }),
      });
  }

  return { isPending, error, issues, count };
}
