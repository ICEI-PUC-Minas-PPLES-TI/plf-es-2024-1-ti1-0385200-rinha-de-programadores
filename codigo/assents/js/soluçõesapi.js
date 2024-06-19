const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
    if (inputQuestion.value && e.key === "Enter") {
        SendQuestion();
    }
});

const OPENAI_API_KEY = " ";  // Colocar a chave da api entre as aspas

async function SendQuestion() {
    const SQuestion = inputQuestion.value;

    try {
        const response = await fetch(" ", {   //https://api.openai.com/v1/chat/completions colocar entre aspas
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: SQuestion }
                ],
                max_tokens: 2048,
                temperature: 0.5
            })
        });

        const data = await response.json();

        if (result.value) result.value += "\n";

        if (data.error?.message) {
            result.value += `Error: ${data.error.message}`;
        } else if (data.choices?.[0].message.content) {
            const text = data.choices[0].message.content.trim() || "Sem resposta";
            result.value += `Chat GPT: ${text}`;
        }

        result.scrollTop = result.scrollHeight;
    } catch (error) {
        console.error("Error: ", error);
        result.value += `\nError: ${error.message}`;
    } finally {
        inputQuestion.value = "";
        inputQuestion.disabled = false;
        inputQuestion.focus();
    }

    if (result.value) result.value += "\n\n\n";
    result.value += `Eu: ${SQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;
    result.scrollTop = result.scrollHeight;
}
