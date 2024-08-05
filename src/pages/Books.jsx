import { useState } from "react";
import AddBook from "../components/Books/AddBook";
import BookTable from "../components/Books/BookTable";
import BookTableOperations from "../components/Books/BookTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Books() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query) {
    setSearchQuery(query.toLowerCase());
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Books</Heading>
        <BookTableOperations onSearch={handleSearch} />
      </Row>

      <Row>
        <BookTable searchQuery={searchQuery} />
        <AddBook />
      </Row>
    </>
  );
}

export default Books;
