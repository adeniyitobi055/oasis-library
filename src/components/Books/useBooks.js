import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";

function useBooks() {
  const {
    isLoading,
    data: books,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });
  return { isLoading, error, books };
}

export default useBooks;
