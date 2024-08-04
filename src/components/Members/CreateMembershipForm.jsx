import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { fetchCountries, membershipTypes } from "../../services/apiMembers";
import { useCreateMember } from "./useCreateMember";
import toast from "react-hot-toast";
import { useUpdateMember } from "./useUpdateMember";
import { formatDate } from "../../utils/helpers";

function CreateMembershipForm({ memberToEdit = {}, onCloseModal }) {
  const [countries, setCountries] = useState([]);
  const { createMember, isCreating } = useCreateMember();
  const { editMember, isEditing } = useUpdateMember();

  const { id: editId, ...editValues } = memberToEdit;
  const isEditSession = Boolean(editId);

  const isWorking = isCreating || isEditing;

  const [selectedCountry, setSelectedCountry] = useState({
    name: "",
    flag: "",
    id: "",
  });
  const [selectedMembershipType, setSelectedMembershipType] = useState({
    value: "",
    label: "",
  });

  const { handleSubmit, reset, register, formState, setValue } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  useEffect(() => {
    async function loadCountries() {
      try {
        const countriesData = await fetchCountries();
        const sortedCountries = countriesData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCountries(sortedCountries);

        if (isEditSession) {
          const country = sortedCountries.find(
            (c) => c.name === editValues.nationality
          );
          setSelectedCountry({
            id: country?.id || "",
            name: editValues.nationality || "",
          });

          setValue("nationality", editValues.nationality);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadCountries();
  }, [editValues.nationality, isEditSession, setValue]);

  useEffect(() => {
    if (isEditSession) {
      const type = membershipTypes.find((t) => t.value === editValues.type);
      setSelectedMembershipType({
        value: editValues.type || "",
        label: type?.label | "",
      });

      setValue("type", editValues.type);

      setValue("issueDate", formatDate(editValues.issueDate));
      setValue("expiryDate", formatDate(editValues.expiryDate));
    }
  }, [
    editValues.type,
    isEditSession,
    setValue,
    editValues.issueDate,
    editValues.expiryDate,
  ]);

  function handleCountryChange(e) {
    const countryId = e.target.value;
    const country = countries.find((c) => c.id == countryId);

    setSelectedCountry({
      id: countryId,
      name: country.name,
      flag: country.flag,
    });
  }

  function handleTypeChange(e) {
    const typeValue = e.target.value;
    const type = membershipTypes.find((s) => s.value == typeValue);

    setSelectedMembershipType({
      value: typeValue,
      label: type.label,
      price: type.price,
    });
  }

  function onSubmit(data) {
    if (!selectedCountry.id) {
      toast.error("Country is not selected");
      return;
    }

    if (!selectedMembershipType.value) {
      toast.error("Type is not selected");
      return;
    }

    const memberData = {
      ...data,
      nationality: selectedCountry.name,
      countryFlag: selectedCountry.flag,
      type: selectedMembershipType.value,
      price: selectedMembershipType.price,
    };

    if (isEditSession) {
      editMember(
        { newMemberData: { ...memberData }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createMember(memberData, {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function onError(err) {
    console.error(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          id="fullName"
          type="text"
          defaultValue=""
          placeholder="John Doe"
          disabled={isWorking}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          id="email"
          type="text"
          defaultValue=""
          disabled={isWorking}
          placeholder="johndoe@gmail.com"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Select
          id="nationality"
          value={selectedCountry.id}
          key={selectedCountry.id}
          onChange={(e) => handleCountryChange(e)}
          disabled={isWorking}
          options={[
            { value: "", label: "Select country" },
            ...countries.map((country) => ({
              value: country.id,
              label: country.name,
            })),
          ]}
        />
      </FormRow>
      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          id="nationalID"
          type="text"
          disabled={isWorking}
          defaultValue=""
          placeholder="9547489053"
          {...register("nationalID", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Membership Type" error={errors?.type?.message}>
        <Select
          id="type"
          disabled={isWorking}
          value={selectedMembershipType.value}
          key={selectedMembershipType.value}
          onChange={(e) => handleTypeChange(e)}
          options={[
            { value: "", label: "Select type" },
            ...membershipTypes.map((status) => ({
              value: status.value,
              label: status.label,
              color: status.color,
            })),
          ]}
        />
      </FormRow>
      <FormRow label="Issue Date" error={errors?.issueDate?.message}>
        <Input
          id="issueDate"
          type="date"
          defaultValue={editValues.issueDate || ""}
          disabled={isWorking}
          {...register("issueDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Expiry Date" error={errors?.expiryDate?.message}>
        <Input
          id="expiryDate"
          type="date"
          defaultValue={editValues.expiryDate || ""}
          disabled={isWorking}
          {...register("expiryDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.address?.message}>
        <Textarea
          id="address"
          type="text"
          defaultValue=""
          disabled={isWorking}
          placeholder="1B, Iganmu, Lagos State."
          {...register("address", { required: "This field is required" })}
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
          {isEditSession ? "Edit member" : "Create new member"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateMembershipForm;
