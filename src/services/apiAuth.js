import supabase, { supabaseUrl } from "../services/supabase";

export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signUpUser({ email, password, fullName }) {
  console.log(email, password);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function userDataUpdate({ fullName, password, avatar }) {
  let updatedObj;
  if (password)
    updatedObj = {
      password,
    };
  if (fullName)
    updatedObj = {
      data: {
        fullName,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updatedObj);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const newImgUrl = `avatar-${data.user.id}-${Math.random()}`;
  //load avattar image to storage
  const { error: loadingImgErrr } = await supabase.storage
    .from("avatars")
    .upload(newImgUrl, avatar);

  if (loadingImgErrr) throw new Error(loadingImgErrr.message);

  const { data: updatedUserData, error: errorImgUrl } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${newImgUrl}`,
      },
    });

  if (errorImgUrl) throw new Error(errorImgUrl.message);

  return updatedUserData;
}
