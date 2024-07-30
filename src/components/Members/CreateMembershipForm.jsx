import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import "react-datepicker/dist/react-datepicker.css";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { fetchCountries } from "../../services/apiMembers";

function CreateMembershipForm({ onCloseModal }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "",
    flag: "",
    id: "",
  });

  const { handleSubmit, reset, register, formState } = useForm();
  const { errors } = formState;

  function onError(err) {
    console.error(err);
  }

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
    const country = countries.find((c) => c.id === countryId);

    setSelectedCountry({
      id: countryId,
      name: country.name,
      flag: country.flag,
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          id="name"
          type="text"
          defaultValue=""
          placeholder="John Doe"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          id="email"
          type="text"
          defaultValue=""
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
          //   label={selectedCountry}
          onChange={handleCountryChange}
          options={[
            { value: "", label: "Select your country" },
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
          defaultValue=""
          placeholder="9547489053"
          {...register("nationalID", { required: "This field is required" })}
        />
      </FormRow>
      {/* <FormRow label="Type" error={errors?.type?.message}>
        <Select id="type" />
      </FormRow> */}
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          id="startDate"
          type="date"
          defaultValue=""
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          id="endDate"
          type="date"
          defaultValue=""
          {...register("endDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.address?.message}>
        <Textarea
          id="address"
          type="text"
          defaultValue=""
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
        <Button>Create Member</Button>
      </FormRow>
    </Form>
  );
}

export default CreateMembershipForm;
