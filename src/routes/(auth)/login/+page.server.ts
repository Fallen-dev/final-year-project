import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData()
		const email = data.get('email')
		const name = data.get('name')
		const role = data.get('role')

		if (email && name && role) {
      cookies.set('user', `${name};${email};${role}`)
      throw redirect(302, '/')
    }

		return fail(400, { message: 'You must fill all the inputs' })
	}
} as Actions
