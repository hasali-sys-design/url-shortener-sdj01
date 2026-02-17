import sql from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';


export const GET = async ({ params }) => {
   
	const [row] = await sql`
    SELECT long_url
    FROM urlmappings
    WHERE short_url = ${params.short}`

    if (!row) {
        throw error(404, 'Short URL not found');
    }
    throw redirect(302, row.long_url)
};