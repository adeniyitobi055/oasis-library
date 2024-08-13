import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useBooks } from "../Books/useBooks";
import { useMembers } from "../Members/useMembers";
import Select from "../../ui/Select";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { differenceInDays, isAfter, isBefore, parseISO } from "date-fns";
import { formatDate } from "../../utils/helpers";
import Textarea from "../../ui/Textarea";
import { useCreateIssue } from "./useCreateIssue";

function CreateIssueForm({ onCloseModal }) {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [maxDuration, setMaxDuration] = useState(0);
  const [memberStatus, setMemberStatus] = useState("");

  const { register, formState, handleSubmit, watch, reset } = useForm();
  const { errors } = formState;

  const { members, isPending } = useMembers({
    fetchAll: true,
  });
  const { books, isPending: isLoading } = useBooks({ fetchAll: true });
  const { createIssue, isCreating } = useCreateIssue();

  const borrowDate = watch("borrowDate");
  const returnDate = watch("returnDate");

  function calculateDuration() {
    if (borrowDate && returnDate) {
      const parsedBorrowDate = parseISO(borrowDate);
      const parsedReturnDate = parseISO(returnDate);

      // Check if parsed dates are valid
      if (!isNaN(parsedBorrowDate) && !isNaN(parsedReturnDate)) {
        return differenceInDays(parsedReturnDate, parsedBorrowDate);
      }
    }

    return 0;
  }

  if (isPending || isLoading) return <SpinnerMini />;

  function handleMemberChange(e) {
    const selectedMemberId = Number(e.target.value);
    setSelectedMember(selectedMemberId);

    const memberId = members.find((member) => member.id === selectedMemberId);

    setIssueDate(memberId?.issueDate);
    setExpiryDate(memberId?.expiryDate);
    setMemberStatus(memberId?.status);
    setMaxDuration(memberId?.maxDuration);
  }

  function handleBookChange(e) {
    const selectedBookId = Number(e.target.value);
    setSelectedBook(selectedBookId);
  }

  function onSubmit(data) {
    if (!selectedMember) {
      toast.error("Member is not selected");
      return;
    }

    if (!selectedBook) {
      toast.error("Book is not selected");
      return;
    }

    if (memberStatus !== "active") {
      toast.error("Member is not active");
      return;
    }

    const issueData = {
      ...data,
      memberId: selectedMember,
      bookId: selectedBook,
    };

    createIssue(issueData, {
      onSuccess: (data) => {
        console.log("New issue: ", createIssue);
        reset();
        onCloseModal?.();
      },
    });
  }

  function onError(err) {
    console.error(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Member Name" error={errors?.member?.message}>
        <Select
          id="member"
          value={selectedMember}
          key={selectedMember.id}
          disabled={isCreating}
          onChange={(e) => handleMemberChange(e)}
          options={[
            { value: "", label: "Select member" },
            ...members
              .slice()
              .sort((a, b) => a.fullName.localeCompare(b.fullName))
              .map((member) => ({
                label: member.fullName,
                value: member.id,
              })),
          ]}
        />
      </FormRow>
      <FormRow label="Issue Date">
        <Input
          id="issueDate"
          type="date"
          disabled={true}
          value={formatDate(issueDate)}
        />
      </FormRow>
      <FormRow label="Expiry Date">
        <Input
          id="expiryDate"
          type="date"
          disabled={true}
          value={formatDate(expiryDate)}
        />
      </FormRow>
      <FormRow label="Book name" error={errors?.book?.message}>
        <Select
          id="book"
          value={selectedBook}
          key={selectedBook.id}
          disabled={isCreating}
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
      <FormRow label="Borrow Date" error={errors?.borrowDate?.message}>
        <Input
          id="borrowDate"
          type="date"
          disabled={isCreating}
          {...register("borrowDate", {
            required: "This field is required",
            validate: (value) => {
              const parsedBorrowDate = parseISO(value);
              const parsedIssueDate = parseISO(issueDate);
              const parsedExpiryDate = parseISO(expiryDate);

              if (isBefore(parsedBorrowDate, parsedIssueDate)) {
                return "Cannot be before issue date";
              }
              if (isAfter(parsedBorrowDate, parsedExpiryDate)) {
                return "Cannot be after expiry date";
              }
            },
          })}
        />
      </FormRow>
      <FormRow label="Return Date" error={errors?.returnDate?.message}>
        <Input
          id="returnDate"
          type="date"
          disabled={isCreating}
          {...register("returnDate", {
            required: "This field is required",
            validate: (value) => {
              const parsedReturnDate = parseISO(value);
              const parsedIssueDate = parseISO(issueDate);
              const parsedExpiryDate = parseISO(expiryDate);

              if (isBefore(parsedReturnDate, parsedIssueDate)) {
                return "Cannot be before issue date";
              }

              if (isAfter(parsedReturnDate, parsedExpiryDate)) {
                return "Cannot be after expiry date";
              }
            },
          })}
        />
      </FormRow>
      <FormRow label="Duration" error={errors?.duration?.message}>
        <Input
          id="duration"
          type="number"
          readOnly
          value={calculateDuration()}
          {...register("duration", {
            validate: (value) =>
              value <= maxDuration || `Cannot exceed ${maxDuration} days`,
          })}
        />
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          id="observations"
          type="text"
          defaultValue=""
          disabled={isCreating}
          placeholder="I have a strong penchant for science fiction."
          {...register("observations", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create Issue</Button>
      </FormRow>
    </Form>
  );
}

export default CreateIssueForm;
