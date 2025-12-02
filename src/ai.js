import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe
they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe.
The recipe can include addtional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page. Also avoid using symbols like # and |.
Try using bullet points for lists and make sure that the 'Ingredients' and 'Instructions' headings in bold text`

// const hf = new HfInference(import.meta.env.VITE_API_KEY)
const token = import.meta.env.VITE_API_KEY
const endpoint = "https://models.github.ai/inference";
const model = "xai/grok-3-mini";

export async function getRecipeFromAi(ingredientsArr) {
    const client = ModelClient(endpoint, new AzureKeyCredential(token));
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await client.path("/chat/completions").post({
            // model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            body:{
                model: model,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
                ],
                temperature: 1.0,
                top_p: 1.0,
                // max_tokens: 1024,
            }
        })
         if (isUnexpected(response)) {
            throw response.body.error;
        }
        return response.body.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}