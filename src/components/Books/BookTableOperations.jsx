import SortBy from "../../ui/SortBy";
// import Input from "../../ui/Input";
import TableOperations from "../../ui/TableOperations";

function BookTableOperations({ onSearch }) {
  return (
    <TableOperations>
      <input
        type="text"
        style={{
          border: `var(--color-grey-300)`,
          backgroundColor: `var(--color-grey-0)`,
          borderRadius: `var(--border-radius-sm)`,
          padding: `0.8rem 1.1rem`,
          boxShadow: `var(--shadow-sm)`,
          width: `20em`,
        }}
        placeholder="Search by book or author"
        onChange={(e) => onSearch(e.target.value)}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name from (A-Z)" },
          { value: "name-dsc", label: "Sort by name from (Z-A)" },
          { value: "author-asc", label: "Sort by author from (A-Z)" },
          { value: "author-dsc", label: "Sort by author from (Z-A)" },
          { value: "category-asc", label: "Sort by category from (A-Z)" },
          { value: "category-dsc", label: "Sort by category from (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookTableOperations;
