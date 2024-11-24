# Portal-Noticias ByteNinja

Portal de notícias com foco em temas diversos como tecnologia, saúde, esportes, política e cultura. O site oferece uma navegação simples e intuitiva, com conteúdo sempre atualizado, dividido por categorias, garantindo uma experiência acessível e fluída para todos os usuários.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **TailwindCSS** - Framework para estilização rápida e responsiva
- **Font Awesome** - Ícones vetoriais

## Como Usar

Este repositório contém o código-fonte do Portal-Noticias ByteNinja. Siga os passos abaixo para rodar o projeto em sua máquina local:

### Pré-requisitos

Antes de rodar o projeto, você precisará ter o **Node.js** e o **npm** instalados em sua máquina. Caso não tenha, siga os passos para instalação:

- [Baixar e instalar Node.js](https://nodejs.org/)

### 1. Clonar o Repositório

Primeiro, faça o clone do repositório para o seu computador utilizando o seguinte comando:

```bash
git clone https://github.com/MrHoneys/Portal-Noticias.git
````
````bash
2. Navegar para o Diretório do Projeto
Após clonar o repositório, entre no diretório do projeto:
````

```bash
cd Portal-Noticias
```

3. Instalar as Dependências
Execute o comando abaixo para instalar todas as dependências necessárias:

```bash
npm install
```

4. Rodar o Projeto
Após instalar as dependências, você pode rodar o projeto localmente com o seguinte comando:

```bash
npm start
```

Isso irá iniciar o servidor e você poderá acessar o portal de notícias no seu navegador em http://localhost:3000.

Estrutura de Diretórios
Aqui está uma visão geral da estrutura de diretórios do projeto:

```bash
Portal-Noticias/
│
├── index.html           # Página principal do portal
├── source/              # Imagens e outros arquivos estáticos
│   ├── logo/            # Imagem do logo
│   └── equipe/          # Imagem da equipe
├── css/                 # Arquivos de estilo
│   └── styles.css       # Arquivo de estilo do index
├── js/                  # Scripts JavaScript
│   ├── app.js           # Arquivo principal de JS
│   └── postagem.js      # Script para gerenciamento de postagens
├── config/              # Configurações do projeto
│   └── pages/           # Arquivos de configuração das páginas
│       └── noticias.json # Arquivo JSON com as notícias
├── pages/               # Páginas do portal
│   ├── sobre/           # Página "Sobre"
│   ├── contato/         # Página "Contato"
│   └── post/            # Página de postagens
│       └── post1/       # Postagem 1
└── README.md            # Este arquivo

```

Personalização
TailwindCSS foi utilizado para facilitar a customização. Você pode modificar a estrutura de estilos diretamente no arquivo `tailwind.css`.
O código HTML e JavaScript é facilmente extensível, permitindo adicionar mais categorias de notícias, novos layouts ou interações.

Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para mais detalhes.

Desenvolvido com ❤️ por MrHoneys

---

O que inclui neste arquivo:

- **Descrição**: Um resumo geral sobre o propósito e funcionalidades do projeto.
- **Tecnologias Utilizadas**: Listagem das tecnologias usadas no projeto (HTML, CSS, JS, TailwindCSS, Font Awesome).
- **Como Usar**: Instruções para clonar o repositório, instalar dependências e rodar o projeto localmente.
- **Estrutura de Diretórios**: Explicação sobre a estrutura de arquivos do projeto.
- **Contribuição**: Instruções sobre como contribuir para o repositório.
- **Licença**: Informação sobre a licença do projeto (você pode ajustar conforme necessário, caso utilize uma licença diferente).

Você pode copiar e colar este conteúdo diretamente no arquivo `README.md` do seu repositório no GitHub.

