import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData()
		const email = data.get('email') || 'me@example.com'
		const name = data.get('name')?.toString().trim() as string
		const role = data.get('role') as string

		if (name && role) {
			cookies.set('user', `${name};${email};${role}`)
			throw redirect(302, '/')
		}

		return fail(500, { message: 'Something went wrong' })
	}
} as Actions
