import AddIssue from "../components/Issues/AddIssue";
import IssueTable from "../components/Issues/IssueTable";
import IssueTableOperations from "../components/Issues/IssueTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Issues() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Issues</Heading>
        <IssueTableOperations />
      </Row>

      <Row>
        <IssueTable />
        <AddIssue />
      </Row>
    </>
  );
}

export default Issues;
