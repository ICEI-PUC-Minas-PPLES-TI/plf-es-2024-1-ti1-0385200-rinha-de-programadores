document.getElementById('file-input').addEventListener('change', function() {
    const fileInput = document.getElementById('file-input');
    const fileDropArea = document.querySelector('.file-drop-area');
    const fileMessage = document.querySelector('.file-message');

    if (fileInput.files.length > 0) {
        fileMessage.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
    } else {
        fileMessage.textContent = 'ou arraste e solte o arquivo aqui';
    }
});

document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;
            document.getElementById('file-content').textContent = fileContent;

            // Obtendo os dados do usuário e data/hora atual
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userId = users.length ? users[users.length - 1].id : 0;
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('pt-BR');
            const formattedTime = currentDate.toLocaleTimeString('pt-BR', { hour12: false });

            // Obtendo o ID do desafio
            const challenges = JSON.parse(localStorage.getItem("challenges")) || [];
            const challengeId = challenges.length + 1;

            // Criando um objeto com os dados do upload
            const uploadData = {
                userId: userId,
                date: formattedDate,
                time: formattedTime,
                fileName: file.name,
                challengeId: challengeId
            };

            // Salvando os dados no Local Storage
            challenges.push(uploadData);
            localStorage.setItem("challenges", JSON.stringify(challenges));

            alert("Upload realizado com sucesso!");
        };

        reader.readAsText(file);
    } else {
        alert('Por favor, selecione um arquivo para fazer o upload.');
    }
});

// Mecanismo de arrastar e soltar
const fileDropArea = document.querySelector('.file-drop-area');
const fileInput = document.querySelector('.file-input');

fileDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    fileDropArea.classList.add('dragover');
});

fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('dragover');
});

fileDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    fileDropArea.classList.remove('dragover');
    const files = event.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        fileMessage.textContent = `Arquivo selecionado: ${files[0].name}`;
    }
});
