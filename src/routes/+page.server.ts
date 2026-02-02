//import sql from '$lib/server/db.ts'
//import type { RequestHandler } from './$types';
import  sql from '$lib/server/db';

export const load = async () => {
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