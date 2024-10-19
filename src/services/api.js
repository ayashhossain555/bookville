const API_URL = "https://gutendex.com/books";

export const fetchBooks = async (genre = "", page = 1, search = "") => {
  const genreFilter = genre && genre !== "All" ? `&topic=${encodeURIComponent(genre)}` : "";
  const searchQuery = search ? `&search=${search}` : "";
  const response = await fetch(`${API_URL}?page=${page}${genreFilter}${searchQuery}`);
  const data = await response.json();
  return data;
};

export const loadWishlist = () => JSON.parse(localStorage.getItem("wishlist")) || [];

export const updateWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
