const API_URL = "https://gutendex.com/books";

export const fetchBooks = async (query = "") => {
  const response = await fetch(`${API_URL}?search=${query}`);
  const data = await response.json();
  return data.results;
};
