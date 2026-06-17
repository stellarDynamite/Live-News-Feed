const API_KEY = NEWS_API_KEY;
const url = "https://newsapi.org/v2/everything?q=";

// Load default news when the page opens
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// Fetch news data from NewsAPI
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    // Remove old cards before displaying new results
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {

        // Skip articles without images
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);

        cardsContainer.appendChild(cardClone);
    });
}

// added custom search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

// Search based on user input
searchButton.addEventListener("click", () => {

    const query = searchText.value;

    if (!query) return;

    fetchNews(query);

    // Clear active category after manual search
    if (curSelectedNav) {
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;
    }
});

