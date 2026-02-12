//import sql from '$lib/server/db.ts'
//import type { RequestHandler } from './$types';
import  sql from '$lib/server/db';
import { base62Encode } from '$lib/Helpers/encoder';

export const actions = {
  default : async ({ request }) => {
    const formData = await request.formData();
    const url = formData.get('long_url');

    if (typeof url !== 'string' || !url) {
      return { success: false, message: 'Invalid URL' }
    }
   await sql`DEALLOCATE ALL`;
    try{
      const [entry] = await sql`INSERT INTO urlmappings (long_url) VALUES (${ url }) RETURNING id`;
      const shortUrlSuffix= base62Encode(entry.id)

      await sql`
        UPDATE urlmappings 
        SET short_url = ${shortUrlSuffix}
        WHERE id = ${entry.id}
      `
      return { success: true, shortUrlSuffix}
    } catch (error) {
      
      console.error(error);
      return { error, message: 'Could not add URL to database.' };
    }
    
  }
}



