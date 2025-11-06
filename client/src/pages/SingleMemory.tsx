import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MemoryContext, { type DataSchema } from "../utils/MemoryContext";
import { toast } from "react-toastify";

const SingleMemory = () => {
  const context = useContext(MemoryContext);
  const [single, setSingle] = useState<DataSchema | null>(null);

  if (!context) {
    throw new Error("Something went wrong!");
  }

  const navigate = useNavigate();

  const { backendUrl, token } = context;

  const params = useParams();
  const { id } = params;

  const singleData = async () => {
    try {
      const response = await axios.get(backendUrl + `/singleMemory/${id}`,{headers: {token}});
      if (response.data.success) {
        setSingle(response.data.data);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    singleData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {single?.creator}
        </h2>
        <img
          src={single?.image}
          alt={single?.title}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-blue-500 font-medium">{single?.tags}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          {single?.title}
        </h1>
        <p className="text-gray-600 mt-4 leading-relaxed">{single?.message}</p>
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/memory">
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
            Back To Memory
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleMemory;
