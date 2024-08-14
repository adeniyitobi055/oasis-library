import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../../services/apiBooks";

export function useBook() {
  const { bookId } = useParams();

  const {
    isPending,
    data: book,
    error,
  } = useQuery({ queryKey: ["books", bookId], queryFn: () => getBook(bookId) });

  return { isPending, book, error };
}
