import { Overlay } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { createContext, useContext, useState } from "react";

const OverlayContext = createContext<any>(null)
const OverlaySetContext = createContext<any>(null)

export const useOverlay = (children): Array<any> => {
  const content = useContext(OverlayContext)
  const setContent = useContext(OverlaySetContext)

  const opened = !!content
  const setOpened = (state: boolean) => {
    if (state) setContent(children)
    else setContent(null)
  }

  return [ opened, setOpened ]
}

const OverlayProvider = ({ children }) => {
  const [content, setContent] = useState(null)
  const { ref, height } = useElementSize()

  const closeOverlay = (e) => {
    console.log(height)
    if (e.target.dataset.closeOverlay) setContent(null)
  }

  return (
    <OverlayContext.Provider value={content}>
      <OverlaySetContext.Provider value={setContent}>
        {content && (
          <>
            <Overlay 
            opacity={0.75} 
            color="black" 
            style={{height: height, minHeight: '100%'}} 
            zIndex={5}
            onClick={() => setContent(null)} />

            <div ref={ref} className="overlay-inner" data-close-overlay onClick={closeOverlay}>
              { content }
            </div>
          </>
        )}

        { children }
      </OverlaySetContext.Provider>
    </OverlayContext.Provider>
  )
}

export default OverlayProvider