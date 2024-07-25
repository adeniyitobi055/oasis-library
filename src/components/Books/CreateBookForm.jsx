import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import useCreateBook from "./useCreateBook";
// import { useState } from "react";

function CreateBookForm({ onCloseModal }) {
  const { isCreating, createBook } = useCreateBook();

  const { handleSubmit, reset, formState, register } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log("Data: ", data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log("Image: ", image);

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

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.bookName?.message}>
        <Input
          type="text"
          id="name"
          defaultValue=""
          disabled={isCreating}
          placeholder="The 48 laws of power"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Author" error={errors?.author?.message}>
        <Input
          type="text"
          id="author"
          defaultValue=""
          disabled={isCreating}
          placeholder="Robert Greene"
          {...register("author", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="ISBN" error={errors?.isbn?.message}>
        <Input
          type="text"
          id="isbn"
          defaultValue=""
          disabled={isCreating}
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
          disabled={isCreating}
          {...register("rackNum", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Category" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          defaultValue=""
          placeholder="Psychology"
          disabled={isCreating}
          {...register("category", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating}
          placeholder="The 48 Laws of Power offers a view on gaining power that warrants a critical psychological analysis"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Book photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", { required: "This field is required" })}
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
        <Button disabled={isCreating}>Add new book</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookForm;
