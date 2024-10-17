import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (book) => {
    const updatedWishlist = wishlist.filter((b) => b.id !== book.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((book) => (
          <BookCard key={book.id} book={book} toggleWishlist={removeFromWishlist} inWishlist />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
