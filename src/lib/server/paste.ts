import { error, redirect } from "@sveltejs/kit";
import sql from "$lib/server/db";
import redis from "$lib/server/redis";

export const getPasteByShort = async (short:string) => {
    //Check cache
    const cachedKey = `url:${short}`;
    const cachedUrl = await redis.get(cachedKey);
    if (cachedUrl) throw redirect(302, cachedUrl);
    
    //Not in cache so get it from db
    const [row] = await sql`
        SELECT 
            long_url,
            EXTRACT(EPOCH FROM (expiry_time - NOW())) AS ttl 
        FROM urlmappings
        WHERE short_url = ${short}
    `
    ;

    if (!row) {
        throw error(404, "Short URL not found");
    }

    if (row.ttl > 0) {
        await redis.set(cachedKey, row.long_url, { EX: Math.floor(row.ttl) });
    }

    //throw redirect(302, row.long_url);
};