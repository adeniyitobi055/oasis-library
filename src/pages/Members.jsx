import AddMember from "../components/Members/AddMember";
import MemberTable from "../components/Members/MemberTable";
import MemberTableOperations from "../components/Members/MemberTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Members() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Members</Heading>
        <MemberTableOperations />
      </Row>

      <Row>
        <MemberTable />
        <AddMember />
      </Row>
    </>
  );
}

export default Members;
