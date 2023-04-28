import { db } from "$lib/db";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {
  const {data: messages, error} = await db.from('messages').select('*')
  
  const {data: faculties} = await db.from('Faculty').select('*')
  
  if (error) return fail(500, {message: error})

  return {
    messages,
    faculties
  }
};