import { createContext } from "react"

export interface DataSchema {
  _id: string
  creator: string,
  title: string, 
  message: string,
  tags: string,
  image: string
}

export interface MemorySchema {
  data: DataSchema[] | null,
  setData: React.Dispatch<React.SetStateAction<DataSchema[] | []>>,
  backendUrl: string
  token: string | null,
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
  userName: string | null,
  setUserName: React.Dispatch<React.SetStateAction<string | null>>
}

const MemoryContext = createContext<MemorySchema | []>([]);

export default MemoryContext;