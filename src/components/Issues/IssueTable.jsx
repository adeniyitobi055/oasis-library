import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import IssueRow from "./IssueRow";
import { useIssues } from "./useIssues";

function IssueTable() {
  const { isPending, issues } = useIssues();

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
    </Menus>
  );
}

export default IssueTable;
