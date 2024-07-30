import supabase from "./supabase";

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
  // Fetch country data
  const countries = await fetchCountries();
  const country = countries.find((c) => c.name === newMember.country);
  const countryFlag = country?.flag || "";

  newMember.countryFlag = countryFlag;

  // .1 Create/Edit member
  let query = supabase.from("members");

  //   A) Create
  if (!id) query = query.insert([{ ...newMember }]);

  //   B) Update
  if (id) query = query.update([{ ...newMember }]).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Member could not be created");
  }

  return data;
}

export async function deleteMember(id) {
  const { data, error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Member could not be deleted");
  }

  return data;
}
