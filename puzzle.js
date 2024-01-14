// Datos de ejemplo para los artículos
const articlesData = [
    {
        title: "Cómo Motivar a tus Hijos en sus Estudios",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
    },
    {
        title: "Consejos para Crear un Ambiente de Estudio Apropiado",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
    },
    // Agrega más artículos según sea necesario
];

// Función para cargar los botones de artículo en la página
function loadArticleButtons() {
    const articleList = document.getElementById('article-list');

    articlesData.forEach((articleData, index) => {
        const button = document.createElement('button');
        button.classList.add('article-button');
        button.textContent = articleData.title;
        button.addEventListener('click', () => toggleArticle(index));

        articleList.appendChild(button);
    });
}

// Función para cargar los artículos en la página
function loadArticles() {
    const articleList = document.getElementById('article-list');

    articlesData.forEach((articleData, index) => {
        const contentDiv = document.createElement('div');
        contentDiv.id = `article-content-${index}`;
        contentDiv.classList.add('article-content', 'hidden');
        contentDiv.innerHTML = `<h2>${articleData.title}</h2><p>${articleData.content}</p>`;

        articleList.appendChild(contentDiv);
    });
}

// Función para alternar la visibilidad del contenido de un artículo
function toggleArticle(index) {
    const contentElement = document.getElementById(`article-content-${index}`);
    contentElement.classList.toggle('hidden');
}

// Función para cargar los artículos cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    loadArticleButtons();
    loadArticles();
});



