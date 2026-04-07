import { json, type RequestHandler } from '@sveltejs/kit';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_BUCKET } from '$env/static/private';
import { s3 } from '$lib/server/s3';


export const POST:RequestHandler = async ({ request }) => {
  const pasteId = crypto.randomUUID(); // or your short ID logic

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: `pastes/${pasteId}.txt`,
    ContentType: 'text/plain'
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60
  });

  return json({
    pasteId,
    uploadUrl
  });
}