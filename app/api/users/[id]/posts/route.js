import Prompt from "@models/prompt";
import { dbconnect } from "@utils/dbconnect";

export const GET = async (request, { params }) => {
  try {
    await dbconnect();
    const { id } = await params;
    const prompts = await Prompt.find({ createdBy: id }).populate("createdBy");
    console.log("Fetched Prompts:", prompts);
    if (!prompts) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
