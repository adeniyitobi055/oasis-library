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

function CreateMembershipForm({ onCloseModal }) {
  const [countries, setCountries] = useState([]);
  const { createMember, isCreating } = useCreateMember();
  const [selectedCountry, setSelectedCountry] = useState({
    name: "",
    flag: "",
    id: "",
  });
  const [selectedMembershipType, setSelectedMembershipType] = useState({
    value: "",
    label: "",
    color: "",
  });

  const { handleSubmit, reset, register, formState } = useForm();
  const { errors } = formState;

  useEffect(() => {
    async function loadCountries() {
      try {
        const countriesData = await fetchCountries();
        const sortedCountries = countriesData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    }
    loadCountries();
  }, []);

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
      color: type.color,
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
    createMember(memberData, {
      onSuccess: (data) => {
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
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          id="fullName"
          type="text"
          defaultValue=""
          placeholder="John Doe"
          disabled={isCreating}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          id="email"
          type="text"
          defaultValue=""
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue=""
          placeholder="9547489053"
          {...register("nationalID", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Membership Type" error={errors?.type?.message}>
        <Select
          id="type"
          disabled={isCreating}
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
          defaultValue=""
          disabled={isCreating}
          {...register("issueDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Expiry Date" error={errors?.expiryDate?.message}>
        <Input
          id="expiryDate"
          type="date"
          defaultValue=""
          disabled={isCreating}
          {...register("expiryDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.address?.message}>
        <Textarea
          id="address"
          type="text"
          defaultValue=""
          disabled={isCreating}
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
        <Button disabled={isCreating}>Create Member</Button>
      </FormRow>
    </Form>
  );
}

export default CreateMembershipForm;
