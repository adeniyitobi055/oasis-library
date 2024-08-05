import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookRow from "./BookRow";
import { useBooks } from "./useBooks";
import { useEffect, useState } from "react";
import BookTableOperations from "./BookTableOperations";

function BookTable({ searchQuery }) {
  const { isLoading, books = [] } = useBooks();
  const [searchParams] = useSearchParams();

  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(
    function () {
      const filteredBook = books.filter(
        (book) =>
          book.name.toLowerCase().includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery)
      );
      setFilteredBooks(filteredBook);
    },
    [books, searchQuery]
  );

  if (isLoading) return <Spinner />;
  if (!books.length) return <Empty resourceName="books" />;

  // 1) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  // const sortedBooks = books.sort((a, b) => (a[field] - b[field]) * modifier);
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const fieldA = a[field].toLowerCase();
    const fieldB = b[field].toLowerCase();

    if (fieldA < fieldB) return -1 * modifier;
    if (fieldA > fieldB) return 1 * modifier;
    return 0;
  });

  return (
    <Menus>
      <Table columns="0.5fr 1.8fr 1.3fr 1.5fr 0.7fr 1.2fr 0.4fr">
        <Table.Header>
          <div></div>
          <div>Book</div>
          <div>Author</div>
          <div>ISBN</div>
          <div>Rack</div>
          <div>Category</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBooks}
          render={(book) => <BookRow book={book} key={book.id} />}
        />
      </Table>
    </Menus>
  );
}

export default BookTable;
