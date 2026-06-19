const API_KEY = "042715f2ceb1c0ef3cd694d903477fbb";
const url = "https://gnews.io/api/v4/search?q=";

// Load default news when the page opens
window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

// Fetch news data from GNews
async function fetchNews(query) {
  try {
    const res = await fetch(
      `${url}${encodeURIComponent(query)}&apikey=${API_KEY}`,
    );

    const data = await res.json();
    console.log(data);

    if (data.errors || !data.articles) {
      console.error("API Error:", data.errors);
      alert("Uh oh! The News API has reached its daily limit or returned an error. Please try again later.");
      return;
    }

    bindData(data.articles);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    console.log(article);

    if (!article.image) {
      console.log("No image:", article.title);
      return;
    }

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// Search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", searchNews);

searchText.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchNews();
  }
});

function searchNews() {
  const query = searchText.value.trim();

  if (!query) return;

  fetchNews(query);

  if (curSelectedNav) {
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;
  }
}

// Stores currently selected nav item
let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);

  if (curSelectedNav) {
    curSelectedNav.classList.remove("active");
  }

  const navItem = document.getElementById(id);

  if (navItem) {
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
  }
}
