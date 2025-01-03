import { dbconnect } from "@utils/dbconnect";
import Prompt from "@models/prompt";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await dbconnect();
    const newPrompt = new Prompt({
      createdBy: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    return new Response("Failed to create a new prompt", { status: 500 }, e);
  }
};
