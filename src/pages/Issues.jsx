import AddIssue from "../components/Issues/AddIssue";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Issues() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Issues</Heading>
      </Row>

      <Row>
        <AddIssue />
      </Row>
    </>
  );
}

export default Issues;
