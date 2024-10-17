const BookCard = ({ book, toggleWishlist, inWishlist }) => (
    <div className="border rounded-md p-4 shadow-lg">
      <img
        src={book.formats["image/jpeg"]}
        alt={book.title}
        className="h-64 w-full object-cover"
      />
      <h2 className="text-lg font-bold mt-2">{book.title}</h2>
      <p className="text-sm text-gray-700">{book.authors.map(a => a.name).join(", ")}</p>
      <button
        className={`mt-2 px-4 py-2 rounded ${inWishlist ? "bg-red-500" : "bg-green-500"} text-white`}
        onClick={() => toggleWishlist(book)}
      >
        {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
  
  export default BookCard;
  