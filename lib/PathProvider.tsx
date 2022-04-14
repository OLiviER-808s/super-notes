import { createContext, useState } from "react";

export const PathContext = createContext<any>('notes')
export const SetPathContext = createContext<any>(null)

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