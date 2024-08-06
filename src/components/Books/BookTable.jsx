import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookRow from "./BookRow";
import { useBooks } from "./useBooks";
import { useEffect, useState } from "react";
import Pagination from "../../ui/Pagination";

function BookTable({ searchQuery }) {
  const { isLoading, books = [], count } = useBooks({ searchQuery });

  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(
    function () {
      const filteredBook = books.filter(
        (book) =>
          book.name.toLowerCase().includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery) ||
          book.category.toLowerCase().includes(searchQuery) ||
          book.isbn.toLowerCase().includes(searchQuery) ||
          book.rackNum.toLowerCase().includes(searchQuery)
      );
      setFilteredBooks(filteredBook);
    },
    [books, searchQuery]
  );

  if (isLoading) return <Spinner />;
  if (!books.length) return <Empty resourceName="books" />;

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
          data={filteredBooks}
          render={(book) => <BookRow book={book} key={book.id} />}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default BookTable;
