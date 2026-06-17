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

// *below part : dipanjan*

// Fill a cloned card with article data
function fillDataInCard(cardClone, article) {

    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // Convert API date into readable format
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // Open article in a new browser tab
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
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

