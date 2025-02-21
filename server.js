/*const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// GET endpoint (returns operation code)
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint (processes JSON request)
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const numbers = data.filter(item => !isNaN(item)); 
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item)); 
    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/




const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    is_success: false,
    message: err.message || "Internal Server Error",
  });
};

// GET endpoint (returns operation code)
app.get("/bfhl", (req, res, next) => {
  try {
    res.status(200).json({ operation_code: 1 });
  } catch (error) {
    next(error);
  }
});

// POST endpoint (processes JSON request)
app.post("/bfhl", (req, res, next) => {
  try {
    if (!req.body || !req.body.data) {
      throw { status: 400, message: "Missing 'data' field in request body" };
    }

    const { data } = req.body;
    if (!Array.isArray(data)) {
      throw { status: 400, message: "Invalid input format. 'data' should be an array" };
    }

    // Extract numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));
    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    // Construct response
    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error); // Pass error to global handler
  }
});

// Middleware for handling 404 errors
app.use((req, res) => {
  res.status(404).json({ is_success: false, message: "Route not found" });
});

// Use global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
