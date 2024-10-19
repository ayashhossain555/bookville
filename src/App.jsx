import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
    <Footer />
  </Router>
);

export default App;
