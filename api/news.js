export default async function handler(req, res) {
  const query = req.query.q || "India";
  const API_KEY = "042715f2ceb1c0ef3cd694d903477fbb";
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Set CORS headers so the frontend can read the response
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
