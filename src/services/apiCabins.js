import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("we can't get cabins data");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("cant delete this ");
  }
  return true;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    console.log("Insert Mode ✅");
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    console.log("Update Mode ✅");
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  // 🔍 Missing Return! You need to return this promise.
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Can't insert or update cabin");
  }

  // 🚀 Upload image if necessary
  if (hasImagePath) return data;

  const { StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(`${imageName}`, newCabin.image);

  if (StorageError) {
    await deleteCabin(data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  // ✅ Important: Return the data!
  return data;
}
