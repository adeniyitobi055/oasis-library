import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function BookTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name from (A-Z)" },
          { value: "name-dsc", label: "Sort by name from (Z-A)" },
          { value: "author-asc", label: "Sort by author from (A-Z)" },
          { value: "author-dsc", label: "Sort by author from (Z-A)" },
          { value: "category", label: "Sort by category" },
        ]}
      />
    </TableOperations>
  );
}

export default BookTableOperations;
