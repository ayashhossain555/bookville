import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaHeart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-600 bg-opacity-85" : "bg-blue-600"
      } ${isOpen ? "" : "hover:bg-opacity-95"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.span
            className="text-white font-bold text-3xl tracking-wider uppercase"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Bookville
          </motion.span>
        </Link>

        {/* Hamburger Menu Icon */}
        <button className="text-white text-3xl md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex text-white space-x-6">
          <NavLink to="/" icon={<FaHome />} label="Home" />
          <NavLink to="/wishlist" icon={<FaHeart />} label="Wishlist" />
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-blue-600 text-white bg-opacity-95 flex flex-col space-y-4 p-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink to="/" icon={<FaHome />} label="Home" onClick={toggleMenu} />
            <NavLink
              to="/wishlist"
              icon={<FaHeart />}
              label="Wishlist"
              onClick={toggleMenu}
            />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

// Reusable NavLink component for links
const NavLink = ({ to, icon, label, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="flex items-center"
    onClick={onClick}
  >
    {icon}
    <Link to={to} className="text-white text-lg ml-2 hover:underline">
      {label}
    </Link>
  </motion.div>
);

export default Navbar;