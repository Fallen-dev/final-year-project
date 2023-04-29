import { db } from "$lib/db";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const {data: messages, error} = await db.from('messages').select('*')
  const {data: faculties} = await db.from('Faculty').select('*')
  
  if (error) return fail(500, {error: 'Could not fetch data at the moment'})

  return {
    messages,
    faculties
  }
};

export const actions: Actions = {
	deleteMessage: async ({ request }) => {
		const data = await request.formData()

		const { error } = await db.from('messages').delete().eq('id', data.get('id'))
		if (error) return fail(500, { error: 'Could not delete the message!' })

		return { messageDeletedSuccess: true }
	}
};