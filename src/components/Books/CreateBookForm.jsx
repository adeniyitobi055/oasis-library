import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import { useCreateBook } from "./useCreateBook";
import { useUpdateBook } from "./useUpdateBook";
// import { useState } from "react";

function CreateBookForm({ bookToEdit = {}, onCloseModal }) {
  const { isCreating, createBook } = useCreateBook();
  const { isEditing, editBook } = useUpdateBook();

  const { id: editId, ...editValues } = bookToEdit;
  const isEditSession = Boolean(editId);

  const isWorking = isCreating || isEditing;

  const { handleSubmit, reset, formState, register } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editBook(
        { newBookData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createBook(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          defaultValue=""
          disabled={isWorking}
          placeholder="The 48 laws of power"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Author" error={errors?.author?.message}>
        <Input
          type="text"
          id="author"
          defaultValue=""
          disabled={isWorking}
          placeholder="Robert Greene"
          {...register("author", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="ISBN" error={errors?.isbn?.message}>
        <Input
          type="text"
          id="isbn"
          defaultValue=""
          disabled={isWorking}
          placeholder="ISBN 0-061-96436-0"
          {...register("isbn", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Rack Number" error={errors?.rackNum?.message}>
        <Input
          type="text"
          id="rackNum"
          defaultValue=""
          placeholder="Tn-4"
          disabled={isWorking}
          {...register("rackNum", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Category" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          defaultValue=""
          placeholder="Psychology"
          disabled={isWorking}
          {...register("category", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          placeholder="The 48 Laws of Power offers a view on gaining power that warrants a critical psychological analysis"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Book photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
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
        <Button disabled={isWorking}>
          {isEditSession ? "Edit book" : "Add new book"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookForm;
