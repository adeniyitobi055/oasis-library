import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBooks({ searchQuery, fetchAll = false }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data: books, count } = {},
    error,
  } = useQuery({
    queryKey: ["books", sortBy, fetchAll ? null : page, searchQuery],
    queryFn: () =>
      getBooks({ sortBy, page: fetchAll ? null : page, searchQuery }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["books", sortBy, page + 1, searchQuery],
      queryFn: () => getBooks({ sortBy, page: page + 1, searchQuery }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["books", sortBy, page - 1, searchQuery],
      queryFn: () => getBooks({ sortBy, page: page - 1, searchQuery }),
    });

  return { isPending, error, books, count };
}
