const Footer = () => (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section: Brand Name */}
        <div className="text-lg font-bold tracking-wider mb-4 md:mb-0">
          © {new Date().getFullYear()} Bookville
        </div>
  
        {/* Center Section: Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="#"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
  
        {/* Right Section: Social Media */}
        <div className="flex space-x-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/facebook--v1.png"
              alt="Facebook"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/twitter--v1.png"
              alt="Twitter"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new--v1.png"
              alt="Instagram"
            />
          </a>
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  