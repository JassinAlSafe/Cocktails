import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";

import { test, expect } from "vitest";
import App from "./App"; // Assuming App is your component

// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";
// Set up the MSW server with the handlers
export const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen());

// Reset any request handlers between tests (good practice in case a test overrides them)
afterEach(() => server.resetHandlers());

// Close the server after all tests are finished
afterAll(() => server.close());

test("renders the list of posts from the API", async () => {
  render(<App />);

  // Wait for the API call to complete and check if mock data is displayed
  const drink1 = await screen.findByText("Afterglow");
  //const post2 = await screen.findByText('Post 2');

  // Verify the mock data is rendered
  expect(drink1).toBeInTheDocument();
  // expect(post2).toBeInTheDocument();
});

test("adds a new drink via the search bar", async () => {
  render(<App />);

  //Simulate user typing in the search bar
  const input = screen.getByPlaceholderText("Add new drink");
  fireEvent.change(input, { target: { value: "Afterglow" } });

  // Simulate clicking the Add Drink button
  const addButton = screen.getByText("Add Drink");
  fireEvent.click(addButton);

  // Wait for the API call to complete and check if the new drink is displayed
  const newDrink = await screen.findByText("Afterglow");
  expect(newDrink).toBeInTheDocument();
});

//Test for filtering drinks
test("toggles a drink as completed", async () => {
  render(<App />);

  // Wait for a drink to load
  const drink = await screen.findByText("Apello");

  // Toggle the completed state
  fireEvent.click(drink); // Assuming the drink name toggles its completion

  // Check if the style has changed to line-through (indicating completion)
  expect(drink).toHaveStyle({ textDecoration: "line-through" });

  // Toggle it back
  fireEvent.click(drink);

  // Check that the style is back to none (indicating it's not completed)
  expect(drink).toHaveStyle({ textDecoration: "none" });
});

test("deletes a drink", async () => {
  render(<App />);

  // Wait for a drink to load
  const drink = await screen.findByText("Apello");

  // Simulate clicking the delete button
  const clearButton = screen.getByText("Clear All");
  fireEvent.click(clearButton);

  // Check that the drink is no longer in the list
  expect(drink).not.toBeInTheDocument();
});