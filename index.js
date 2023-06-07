const express = require('express')
const yfinance = require('yahoo-finance')
const redis = require('redis')

const app = express();
const port = 4000;
let redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect()
    await redisClient.flushAll()
})();
// Middleware to check cache before fetching stock price
const checkCache = async (req, res, next) => {
    try {
        const ticker = req.query.ticker;
        const cacheResults = await redisClient.get(ticker);
        if (cacheResults) {
            const data = JSON.parse(cacheResults);
            res.status(200).json({ data });
        } else {
            next()
        }
    } catch (error) {
        next()
    }
};

// Endpoint for retrieving stock price
app.get('/stock-price', checkCache, async (req, res) => {
    try {
        const { ticker } = req.query
        let where = {}
        if (!!ticker) {
            where.symbol = ticker
        }
        const stockData = await yfinance.quote(where)
        const data = {
            name: stockData.price.longName,
            symbol: stockData.price.symbol,
            price: stockData.price.regularMarketPrice
        };

        // Store the price in cache
        redisClient.set(ticker, JSON.stringify(data), { EX: 60 });

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch stock data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
