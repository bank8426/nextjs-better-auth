"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const signUp = async (email: string, password: string, name: string) => {
  const result = await auth.api.signUpEmail({
    body: { email, password, name },
  });

  return result;
};

export const signIn = async (email: string, password: string) => {
  const { url, user } = await auth.api.signInEmail({
    body: { email, password, callbackURL: "/dashboard" },
    headers: await headers(),
  });

  if (url) redirect(url);

  return user;
};

export const signInSocial = async (provider: "github" | "google") => {
  const { url } = await auth.api.signInSocial({
    body: { provider, callbackURL: "/dashboard" },
  });

  if (url) redirect(url);
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });

  return result;
};
