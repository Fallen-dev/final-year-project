import { invalidateAll } from '$app/navigation'
import type { Actions } from './$types'

export const load = async ({ cookies }) => {
	// some?
	return {
		user: cookies.get('user')
	}
}

export const actions: Actions = {
	updateDetails: async ({ cookies, request }) => {
		const data = await request.formData()
		const newName = data.get('newname')?.toString().trim() as string
		const newRole = data.get('newrole') as string
		const email = cookies.get('user')?.split(';')[1]

		cookies.set('user', `${newName};${email};${newRole}`)

		return { updateDetails: true }
	},
	logout: ({ cookies }) => {
		cookies.delete('user')
		invalidateAll()
	}
}
