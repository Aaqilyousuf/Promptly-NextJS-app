import Prompt from "@models/prompt";
import { dbconnect } from "@utils/dbconnect";

export const GET = async (request, { params }) => {
  try {
    await dbconnect();
    const { id } = await params;
    const prompts = await Prompt.findById(id).populate("createdBy");
    console.log("Fetched Prompts:", prompts);
    if (!prompts) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await dbconnect();
    const { id } = await params;
    if (id) console.log(id);
    else console.log("no id");
    const existingPrompt = await Prompt.findById(id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    // console.log(existingPrompt);
    // console.log(existingPrompt.prompt, existingPrompt.tag);
    // console.log("new Prompt: ", prompt, "new tag: ", tag);
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    console.log("This error is executed now so look here", e.message);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await dbconnect();
    const { id } = await params;
    await Prompt.findByIdAndDelete(id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (e) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
