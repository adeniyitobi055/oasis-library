import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import BookRow from "./BookRow";

function BookTable() {
  const books = [
    {
      name: "The 48 Laws of Power",
      author: "Robert Greene",
      isbn: "ISBN 0-061-96436-0",
      rack: 9,
      category: "Psychology",
    },
  ];

  // 1) FILTER
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2fr 2fr 0.7fr 1fr 1fr">
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
          data={books}
          render={(book) => <BookRow book={book} key={book.isbn} />}
        />
      </Table>
    </Menus>
  );
}

export default BookTable;
