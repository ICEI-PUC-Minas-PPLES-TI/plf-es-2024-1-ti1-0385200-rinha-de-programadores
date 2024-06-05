let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }
    const offset = -slideIndex * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

function autoSlide() {
    setInterval(nextSlide, 5000); // Muda de slide a cada 30 segundos
}

// Inicializa o carrossel
showSlide(slideIndex);
autoSlide();

function getIconForLanguage(language) {
    switch (language.toLowerCase()) {
        case 'python':
            return '<i class="fa-brands fa-python"></i>';
        case 'java':
            return '<i class="fa-brands fa-java"></i>';
        case 'c':
            return '<i class="fa-solid fa-c"></i>';
        // Adicione mais linguagens e ícones conforme necessário
        default:
            return ''; // Ícone padrão (ou vazio se não houver ícone específico)
    }
}
function getRandomCardByDifficulty(data, difficulty) {
    const filteredData = data.filter(item => item.dificuldade.toLowerCase() === difficulty.toLowerCase());
    if (filteredData.length === 0) {
        console.error(`Nenhum card encontrado para a dificuldade: ${difficulty}`);
        return null;
    }
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    return filteredData[randomIndex];
}



// Fetch para obter dados da API e criar cards
fetch('https://3204cb85-f4c9-4130-95a0-a178117080a2-00-1a4tc3cfi75j1.picard.replit.dev/contatos')
    .then(response => response.json())
    .then(data => {
        console.log('Dados recebidos da API:', data); // Adicionado para depuração
        const difficulties = ['fácil', 'médio', 'difícil'];
        const cardContainer = document.querySelector('.card-conteiner'); // Seleciona o contêiner de cards na sua página
        
        difficulties.forEach(difficulty => {
            const randomCard = getRandomCardByDifficulty(data, difficulty);
            if (randomCard) {
                console.log(`Card selecionado para dificuldade ${difficulty}:`, randomCard); // Adicionado para depuração
                const icon = getIconForLanguage(randomCard.linguagem); // Obtém o ícone para a linguagem
                let card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <div class="card-border-top"></div>
                    <div class="icones-card">
                        ${icon}
                        <span>${randomCard.titulo}</span>
                        <p>${randomCard.linguagem}</p>
                    </div>
                    <p class="job">${randomCard.dificuldade}</p>
                    <button>Buscar</button>
                `;
                cardContainer.appendChild(card);
            } else {
                console.error(`Nenhum card encontrado para a dificuldade ${difficulty}`);
            }
        });
    })
    .catch(error => console.error('Erro ao buscar dados dos cards:', error));