//import sql from '$lib/server/db.ts'
//import type { RequestHandler } from './$types';
import  sql from '$lib/server/db';
import { urlSuffixGen } from '$lib/Helpers/encoder';

export const actions = {
  default : async ({ request }) => {
    const formData = await request.formData();
    const url = formData.get('long_url');

    if (typeof url !== 'string' || !url) {
      return { success: false, message: 'Invalid URL' }
    }
 
    try{

      const result = await sql.begin(async (tx) =>{

        const [entry] = await tx`
          INSERT INTO urlmappings (long_url) 
          VALUES (${ url }) RETURNING id
          `

        const shortUrl= urlSuffixGen(entry.id)
        
        await tx`
        UPDATE urlmappings 
        SET short_url = ${shortUrl}
        WHERE id = ${entry.id}
        `
        return shortUrl
      })
       return { success: true, shortUrlSuffix: result };
      } catch (error) {
        
        console.error(error);
        return { success: false, message: 'Could not add URL to database.' };
      }
      
  }
}



