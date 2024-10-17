import { useState, useEffect, useCallback } from "react";
import BookCard from "../components/BookCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { FaSearch, FaHeart, FaSpinner } from "react-icons/fa"; // Added icons
import { AnimatePresence, motion } from "framer-motion"; // Animations

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem("selectedGenre") || "All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const booksPerPage = 32;

  const fetchBooks = async (genre = "", page = 1, search = "") => {
    const genreFilter = genre && genre !== "All" ? `&topic=${encodeURIComponent(genre)}` : "";
    const searchQuery = search ? `&search=${search}` : "";
    const response = await fetch(
      `https://gutendex.com/books?page=${page}${genreFilter}${searchQuery}`
    );
    return await response.json();
  };

  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchBooks(selectedGenre, page, search);
      setBooks(data.results);
      setTotalPages(Math.ceil(data.count / booksPerPage));

      if (genres.length === 1) {
        const extractedGenres = new Set();
        data.results.forEach((book) =>
          book.subjects.forEach((subject) => extractedGenres.add(subject))
        );
        setGenres(["All", ...Array.from(extractedGenres)]);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedGenre]);

  useEffect(() => {
    loadBooks();
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, [loadBooks]);

  const toggleWishlist = (book) => {
    const isInWishlist = wishlist.some((b) => b.id === book.id);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((b) => b.id !== book.id)
      : [...wishlist, book];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
    localStorage.setItem("selectedGenre", value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    localStorage.setItem("search", value);
    setPage(1);
  };

  const getPageNumbers = () => {
    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(startPage + 2, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search books..."
            className="border p-2 pl-10 w-full"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="border p-2"
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {books.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard
                  book={book}
                  toggleWishlist={toggleWishlist}
                  inWishlist={wishlist.some((b) => b.id === book.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="flex justify-center mt-4 space-x-2 items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-2 bg-gray-300 rounded"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-2 rounded ${
              p === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-2 bg-gray-300 rounded"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
