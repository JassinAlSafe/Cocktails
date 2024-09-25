// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import drinks from "./drinks.json";

// Initialize a mock database to store all posts in memory
const allPosts = new Map();

// Define request handlers using the `http` namespace
export const handlers = [
  // GET /posts to return all posts
  http.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php", () => {
    return HttpResponse.json(drinks);
  }),
];
