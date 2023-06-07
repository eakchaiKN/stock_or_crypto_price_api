
# Stock or Crypto Price API

This API allows you to fetch the current price of stocks using their ticker symbols. It supports caching using Redis to improve performance by avoiding repeated requests for the same data.

## Prerequisites

-   Node.js installed on your machine.
-   Redis installed and running, or access to a Redis service.

## Installation

1.  Clone the repository:
    
    bashCopy code
    
    `git clone <repository-url>` 
    
2.  Navigate to the project directory:
    
    bashCopy code
    
    `cd stock_or_crypto_price_api` 
    
3.  Install the dependencies:
    
    bashCopy code
    
    `npm install` 
    

## Running the API

1.  Start the server:
    
    bashCopy code
    
    `npm run dev` 
    
2.  The API will be running at `http://localhost:4000`.
    

## API Usage

To fetch the price of a stock, make a GET request to the following endpoint:

bashCopy code

`http://localhost:4000/stock-price?ticker=TSLA` 

Replace `ticker` with the actual stock symbol ticker you want to fetch the price for.

### Example

To fetch the price of a stock with the ticker symbol `TSLA`, send a GET request to the following URL:

bashCopy code

`http://localhost:4000/stock-price?ticker=TSLA` 

The API will respond with a JSON object containing the ticker and price of the asset:

jsonCopy code

`{"data":{"name":"Tesla, Inc.","symbol":"TSLA","price":226.543}}` 

Please note that the price will be cached in Redis for 60 seconds to avoid fetching the same data repeatedly. After the cache expires, the API will make a new request to fetch the updated price.

## Redis Configuration

If you're running Redis locally, make sure it is running on the default host (`localhost`) and port (`6379`). If not, update the Redis configuration in the `index.js` file to match your setup.

If you're using a cloud-based Redis service, update the Redis configuration in the `index.js` file with the appropriate host, port, and authentication details.


## License
`ekachai.kn@gmail.com`
