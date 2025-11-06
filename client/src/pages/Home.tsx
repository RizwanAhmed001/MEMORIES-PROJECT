import { Link } from "react-router-dom";

const Home = () => {

  const name = localStorage.getItem("name");

  return (
    <div className="h-[82vh] bg-linear-to-br from-gray-100 to-purple-300 flex flex-col justify-center items-center text-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-2">Welcome {name ? name : "Guest"}</h1>
      <p className="text-lg text-gray-600">{name ? <Link to="/memory"><button className="px-6 py-2 my-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200">Memory</button></Link> : "Please Login To See Memories"}</p>
      {
        !name && <Link to="/login">
        <button className="px-6 py-2 my-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200">
          Login
        </button>
      </Link>
      }
    </div>
  );
};

export default Home;
