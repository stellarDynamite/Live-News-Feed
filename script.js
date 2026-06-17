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
