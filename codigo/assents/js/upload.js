// script.js
document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;
            document.getElementById('file-content').textContent = fileContent;
        };

        reader.readAsText(file);
    } else {
        alert('Por favor, selecione um arquivo para fazer o upload.');
    }
});
