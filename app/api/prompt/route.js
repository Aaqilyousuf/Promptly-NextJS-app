import Prompt from "@models/prompt";
import { dbconnect } from "@utils/dbconnect";

export const GET = async (request) => {
  try {
    await dbconnect();

    const prompts = await Prompt.find({}).populate("createdBy");
    console.log("Fetched Prompts:", prompts);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/prompt:", error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
