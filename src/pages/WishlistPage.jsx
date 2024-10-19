// src/pages/WishlistPage.jsx

import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { loadWishlist, updateWishlist } from "../services/api";
import { FaRegHeart } from "react-icons/fa";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(loadWishlist());
  }, []);

  const removeFromWishlist = (book) => {
    const updatedWishlist = wishlist.filter((b) => b.id !== book.id);
    setWishlist(updatedWishlist);
    updateWishlist(updatedWishlist);
  };

  return (
    <div className="mt-28">
      <h1 className="text-2xl text-blue-500 font-bold mb-12 flex items-center justify-center gap-2">
        <FaRegHeart /> Your Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            toggleWishlist={removeFromWishlist}
            inWishlist
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
