import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-500 p-4 flex justify-between">
    <Link to="/" className="text-white font-bold text-xl">Bookville</Link>
    <div>
      <Link to="/" className="text-white mr-4">Home</Link>
      <Link to="/wishlist" className="text-white">Wishlist</Link>
    </div>
  </nav>
);

export default Navbar;
