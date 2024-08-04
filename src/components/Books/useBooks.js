import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";

export function useBooks() {
  const {
    isPending: isLoading,
    data: books,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });
  return { isLoading, error, books };
}
