import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembers } from "../../services/apiMembers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useMembers({ fetchAll = false }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "issueDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data: members, count } = {},
    error,
  } = useQuery({
    queryKey: ["members", filter, sortBy, fetchAll ? null : page],
    queryFn: () => getMembers({ filter, sortBy, page: fetchAll ? null : page }),
  });

  if (!fetchAll) {
    // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["members", filter, sortBy, page + 1],
        queryFn: () => getMembers({ filter, sortBy, page: page + 1 }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["members", filter, sortBy, page - 1],
        queryFn: () => getMembers({ filter, sortBy, page: page - 1 }),
      });
  }

  return { isPending, members, error, count };
}
