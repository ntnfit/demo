import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const formData = await request.formData();
  const content = formData.get('content') as string;
  const files = formData.getAll('files') as File[];

  console.log('Received message:', content);
  console.log('Received files:', files.length);

  let fileIds: string[] = [];

  // Upload files if any
  if (files && files.length > 0) {
    console.log(`Uploading ${files.length} files...`);

    for (const file of files) {
      try {
        console.log(`Uploading file: ${file.name}, size: ${file.size}`);

        const uploadedFile = await openai.files.create({
          file: file,
          purpose: "assistants",
        });

        fileIds.push(uploadedFile.id);
        console.log(`File uploaded successfully: ${file.name}, ID: ${uploadedFile.id}`);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
      }
    }

    // Wait a bit to ensure files are processed
    if (fileIds.length > 0) {
      console.log(`Waiting for ${fileIds.length} files to be processed`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Create message with or without attachments
  const messageData: any = {
    role: "user",
    content: content,
  };

  if (fileIds.length > 0) {
    messageData.attachments = fileIds.map(fileId => ({
      file_id: fileId,
      tools: [{ type: "code_interpreter" }, { type: "file_search" }]
    }));
    console.log(`Adding message with attachments: ${fileIds}`);
  } else {
    console.log("Adding message without files");
  }

  await openai.beta.threads.messages.create(threadId, messageData);

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  return new Response(stream.toReadableStream());
}
