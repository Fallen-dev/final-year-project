import { redirect } from '@sveltejs/kit';

export const load = async ({cookies}): Promise<any> => {
  if (!cookies.get('user')) throw redirect(302, '/login')

  return {
    user: cookies.get('user')
  }
};