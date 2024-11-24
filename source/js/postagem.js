// Função para carregar as últimas postagens aleatórias
async function carregarUltimasPostagens() {
    try {
        const response = await fetch('../../../config/pages/noticias.json'); // Caminho do seu arquivo JSON
        const noticias = await response.json(); // Carrega todas as notícias

        // Seleciona aleatoriamente até 3 postagens
        const ultimasPostagens = [];
        while (ultimasPostagens.length < 3 && noticias.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * noticias.length);
            ultimasPostagens.push(noticias.splice(indiceAleatorio, 1)[0]);
        }

        // Atualiza o DOM com as últimas postagens
        const postsContainer = document.getElementById('recent-posts');
        ultimasPostagens.forEach(post => {
            const postElement = document.createElement('li');
            postElement.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'transition', 'transform', 'hover:scale-105');
            postElement.innerHTML = `
                    <a href="${post.link}" class="text-xl font-bold text-blue-600 hover:underline">${post.title}</a>
                    <p class="text-gray-600 mt-2">${post.description}</p>
                `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Erro ao carregar as últimas postagens:", error);
    }
}

// Carregar as últimas postagens ao carregar a página
document.addEventListener("DOMContentLoaded", carregarUltimasPostagens);

// Função de pesquisa
async function atualizarSugestoes() {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    const sugestoesContainer = document.getElementById("search-suggestions");

    try {
        const response = await fetch('../../../config/pages/noticias.json');
        const noticias = await response.json();

        const sugestoes = noticias.filter(noticia =>
            noticia.title.toLowerCase().includes(searchInput) ||
            noticia.description.toLowerCase().includes(searchInput)
        );

        sugestoesContainer.innerHTML = ''; // Limpa as sugestões anteriores

        if (searchInput && sugestoes.length > 0) {
            sugestoes.forEach(noticia => {
                const sugestaoItem = document.createElement("div");
                sugestaoItem.classList.add("p-2", "hover:bg-gray-200", "cursor-pointer");
                sugestaoItem.textContent = noticia.title;

                // Ao clicar na sugestão, exibe diretamente o resultado
                sugestaoItem.addEventListener("click", () => {
                    window.location.href = noticia.link;
                });

                sugestoesContainer.appendChild(sugestaoItem);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar sugestões:", error);
    }
}

// Adiciona o evento de busca ao campo de pesquisa
document.getElementById("search-input").addEventListener("input", atualizarSugestoes);