//import sql from '$lib/server/db.ts'
//import type { RequestHandler } from './$types';
import  sql from '$lib/server/db';
import type { PageServerLoad } from './$types.js';
import * as cryptop from 'crypto'
import { base62Encode } from '$lib/Helpers/encoder';

export const actions = {
  default : async ({ request }) => {
    const formData = await request.formData();
    const url = formData.get('long_url');

    if (typeof url !== 'string' || !url) {
      return { success: false, message: 'Invalid URL' }
    }
   
    try{
      const [entry] = await sql`INSERT INTO urlmappings (long_url) VALUES (${ url }) RETURNING id`;
      const shortUrlSuffix= base62Encode(entry.id)

      await sql`
        UPDATE urlmappings
        SET short_url = ${shortUrlSuffix}
        WHERE id = ${entry.id}
      `
      return { success: true, entry }
    } catch (error) {
      
      console.error(error);
      return { success: false, message: 'Could not add URL to database.' };
    }
  }
}



