import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import BookDetailPage from "./pages/BookDetailPage";

const App = () => (
  <Router>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
