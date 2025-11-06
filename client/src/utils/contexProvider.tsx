import { useState, type ReactNode } from "react";
import { type DataSchema } from "./MemoryContext";
import { type MemorySchema } from "./MemoryContext";
import MemoryContext from "./MemoryContext";

function ContextProvider({children}: {children: ReactNode}){

  const [data, setData] = useState<DataSchema[] | []>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("name") ? localStorage.getItem("name") : "");
  const backendUrl = "http://localhost:4000/api"

  const value: MemorySchema = {
    data,
    setData,
    backendUrl,
    token,
    setToken,
    userName, 
    setUserName
  }

  return (
    <MemoryContext.Provider value={value}>
    {children}
    </MemoryContext.Provider>
  )
}

export default ContextProvider;