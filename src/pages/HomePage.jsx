import { useState, useEffect, useCallback } from "react";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { FaSearch } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { fetchBooks, loadWishlist, updateWishlist } from "../services/api";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [wishlist, setWishlist] = useState(loadWishlist());
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem("selectedGenre") || "All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const booksPerPage = 32;

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
  }, [loadBooks]);

  const toggleWishlist = (book) => {
    const updatedWishlist = wishlist.some((b) => b.id === book.id)
      ? wishlist.filter((b) => b.id !== book.id)
      : [...wishlist, book];

    setWishlist(updatedWishlist);
    updateWishlist(updatedWishlist);
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
    <div className="mt-20 px-4">
      <div className="w-full flex flex-col gap-4 justify-center items-center pt-20 pb-14 my-10 lg:my-20 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-600 font-bold uppercase tracking-wide">
          Find your favorite books at <br /> <span className="text-blue-500 text-2xl md:text-4xl lg:text-5xl xl:text-6xl">Bookville</span>
        </h1>
        <p className="mt-6 text-sm md:text-base lg:text-lg xl:text-xl opacity-80 tracking-wide leading-snug w-full lg:w-2/3">
          At Bookville we bring you the best collection of books that you love and enjoy reading.
          Here you can search the books by name or find the books by their genre!
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search books..."
            className="border p-2 pl-10 w-full rounded-full outline-blue-500"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="border p-2 w-full rounded-full outline-blue-500"
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

      <div className="flex justify-center mb-10 space-x-2 items-center">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-3 py-2 bg-gray-300 rounded">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-2 rounded ${p === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {p}
          </button>
        ))}
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-3 py-2 bg-gray-300 rounded">
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
