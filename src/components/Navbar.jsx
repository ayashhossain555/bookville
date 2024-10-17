import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-500 p-4 flex justify-between">
    <h1 className="text-white font-bold text-xl">Book Explorer</h1>
    <div>
      <Link to="/" className="text-white mr-4">Home</Link>
      <Link to="/wishlist" className="text-white">Wishlist</Link>
    </div>
  </nav>
);

export default Navbar;
