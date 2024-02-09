const express = require("express");
const axios = require("axios");
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Middleware function
const customMiddleware = (req, res, next) => {
  console.log("Middleware is executed!");
  // You can modify the request or response objects here if needed
  next(); // Move to the next middleware or route handler
};

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const baseUrl = "https://203.192.231.218:8443";

// Use middleware for all routes
app.use(customMiddleware);

// Define a route
app.get("/", async (req, res) => {
  try {
    const { url } = req.body;

    console.log("Input to get", url);
    const response = await axios.get(url, {
      httpsAgent: agent,
    });
    console.log("response:", response.data);

    return res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

// Define a route
app.post("/", async (req, res) => {
  try {
    const { url, params } = req.body;
    console.log("Input to post", url, JSON.stringify(params));
    const response = await axios.post(url, params, {
      httpsAgent: agent,
    });
    console.log("response:", response.data);
    return res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
