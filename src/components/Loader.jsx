import { FaSpinner } from "react-icons/fa";

const Loader = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <FaSpinner className="animate-spin text-4xl text-blue-500" />
  </div>
);

export default Loader;
