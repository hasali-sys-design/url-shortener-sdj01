import sql from "$lib/server/db";
import { urlSuffixGen } from "$lib/Helpers/encoder";
import type { Sql, TransactionSql } from "postgres";
import type { PageServerLoad } from "./$types.js";

import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
  const shortUrlList = await sql`
    SELECT short_url
    FROM urlmappings
    WHERE long_url IS NOT NULL
    `;

  return { origin: url.origin, shortUrlList };
};

export const actions = {
  
  s3Upload: async ({ fetch }) => {
    //SDJ02
    
    const res = await fetch('/api/paste', {method:'POST'})
    if (!res.ok) return error(500, { message: 'Failed to create paste'})

    const { pasteId, uploadUrl } = await res.json()
    return {pasteId, uploadUrl}
    // SDJ01 
    // const longUrl = formData.get("long_url");
    // const origin = url.origin;

    
    // if (typeof longUrl !== "string" || !longUrl) {
    //   return { success: false, message: "Invalid URL" };
    // }
  },
  finalize: async({ request })=>{
    const data = await request.formData()
    const pasteId = data.get('pasteId')
    
    if (typeof pasteId !== 'string') {
      return { success: false, message: 'Invalid pasteId' };
    }

    
    try {
      const result = await sql.begin(async (tx: any) => {
        const [existingRow] = await tx`
          SELECT short_url
          FROM urlmappings
          WHERE long_url = ${pasteId}
            AND expiry_time >= NOW()
          LIMIT 1
        `;
        //find unused short urls
        if (existingRow) {
          return `${origin}/${existingRow.short_url}`
        } else {
          const [claimed] = await tx`
          WITH candidate AS (
            SELECT id
            FROM urlmappings
            WHERE expiry_time < NOW()
            LIMIT 1
            FOR UPDATE SKIP LOCKED
            )
            UPDATE urlmappings
            SET long_url = ${pasteId},
            expiry_time = NOW() + INTERVAL '1 year'
            FROM candidate
            WHERE urlmappings.id = candidate.id
            RETURNING short_url
            `;

          return `${origin}/${claimed.short_url}`;
        }
      });
      return { 
        success: true, 
        shortUrl: result,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Could not add URL to database." };
    }
  }
  
};
