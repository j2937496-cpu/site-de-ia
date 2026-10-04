const OpenAI = require("openai");

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({
                    error: "Método não permitido."
                })
            };
        }

        const { message } = JSON.parse(event.body);

        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Mensagem vazia."
                })
            };
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

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                response: response.output_text
            })
        };

    } catch (error) {
        console.error("Erro:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Não foi possível conversar com a IA."
            })
        };
    }
};