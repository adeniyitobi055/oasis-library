import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function MemberTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "in-active", label: "In active" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "issueDate-asc", label: "Sort by date (recent first)" },
          { value: "expiryDate-asc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default MemberTableOperations;
