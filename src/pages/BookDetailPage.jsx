// src/pages/BookDetailPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations
import Loader from "../components/Loader";
import { fetchBooks, loadWishlist, updateWishlist } from "../services/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(loadWishlist());
  }, []);

  const inWishlist = wishlist.some((b) => b.id === parseInt(id));

  const toggleWishlist = () => {
    const updatedWishlist = inWishlist
      ? wishlist.filter((b) => b.id !== parseInt(id))
      : [...wishlist, book];
    setWishlist(updatedWishlist);
    updateWishlist(updatedWishlist);
  };

  useEffect(() => {
    const loadBook = async () => {
      const { results } = await fetchBooks();
      const bookDetail = results.find((b) => b.id === parseInt(id));
      setBook(bookDetail);
    };
    loadBook();
  }, [id]);

  if (!book) return <Loader />;

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Author(s) | </strong>
        {book.authors.map((a) => (
          <span key={a.name}>{a.name} ({a.birth_year} - {a.death_year})</span>
        ))}
      </p>
      <motion.img
        src={book.formats["image/jpeg"] || "https://via.placeholder.com/300"}
        alt={book.title}
        className="w-full max-h-[600px] object-contain rounded-lg shadow-md mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <p className="text-lg text-gray-700 mb-4">
        <strong>Subjects <br /></strong>{book.subjects.join(", ")}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Bookshelves <br /> </strong>{book.bookshelves.join(", ")}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Languages <br /> </strong>{book.languages.join(", ")}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>ID</strong> <br />{book.id}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Download Count</strong> <br /> {book.download_count}
      </p>
      <div className="text-lg text-gray-700 mb-4">
        <strong>Download Links <br /></strong>
        <ul className="list-disc ml-6">
          {Object.entries(book.formats).map(([format, link]) => (
            <li key={format}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {format}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`mt-12 px-6 py-3 rounded-lg ${inWishlist ? "bg-red-500" : "bg-blue-500"} text-white flex items-center gap-2`}
        onClick={toggleWishlist}
      >
        {inWishlist ? <FaHeart /> : <FaRegHeart />} {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </motion.div>
  );
};

export default BookDetailPage;
