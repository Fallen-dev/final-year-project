import { fail, type Actions } from '@sveltejs/kit'
import { db } from '$lib/db'

export const actions: Actions = {
	send: async ({ cookies, request }) => {
		const data = await request.formData()

		const user = cookies.get('user')?.split(';')[0] as string
		const message = data.get('message')?.toString().trim() as string

		const { error } = await db.from('messages').insert({ user, message })

		if (error) return fail(500, { error: 'Could not send message!' })
	}
}
