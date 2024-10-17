import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const results = await fetchBooks();
      const bookDetail = results.find((b) => b.id === parseInt(id));
      setBook(bookDetail);
    };
    loadBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl">{book.title}</h1>
      <p>{book.authors.map((a) => a.name).join(", ")}</p>
      <img src={book.formats["image/jpeg"]} alt={book.title} />
    </div>
  );
};

export default BookDetailPage;
