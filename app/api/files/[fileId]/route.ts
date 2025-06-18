import { openai } from "@/app/openai";

// download file by file ID
export async function GET(_request, { params: { fileId } }) {
  console.log('Downloading file with ID:', fileId);

  const [file, fileContent] = await Promise.all([
    openai.files.retrieve(fileId),
    openai.files.content(fileId),
  ]);

  console.log('File details:', {
    id: file.id,
    filename: file.filename,
    purpose: file.purpose,
    size: file.bytes
  });

  // Encode filename to handle Unicode characters properly
  const encodedFilename = encodeURIComponent(file.filename);
  const asciiFilename = file.filename.replace(/[^\x00-\x7F]/g, "_"); // Fallback for ASCII-only clients

  return new Response(fileContent.body, {
    headers: {
      "Content-Disposition": `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
      "Content-Type": "application/octet-stream",
    },
  });
}
