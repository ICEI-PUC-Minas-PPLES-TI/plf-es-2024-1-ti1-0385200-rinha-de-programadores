document.addEventListener('DOMContentLoaded', function() {
    const userCode = localStorage.getItem('userFileContent');
    if (userCode) {
        document.getElementById('user-code').value = userCode;
    }
});

document.getElementById('correct-code-btn').addEventListener('click', async function() {
    const userCode = document.getElementById('user-code').value;

    try {
        const correctedCode = await getCorrectedCode(userCode);
        document.getElementById('corrected-code').textContent = correctedCode;
    } catch (error) {
        document.getElementById('corrected-code').textContent = 'Erro ao corrigir o código: ' + error.message;
    }
});

async function getCorrectedCode(userCode) {
    const apiKey = 'sk-proj-9R6kutDI5PoFHXKaHko5T3BlbkFJwhAW3qZkmdK8vSdtZIOq';
    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4", // ou gpt-3.5-turbo
            messages: [
                { role: "system", content: "Você é um assistente que corrige código." },
                { role: "user", content: `Aqui está o código do usuário:\n\n${userCode}\n\nCorrija o código e dê uma nota de 0 a 10 ao código do usuário:` }
            ],
            max_tokens: 1500,
            temperature: 0.5
        })
    });

    if (!response.ok) {
        throw new Error('Erro na solicitação à API: ' + response.statusText);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
