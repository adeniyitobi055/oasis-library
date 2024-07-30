import supabase, { supabaseUrl } from "./supabase";

export async function getBooks() {
  const { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error(error);
    throw new Error("Books could not be loaded");
  }

  return data;
}

export async function createUpdateBook(newBook, id) {
  const hasImagePath = newBook.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newBook.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newBook.image
    : `${supabaseUrl}/storage/v1/object/public/book-images/${imageName}`;

  // 1. Create/edit book
  let query = supabase.from("books");

  // A) CREATE
  if (!id) query = query.insert([{ ...newBook, image: imagePath }]);

  //   B) UPDATE
  if (id) query = query.update([{ ...newBook, image: imagePath }]).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Book could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("book-images")
    .upload(imageName, newBook.image);

  // 3. Delete the book If there was an error uploading image
  if (storageError) {
    await supabase.from("books").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Book image could not be uploaded and the book was not created"
    );
  }

  return data;
}

export async function deleteBook(id) {
  const { data, error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Book could not be deleted");
  }

  return data;
}
