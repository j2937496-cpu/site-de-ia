import OpenAI from "openai";

const jsonResponse = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json"
        }
    });

export default async (req) => {
    try {
        if (req.method !== "POST") {
            return jsonResponse({ error: "Método não permitido." }, 405);
        }

        const { message } = await req.json().catch(() => ({}));

        if (!message) {
            return jsonResponse({ error: "Mensagem vazia." }, 400);
        }

        if (!process.env.OPENAI_API_KEY) {
            console.error("OPENAI_API_KEY não está configurada.");

            return jsonResponse(
                { error: "A IA não está configurada no servidor." },
                500
            );
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const response = await openai.responses.create({
            model: "gpt-5-mini",
            instructions:
                "Você é o assistente de IA do site Universo Artificial. " +
                "Responda sempre em português do Brasil, de forma clara, " +
                "educativa, amigável e fácil de entender.",
            input: message
        });

        return jsonResponse({ response: response.output_text });

    } catch (error) {
        console.error("Erro:", error);

        return jsonResponse(
            { error: "Não foi possível conversar com a IA." },
            500
        );
    }
};
