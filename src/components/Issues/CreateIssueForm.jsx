import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useBooks } from "../Books/useBooks";
import { useMembers } from "../Members/useMembers";
import Select from "../../ui/Select";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";

function CreateIssueForm() {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const { register, formState } = useForm();
  const { errors } = formState;

  const { members, isPending } = useMembers({
    fetchAll: true,
  });
  const { books, isPending: isLoading } = useBooks({ fetchAll: true });

  if (isPending || isLoading) return <SpinnerMini />;

  function handleMemberChange(e) {
    const selectedMemberId = Number(e.target.value);
    setSelectedMember(selectedMemberId);
  }

  function handleBookChange(e) {
    const selectedBookId = Number(e.target.value);
    setSelectedBook(selectedBookId);
  }

  return (
    <Form>
      <FormRow label="Member Name" error={errors?.member?.message}>
        <Select
          id="member"
          value={selectedMember}
          key={selectedMember.id}
          onChange={(e) => handleMemberChange(e)}
          options={[
            { value: "", label: "Select member" },
            ...members.map((member) => ({
              label: member.fullName,
              value: member.id,
            })),
          ]}
        />
      </FormRow>
      <FormRow label="Book name" error={errors?.book?.message}>
        <Select
          id="book"
          value={selectedBook}
          key={selectedBook.id}
          onChange={(e) => handleBookChange(e)}
          options={[
            { value: "", label: "Select book" },
            ...books.map((book) => ({
              label: book.name,
              value: book.id,
            })),
          ]}
        />
      </FormRow>
    </Form>
  );
}

export default CreateIssueForm;
