import supabase from "./supabase";

export async function createUpdateIssue(newIssue, id) {}

export async function getIssues() {
  let query = supabase.from("issues").select("*");

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Issues could not be loaded");
  }

  return data;
}

export async function getIssue(id) {
  const { data, error } = await supabase
    .from("issues")
    .select("*, books(*), members(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Issue not found");
  }

  return data;
}

export async function updateIssue(id, obj) {
  const { data, error } = await supabase
    .from("issues")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Issue could not be updated");
  }

  return data;
}

export async function deleteIssue(id) {
  const { data, error } = await supabase.from("issues").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Issue could not be deleted");
  }

  return data;
}
