import { redirect } from '@sveltejs/kit'
import { db } from '$lib/db'

export const load = async ({ cookies }): Promise<any> => {
	if (!cookies.get('user')) throw redirect(302, '/login')

	const { data } = await db.from('messages').select()

	return {
		messages: data || 'No messages',
		user: cookies.get('user')
	}
}
