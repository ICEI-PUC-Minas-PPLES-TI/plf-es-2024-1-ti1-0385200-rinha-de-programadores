document.getElementById('file-input').addEventListener('change', function() {
    const fileInput = document.getElementById('file-input');
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

            // Salvando o conteúdo do arquivo no Local Storage
            localStorage.setItem('userFileContent', fileContent);

            // Verificando se o conteúdo foi salvo corretamente
            console.log('Conteúdo do arquivo salvo no Local Storage:', localStorage.getItem('userFileContent'));

            // Redirecionando para a página de comparação
            window.location.href = '/codigo/pages/comparacao.html';
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
        document.querySelector('.file-message').textContent = `Arquivo selecionado: ${files[0].name}`;
    }
});
