import supabase from "./supabase";

export async function createIssue(newIssue) {
  let status = "pending";
  let query = supabase.from("issues");

  query = query.insert([
    {
      ...newIssue,
      status: status,
      memberId: newIssue.memberId,
      bookId: newIssue.bookId,
      book: newIssue.book,
    },
  ]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Issue could not be created");
  }

  return data;
}

export async function getIssues() {
  let query = supabase
    .from("issues")
    .select("*, books(name), members(fullName, email)", { count: "exact" });

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
