import sql from "$lib/server/db";
import { urlSuffixGen } from "$lib/Helpers/encoder";
import type { Sql, TransactionSql } from "postgres";
import type { PageServerLoad } from "./$types.js";


export const load: PageServerLoad = async ({url}) => {
  
  const shortUrlList = await sql`
    SELECT short_url
    FROM urlmappings
    WHERE long_url IS NOT NULL
    `

  return { origin:url.origin, shortUrlList };
};

export const actions = {
  default: async ({ request, url }) => {
    const formData = await request.formData();
    const longUrl = formData.get("long_url");
    const origin = url.origin;

    if (typeof longUrl !== "string" || !longUrl) {
      return { success: false, message: "Invalid URL" };
    }

    try {
      const result = await sql.begin(async (tx: any) => {
        
       const[existingRow] = await tx`
          SELECT short_url
          FROM urlmappings
          WHERE long_url = ${longUrl}
            AND expiry_time >= NOW()
          LIMIT 1
          
        `;
        //find unused short urls
        if(existingRow){
          return `${origin}/${existingRow.short_url}`
        }else{

          const [claimed] = await tx`
          WITH candidate AS (
            SELECT id
            FROM urlmappings
            WHERE expiry_time < NOW()
            LIMIT 1
            FOR UPDATE SKIP LOCKED
            )
            UPDATE urlmappings
            SET long_url = ${longUrl},
            expiry_time = NOW() + INTERVAL '1 year'
            FROM candidate
            WHERE urlmappings.id = candidate.id
            RETURNING short_url
            `;
            
            
            return `${origin}/${claimed.short_url}`;
          
        }
      });
      return { success: true, shortUrl: result };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Could not add URL to database." };
    }
  },
};
