const API_KEY = "e957f0b8ffe441d09117609040d8be71";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("india"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.querySelector('.cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    // Clear existing cards
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;

        const cardClone = document.importNode(newsCardTemplate.content, true);
        fillDataCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name}.${date}`;

    cardClone.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);

    const navItem = document.querySelector(`#${id}`);
    
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.querySelector('.news-input'); // Corrected the class name

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
});
