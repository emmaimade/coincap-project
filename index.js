// import express and axios
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// public folder for static files
app.use(express.static("public"));

// all coins endpoint
app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        res.render("index.ejs", { data: response.data });
    } catch (error) {
        console.log(error.response.data);
        res.render("index.ejs", { data: error.response.data });
    }
});

// trending coin endpoint
app.get("/trending/", async (req, res) => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/search/trending");
        res.render("trending.ejs", { data: response.data.coins });
    } catch (error) {
        console.log(error.response.data);
        res.render("trending.ejs", { data: error.response.data });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}..`);
})