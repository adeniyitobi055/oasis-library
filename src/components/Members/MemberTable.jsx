import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import MemberRow from "./MemberRow";

function MemberTable() {
  const members = [
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      address: "1B, Iganmu Lagos State",
      nationality: "Nigerian",
      nationalID: "888023267678",
      startDate: "31/07/2024",
      expiryDate: "31/12/2024",
      type: "premium",
      status: "active",
    },
  ];

  return (
    <Menus>
      <Table columns="1.6fr 1.2fr 1.5fr 1fr 1fr 0.5fr">
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
