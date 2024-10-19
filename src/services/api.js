// src/services/api.js

const API_URL = "https://gutendex.com/books";

// Fetch books with optional filters: genre, search, and page.
export const fetchBooks = async (genre = "", page = 1, search = "") => {
  const genreFilter = genre && genre !== "All" ? `&topic=${encodeURIComponent(genre)}` : "";
  const searchQuery = search ? `&search=${search}` : "";
  const response = await fetch(`${API_URL}?page=${page}${genreFilter}${searchQuery}`);
  const data = await response.json();
  return data;
};

// Load wishlist from localStorage
export const loadWishlist = () => JSON.parse(localStorage.getItem("wishlist")) || [];

// Update wishlist in localStorage
export const updateWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
