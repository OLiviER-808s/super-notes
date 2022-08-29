import { Overlay } from "@mantine/core";
import { createContext, useContext, useState } from "react";

const OverlayContext = createContext<any>(null)
const OverlaySetContext = createContext<any>(null)

export const useOverlay = (children) => {
  const content = useContext(OverlayContext)
  const setContent = useContext(OverlaySetContext)

  const opened = !!content
  const setOpened = (state: boolean) => {
    if (state) setContent(children)
    else setContent(null)
  }

  return { opened, setOpened }
}

const OverlayProvider = ({ children }) => {
  const [content, setContent] = useState(null)

  return (
    <OverlayContext.Provider value={content}>
      <OverlaySetContext.Provider value={setContent}>
        {content && (
          <>
            <Overlay opacity={0.75} color="black" zIndex={5} />
            <div className="overlay-inner" onClick={() => setContent(null)}>{ content }</div>
          </>
        )}

        { children }
      </OverlaySetContext.Provider>
    </OverlayContext.Provider>
  )
}

export default OverlayProvider