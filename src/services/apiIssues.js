import { isFuture, isPast, isToday } from "date-fns";
import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function createIssue(newIssue) {
  let status = "pending";

  if (
    isPast(new Date(newIssue.returnDate)) &&
    !isToday(new Date(newIssue.returnDate))
  )
    status = "checked-in";
  if (
    isFuture(new Date(newIssue.borrowDate)) ||
    isToday(new Date(newIssue.borrowDate))
  )
    status = "pending";
  if (
    (isFuture(new Date(newIssue.returnDate)) ||
      isToday(new Date(newIssue.returnDate))) &&
    isPast(new Date(newIssue.borrowDate)) &&
    !isToday(new Date(newIssue.borrowDate))
  )
    status = "checked-out";

  let query = supabase.from("issues");

  query = query.insert([
    {
      ...newIssue,
      status: status,
      memberId: newIssue.memberId,
      bookId: newIssue.bookId,
    },
  ]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Issue could not be created");
  }

  return data;
}

export async function getIssues({ filter, sortBy, page } = {}) {
  let query = supabase
    .from("issues")
    .select("*, books(name), members(fullName, email)", { count: "exact" });

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page !== null) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Issues could not be loaded");
  }

  return { data, count };
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
