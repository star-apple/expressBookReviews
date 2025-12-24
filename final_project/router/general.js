const express = require("express");
const axios = require("axios");

const public_users = express.Router();

// Change this ONLY if your backend runs on a different host/port
const BASE_URL = "http://localhost:5000";

// Helper: standard error response
function handleAxiosError(res, err) {
  if (err.response) {
    // Backend replied with an error status
    return res.status(err.response.status).json(err.response.data);
  }
  // Network / server down / unknown
  return res.status(500).json({ message: "Server error", error: err.message });
}

/**
 * GET: Retrieve all books
 */
public_users.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return res.status(200).json(response.data);
  } catch (err) {
    return handleAxiosError(res, err);
  }
});

/**
 * GET: Retrieve a book by ISBN
 */
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const response = await axios.get(`${BASE_URL}/books/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (err) {
    // If the backend returns 404, pass it through
    return handleAxiosError(res, err);
  }
});

/**
 * GET: Retrieve books by author
 */
public_users.get("/author/:author", async (req, res) => {
  try {
    const { author } = req.params;
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    return res.status(200).json(response.data);
  } catch (err) {
    return handleAxiosError(res, err);
  }
});

/**
 * GET: Retrieve books by title
 */
public_users.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    return res.status(200).json(response.data);
  } catch (err) {
    return handleAxiosError(res, err);
  }
});

module.exports.general = public_users;
