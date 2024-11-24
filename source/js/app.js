// Variáveis globais
let todasNoticias = []; // Para armazenar todas as notícias
let noticiasFiltradas = []; // Para armazenar o resultado da pesquisa

// Função para carregar as notícias do arquivo JSON
async function carregarNoticias() {
    try {
        const response = await fetch('config/pages/noticias.json'); // Caminho do seu arquivo JSON
        todasNoticias = await response.json(); // Armazena todas as notícias na variável global

        noticiasFiltradas = todasNoticias; // Inicializa com todas as notícias
        configurarPaginacao(noticiasFiltradas); // Configura a paginação
        exibirNoticiasEmDestaque(todasNoticias); // Exibe as notícias em destaque
        
        // Exibe os tópicos mais populares
        exibirTopicosEmAlta(todasNoticias); // Chama a função para exibir os tópicos mais populares

    } catch (error) {
        console.error("Erro ao carregar as notícias:", error);
    }
}


// Função para exibir as notícias em destaque
function exibirNoticiasEmDestaque(noticias) {
    const destaqueContainer = document.querySelector(".mb-6 ul"); // Seleciona a lista dentro da seção de Destaque
    destaqueContainer.innerHTML = ''; // Limpa o conteúdo anterior

    // Seleciona as primeiras 3 notícias para exibir como destaque (ou pode escolher aleatoriamente)
    const noticiasEmDestaque = noticias.slice(0, 3);

    noticiasEmDestaque.forEach(noticia => {
        const noticiaItem = document.createElement("li");

        const link = document.createElement("a");
        link.href = noticia.link;  // Define o link
        link.classList.add("text-blue-600", "hover:underline");
        link.textContent = noticia.title;  // Define o título da notícia

        noticiaItem.appendChild(link);
        destaqueContainer.appendChild(noticiaItem); // Adiciona o item à lista
    });
}

// Função para exibir os tópicos em alta
function exibirTopicosEmAlta(noticias) {
    const topicosContainer = document.querySelector(".space-y-2"); // Seleciona a lista dentro da seção de Tópicos em Alta
    topicosContainer.innerHTML = ''; // Limpa o conteúdo anterior

    // Contabiliza a quantidade de vezes que cada tópico é mencionado nas notícias
    const topicosContagem = {};

    noticias.forEach(noticia => {
        if (noticia.topics && Array.isArray(noticia.topics)) {
            noticia.topics.forEach(topico => {
                topicosContagem[topico] = (topicosContagem[topico] || 0) + 1;
            });
        }
    });

    // Ordena os tópicos por popularidade (quantidade de menções)
    const topicosOrdenados = Object.entries(topicosContagem)
        .sort((a, b) => b[1] - a[1])  // Ordena de forma decrescente pela quantidade
        .slice(0, 5); // Pega os 5 tópicos mais populares

    // Exibe os tópicos mais populares
    topicosOrdenados.forEach(([topico, quantidade]) => {
        const topicoItem = document.createElement("li");

        const link = document.createElement("a");
        link.href = "#";  // Adapte para um link real, se necessário
        link.classList.add("text-blue-600", "hover:underline");
        link.textContent = `${topico} (${quantidade})`;  // Exibe o nome do tópico com a contagem

        topicoItem.appendChild(link);
        topicosContainer.appendChild(topicoItem); // Adiciona o item à lista
    });
}

// Função para contar a frequência de tópicos
function contarTopicos(noticias) {
    const topicosContagem = {};

    noticias.forEach(noticia => {
        noticia.topics.forEach(topico => {
            if (topicosContagem[topico]) {
                topicosContagem[topico] += 1;
            } else {
                topicosContagem[topico] = 1;
            }
        });
    });

    return topicosContagem;
}



// Função para exibir notícias no container principal
function configurarPaginacao(noticias) {
    const itemsPerPage = 6; // Quantidade de notícias por página
    let currentPage = 1; // Página atual
    const totalItems = noticias.length; // Total de notícias
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Total de páginas

    const container = document.getElementById("news-container");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    function displayNews(page) {
        container.innerHTML = ''; // Limpa o container antes de exibir as notícias
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

        for (let i = startIndex; i < endIndex; i++) {
            const noticia = noticias[i];

            const noticiaDiv = document.createElement("div");
            noticiaDiv.classList.add("bg-white", "rounded", "shadow-lg", "p-4", "transition", "transform", "hover:scale-105");

            const imagem = document.createElement("img");
            imagem.src = noticia.image;
            imagem.alt = noticia.title;
            imagem.classList.add("w-full", "h-48", "object-cover", "rounded", "mb-4", "transition", "duration-300", "ease-in-out", "hover:opacity-80");
            noticiaDiv.appendChild(imagem);

            const titulo = document.createElement("h4");
            titulo.classList.add("text-xl", "font-bold", "mb-2");
            titulo.textContent = noticia.title;
            noticiaDiv.appendChild(titulo);

            const descricao = document.createElement("p");
            descricao.classList.add("text-gray-700", "mb-4");
            descricao.textContent = noticia.description;
            noticiaDiv.appendChild(descricao);

            const link = document.createElement("a");
            link.href = noticia.link;
            link.classList.add("text-blue-600", "hover:underline");
            link.textContent = "Leia mais";
            noticiaDiv.appendChild(link);

            container.appendChild(noticiaDiv);
        }

        prevButton.disabled = page === 1;
        nextButton.disabled = page === totalPages;
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayNews(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayNews(currentPage);
        }
    });

    displayNews(currentPage); // Exibe a primeira página
}

// Função para realizar pesquisa dinâmica e sugerir resultados
function atualizarSugestoes() {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    const sugestoesContainer = document.getElementById("search-suggestions");

    // Filtrar as notícias com base no texto digitado
    const sugestoes = todasNoticias.filter(noticia =>
        noticia.title.toLowerCase().includes(searchInput) ||
        noticia.description.toLowerCase().includes(searchInput)
    );

    // Atualiza o container de sugestões
    sugestoesContainer.innerHTML = ''; // Limpa as sugestões anteriores

    if (searchInput && sugestoes.length > 0) {
        sugestoes.forEach(noticia => {
            const sugestaoItem = document.createElement("div");
            sugestaoItem.classList.add("p-2", "hover:bg-gray-200", "cursor-pointer");
            sugestaoItem.textContent = noticia.title;

            // Ao clicar na sugestão, exibe diretamente o resultado
            sugestaoItem.addEventListener("click", () => {
                noticiasFiltradas = [noticia]; // Mostra apenas a notícia selecionada
                configurarPaginacao(noticiasFiltradas); // Atualiza a página principal
                sugestoesContainer.innerHTML = ''; // Limpa as sugestões
            });

            sugestoesContainer.appendChild(sugestaoItem);
        });
    }
}

// Event listeners
document.getElementById("search-input").addEventListener("input", atualizarSugestoes); // Atualiza sugestões ao digitar
document.getElementById("search-button").addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    noticiasFiltradas = todasNoticias.filter(noticia =>
        noticia.title.toLowerCase().includes(searchInput) ||
        noticia.description.toLowerCase().includes(searchInput)
    );
    configurarPaginacao(noticiasFiltradas);
});

// Função de rolagem suave personalizada
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top; // Posição do elemento
    const startPosition = window.scrollY; // Posição inicial da janela
    const distance = targetPosition; // Distância a percorrer
    let startTime = null;
  
    // Função de animação
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    // Função de suavização (ease-in-out)
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
  
  // Adiciona o evento de clique nos links com âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Previne o comportamento padrão do link
  
      const targetId = this.getAttribute('href').slice(1); // Pega o ID do destino
      const target = document.getElementById(targetId); // Busca o elemento de destino
  
      if (target) {
        smoothScroll(target, 2000); // Duração de 2000ms (2 segundos)
      }
    });
  });

  
// Chama a função para carregar as notícias ao carregar a página
document.addEventListener("DOMContentLoaded", carregarNoticias);