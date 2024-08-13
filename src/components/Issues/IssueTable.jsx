import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import IssueRow from "./IssueRow";
import { useIssues } from "./useIssues";

function IssueTable() {
  const { isPending, issues, count } = useIssues();

  if (isPending) return <Spinner />;
  if (!issues.length) return <Empty resourceName="issues" />;

  return (
    <Menus>
      <Table columns="1.5fr 1.5fr 1.7fr 1fr 0.5fr">
        <Table.Header>
          <div>Book</div>
          <div>Member</div>
          <div>Dates</div>
          <div>Status</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={issues}
          render={(issue) => <IssueRow issue={issue} key={issue.id} />}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default IssueTable;
