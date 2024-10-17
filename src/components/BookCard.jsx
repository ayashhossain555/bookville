import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Wishlist icons

const BookCard = ({ book, toggleWishlist, inWishlist }) => {
  const [showFullGenres, setShowFullGenres] = useState(false);

  const genres = book.subjects || ["Unknown Genre"];
  const displayedGenres = showFullGenres ? genres.join(", ") : genres.slice(0, 3).join(", ");

  return (
    <div
      className="flex flex-col justify-between border rounded-lg p-4 shadow-md h-full w-full"
      style={{ minHeight: "450px" }}
    >
      <img
        src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"}
        alt={book.title}
        className="w-full h-[470px] object-cover rounded-md mb-2"
      />
      <div className="">
        <h2 className="text-lg font-bold mt-2">{book.title}</h2>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Author(s):</strong> {book.authors.map((a) => a.name).join(", ")}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Genre:</strong> {displayedGenres}
          {genres.length > 3 && (
            <button
              className="text-blue-500 ml-2"
              onClick={() => setShowFullGenres(!showFullGenres)}
            >
              {showFullGenres ? "Show Less" : "...More"}
            </button>
          )}
        </p>
        <p className="text-sm text-gray-700">
          <strong>ID:</strong> {book.id}
        </p>
        <button
          className={`mt-2 px-4 py-2 rounded ${
            inWishlist ? "bg-red-500" : "bg-blue-500"
          } text-white flex items-center gap-2`}
          onClick={() => toggleWishlist(book)}
        >
          {inWishlist ? <FaHeart /> : <FaRegHeart />} {inWishlist ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
