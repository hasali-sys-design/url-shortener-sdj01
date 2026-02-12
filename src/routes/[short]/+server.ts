import sql from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';


export const GET = async ({ params }) => {
   
	const [row] = await sql`
    SELECT long_url
    FROM urlmappings
    WHERE short_url = ${params.short}`

    throw redirect(302, row.long_url)
};