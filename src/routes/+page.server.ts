//import sql from '$lib/server/db.ts'
//import type { RequestHandler } from './$types';
import  sql from '$lib/server/db';
import type { PageServerLoad } from './$types.js';
export const actions = {
  default : async ({ request }) => {
    const formData = await request.formData();
    const url = formData.get('long_url');

    if (typeof url !== 'string' || !url) {
      return { success: false, message: 'Invalid URL' };
    }

    try{
      const entry = await sql`INSERT INTO urlmappings (long_url) VALUES (${ url }) RETURNING long_url`;
      return { success: true, entry };
    } catch (error) {
      // Log error and handle database issues
      console.error(error);
      return { success: false, message: 'Could not add URL to database.' };
    }
  }
}
export const load:PageServerLoad = async () => {
  try {
    const result = await sql`SELECT now() as time`;

    return {
      ok: true,
      db_time: result[0].time
    };
  } catch (err) {
    return {
      ok: false,
      error: String(err)
    };
  }
};


