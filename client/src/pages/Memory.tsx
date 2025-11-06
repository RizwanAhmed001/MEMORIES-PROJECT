import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import MemoryContext, { type DataSchema } from "../utils/MemoryContext";
import { AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Memory = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const [editCreator, setEditCreator] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editMessage, setEditMessage] = useState<string>("");
  const [editTags, setEditTags] = useState<string>("");
  const [editImage, setEditImage] = useState<string>("");
  const [editId, setEditId] = useState<string>("");

  const [formData, setFormData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    image: "",
  });

  const context = useContext(MemoryContext);

  if (!context) {
    toast.error("Context Throw An Error");
  }

  const { data, setData, backendUrl, token } = context;

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      console.log("Nikal Lawde");
      const response = await axios.get(backendUrl + "/getMemory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response?.data?.success) {
        setData(response?.data?.allMemories);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error While Fetching Data!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(backendUrl + `/deleteMemory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success) {
        toast("Memory Deleted Succesfully");
        await new Promise(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      } else {
        toast.error(!response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/addMemory", formData, {
       headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success) {
        toast("New Memory Added Succesfully");
        await new Promise(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong While Creating A New Memory!");
    }
  };

  const handleEdit = async (memory: DataSchema) => {
    setEditing(true);
    setEditCreator(memory.creator);
    setEditTitle(memory.title);
    setEditMessage(memory.message);
    setEditTags(memory.tags);
    setEditImage(memory.image);
    setEditId(memory._id);
  };

  const handleEditSubmit = async () => {
    try {
      console.log("Hollla");
      const updateData = {
        creator: editCreator,
        title: editTitle,
        message: editMessage,
        tags: editTags,
        image: editImage,
      };
      const response = await axios.put(
        backendUrl + `/updateMemory/${editId}`,
        updateData,
        { headers: {
          Authorization: `Bearer ${token}`,
        }, }
      );
      console.log(response);
      if (response.data.success) {
        toast("Memory Updated");
        await new Promise(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("SomethingWnr Wroong!");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
        <h1 className="text-3xl font-bold text-white">Loading....</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-6 p-6">
      {/* Memories Section */}
      <div className="w-full lg:w-3/5 flex flex-wrap justify-center gap-6">
        {data.map((memory: DataSchema) => (
          <div
            key={memory._id}
            className="bg-white w-full sm:w-[90%] md:w-[45%] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Image & Creator */}
            <div className="relative">
              <h2 className="absolute top-3 left-4 text-white font-semibold bg-black/40 px-2 py-1 rounded-lg">
                {memory.creator}
              </h2>
              <Link to={`/memory/${memory._id}`}>
                <h2 className="absolute top-3 right-4 text-white font-semibold text-xl cursor-pointer">
                  ...
                </h2>
              </Link>
              <img
                className="rounded-t-2xl h-56 w-full object-cover"
                src={memory.image}
                alt={memory.title}
              />
            </div>

            {/* Memory Details */}
            <div className="p-4">
              <p className="text-blue-600 text-sm font-medium">{memory.tags}</p>
              <h1 className="text-lg font-bold text-gray-800 mt-1">
                {memory.title}
              </h1>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed text-justify">
                {memory.message}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4 text-gray-700">
                <button className="flex items-center gap-2 hover:text-blue-600 transition">
                  <AiFillLike className="text-blue-500" /> Like
                </button>
                <button
                  onClick={() => handleEdit(memory)}
                  className="flex items-center gap-2 hover:text-green-600 transition"
                >
                  <FaEdit className="text-green-500" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(memory._id)}
                  className="flex items-center gap-2 hover:text-red-600 transition"
                >
                  <MdDelete className="text-red-500" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-2/5">
        <form
          onSubmit={editing ? handleEditSubmit : handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
        >
          <h1 className="text-xl font-semibold text-center text-gray-800">
            {editing ? "Edit Memory" : "Create a Memory"}
          </h1>

          <input
            value={editing ? editCreator : formData.creator}
            name="creator"
            onChange={
              editing ? (e) => setEditCreator(e.target.value) : handleChange
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            placeholder="Creator"
          />

          <input
            value={editing ? editTitle : formData.title}
            name="title"
            onChange={
              editing ? (e) => setEditTitle(e.target.value) : handleChange
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            placeholder="Title"
          />

          <textarea
            value={editing ? editMessage : formData.message}
            name="message"
            onChange={
              editing ? (e) => setEditMessage(e.target.value) : handleChange
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows={4}
            placeholder="Message"
          ></textarea>

          <input
            value={editing ? editTags : formData.tags}
            name="tags"
            onChange={
              editing ? (e) => setEditTags(e.target.value) : handleChange
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            placeholder="Tags"
          />

          <input
            value={editing ? editImage : formData.image}
            name="image"
            onChange={
              editing ? (e) => setEditImage(e.target.value) : handleChange
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            placeholder="Image URL"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              {editing ? "Update" : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => (editing ? setEditing(false) : location.reload())}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              {editing ? "Cancel" : "Clear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Memory;
