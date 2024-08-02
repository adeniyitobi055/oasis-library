import { isFuture, isPast, isToday } from "date-fns";
import supabase from "./supabase";

export const membershipTypes = [
  { value: "regular", label: "Regular", color: "#ff0000", price: 100 },
  { value: "classic", label: "Classic", color: "#0000ff", price: 250 },
  { value: "premium", label: "Premium", color: "#00ff00", price: 400 },
];

export async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  const countries = await response.json();

  return countries.map((country) => ({
    name: country.name.common,
    flag: country.flags.svg,
    id: country.cca3,
  }));
}

export async function getMembers() {
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    console.error(error);
    throw new Error("Members could not be loaded");
  }

  return data;
}

export async function createUpdateMember(newMember, id) {
  let status;
  if (
    isPast(new Date(newMember.expiryDate)) &&
    !isToday(new Date(newMember.expiryDate))
  )
    status = "expired";
  if (
    isFuture(new Date(newMember.issueDate)) ||
    isToday(new Date(newMember.issueDate))
  )
    status = "unconfirmed";
  if (
    (isFuture(new Date(newMember.expiryDate)) ||
      isToday(new Date(newMember.expiryDate))) &&
    isPast(new Date(newMember.issueDate)) &&
    !isToday(new Date(newMember.issueDate))
  )
    status = "active";

  // .1 Create/Edit member
  let query = supabase.from("members");

  //   A) Create
  if (!id)
    query = query.insert([
      {
        ...newMember,
        nationality: newMember.nationality,
        countryFlag: newMember.countryFlag,
        type: newMember.type,
        price: newMember.price,
        status: status,
      },
    ]);

  //   B) Update
  if (id)
    query = query
      .update([
        {
          ...newMember,
          nationality: newMember.nationality,
          countryFlag: newMember.countryFlag,
          type: newMember.type,
          price: newMember.price,
          status: status,
        },
      ])
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Member could not be created");
  }

  return data;

  console.log("Data: ", data);
}

export async function deleteMember(id) {
  const { data, error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Member could not be deleted");
  }

  return data;
}
