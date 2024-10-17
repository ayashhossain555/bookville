import { useState, useEffect } from "react";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadBooks = async () => {
      const results = await fetchBooks(search);
      setBooks(results);
    };
    loadBooks();
  }, [search, page]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search books..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span className="mx-2">Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
