import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="min-h-[10vh] w-full py-2 px-4 bg-linear-to-br from-blue-500 to-purple-600 flex justify-between items-center">
      <Link to="/"><h1 className="text-2xl font-semibold text-white">Memories</h1></Link>
      <Link to="/login">
        <button className="text-gray-300 text-xl font-bold transition-colors hover:text-gray-600">Login</button>
      </Link>
    </div>
  );
};

export default Header;
