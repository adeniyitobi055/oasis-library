import AddBook from "../components/Books/AddBook";
import BookTable from "../components/Books/BookTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Books() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Books</Heading>
      </Row>

      <Row>
        <BookTable />
        <AddBook />
      </Row>
    </>
  );
}

export default Books;
