import { isFuture, isPast, isToday } from "date-fns";
import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";
import { getToday } from "../utils/helpers";

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

// Returns all IISUES that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: must be be ISO string
export async function getIssuesAfterDate(date) {
  const { data, error } = await supabase
    .from("issues")
    .select("created_at, members(price)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Issues could not be loaded");
  }

  return data;
}

// Returns all BORROWS that are were created after the given date
export async function getBorrowsAfterDate(date) {
  const { data, error } = await supabase
    .from("issues")
    .select("*, members(fullName)")
    .gte("borrowDate", date)
    .lte("borrowDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Issues could not be loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getBorrowsTodayActivity() {
  const { data, error } = await supabase
    .from("issues")
    .select("*, members(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.pending,borrowDate.eq.${getToday()}),and(status.eq.checked-out,returnDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL issues ever created
  // (borrow.status === 'pending' && isToday(new Date(stay.borrowDate))) ||
  // (borrow.status === 'checked-out' && isToday(new Date(stay.returnDate)))

  if (error) {
    console.error(error);
    throw new Error("Issues could not be loaded");
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
