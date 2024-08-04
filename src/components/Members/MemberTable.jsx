import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import MemberRow from "./MemberRow";
import { useMembers } from "./useMembers";

function MemberTable() {
  const { isPending, members } = useMembers();

  if (isPending) return <Spinner />;
  if (!members.length) return <Empty resourceName="members" />;

  return (
    <Menus>
      <Table columns="1.6fr 1.2fr 1.7fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div>Member</div>
          <div>Nationality</div>
          <div>Dates</div>
          <div>Type</div>
          <div>Status</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={members}
          render={(member) => <MemberRow member={member} key={member.id} />}
        />
      </Table>
    </Menus>
  );
}

export default MemberTable;
