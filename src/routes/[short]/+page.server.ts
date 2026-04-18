
import { getPasteByShort } from "$lib/server/paste.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { S3_BUCKET } from '$env/static/private';
import { s3 } from "$lib/server/s3.js";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    
    const pasteId = await getPasteByShort(params.short)

    const command = new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: `pastes/${pasteId}.txt`
    })
    try{
        const response = await s3.send(command)
         if (!response.Body) {
            throw error(404, 'Paste not found');
        }
        const str = await response.Body?.transformToString()

        return {str};
    } catch (err){
        console.error(err)
        return {str:null}
    }
};