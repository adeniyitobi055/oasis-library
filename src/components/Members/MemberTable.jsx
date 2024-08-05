import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import MemberRow from "./MemberRow";
import { useMembers } from "./useMembers";

function MemberTable() {
  const { isPending, members, count } = useMembers();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  console.log("Members: ", members);
  if (!members.length) return <Empty resourceName="members" />;

  const filterValue = searchParams.get("status") || "all";
  let filteredMembers;
  if (filterValue === "all") filteredMembers = members;
  if (filterValue === "active")
    filteredMembers = members.filter((member) => member.status === "active");
  if (filterValue === "in-active")
    filteredMembers = members.filter((member) => member.status === "in-active");
  if (filterValue === "unconfirmed")
    filteredMembers = members.filter(
      (member) => member.status === "unconfirmed"
    );

  // const sortedBooks = books.sort((a, b) => (a[field] - b[field]) * modifier);

  const sortBy = searchParams.get("sortBy") || "issueDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedBooks = [...filteredMembers].sort((a, b) => {
    let fieldA = a[field];
    let fieldB = b[field];

    if (field === "issueDate" || field === "expiryDate") {
      fieldA = new Date(fieldA);
      fieldB = new Date(fieldB);
    }

    if (fieldA < fieldB) return -1 * modifier;
    if (fieldA > fieldB) return 1 * modifier;
    return 0;
  });

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
          data={sortedBooks}
          render={(member) => <MemberRow member={member} key={member.id} />}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default MemberTable;
