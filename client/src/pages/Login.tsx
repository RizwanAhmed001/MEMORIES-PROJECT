import { useContext, useState } from "react";
import MemoryContext from "../utils/MemoryContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const context = useContext(MemoryContext);
  const navigate = useNavigate();

  if(!context){
    throw new Error("No Context Available")
  }

  const {backendUrl, setToken, setUserName} = context;

  const [login, setLogin] = useState<boolean>(true);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    try {

      if(!name || !email || !password){
        toast.error("Please Fill All Fields")
        return;
      }

      const response = await axios.post(backendUrl + "/register", {name, email, password})
      if(response.data.success){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        setToken(response.data.token)
        setUserName(response.data.user.name)
        navigate("/memory");
      }else{
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Error While Registering User")
    }

  }

  const handleLogin = async () => {
    try {
      if(!email || !password){
        toast.error("Please Fill All Fields")
        return;
      }
      const response = await axios.post(backendUrl + "/login", {email, password});
      if(response.data.success){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        setToken(response.data.token)
        setUserName(response.data.user.name)
        navigate("/memory");
      }else{
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Error While Login User")
    }
  }

  return (
    <div className="h-[84vh] flex justify-center items-center">

      {/* Register Form */};
      {
        !login && <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            id="name"
            name="name"
            placeholder="Enter Full Name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <span onClick={() => setLogin(true)} className="text-blue-600 hover:underline cursor-pointer">
            {" "}
            Login
          </span>
        </p>
      </div>
      }

      {/* Login form */}
      {
        login && <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
        onClick={handleLogin}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have a account?
          <span onClick={() => setLogin(false)} className="text-blue-600 hover:underline cursor-pointer">
            {" "}
            register
          </span>
        </p>
      </div>
      }
      
    </div>
  );
};

export default Login;
