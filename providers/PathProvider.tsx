import { createContext, useContext, useState } from "react";

const PathContext = createContext<any>('notes')
const SetPathContext = createContext<any>(null)

export const usePath = () => {
  const path = useContext(PathContext)
  const setPath = useContext(SetPathContext)

  return { path, setPath }
}

const PathProvider = ({ children }: any) => {
  const [path, setPath] = useState('notes')

  return (
    <PathContext.Provider value={path}>
      <SetPathContext.Provider value={setPath}>
        { children }
      </SetPathContext.Provider>
    </PathContext.Provider>
  )
}

export default PathProvider