// Função para listar os favoritos na página dos Favoritos
function ListaFavoritos() {
    let favoritosContatos = document.getElementById("favoritos-contatos");
    favoritosContatos.innerHTML = "";
  
    // Obtem os favoritos armazenados no localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
    // Popula os cards dos favoritos
    favoritos.forEach(contato => {
      let card = document.createElement('div');
      card.className = 'col-sm-4 mb-4';
      card.innerHTML = `
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">${contato.titulo}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${contato.linguagem}</h6>
              <p class="card-text">${contato.comando}</p>
              <p class="card-text"><strong>Dificuldade:</strong> ${contato.dificuldade}</p>
              <p class="card-text"><strong>Exemplo:</strong> ${contato.exemplo}</p>
              <a href="../pages/desafios.html">
                  <button class="btn btn-danger mt-2"> Buscar </button>
              </a>
          </div>
      </div>
  `;
  
      favoritosContatos.appendChild(card);
    });
  }

  function redirectToPage() {
    window.location.href = '../pages/desafios.html';
}
  
  // Chamada inicial para listar os favoritos ao carregar a página
  ListaFavoritos();