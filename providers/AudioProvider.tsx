import { createContext, useContext, useEffect, useState } from "react"

const AudioContext = createContext<any>(null)
const SetAudioContext = createContext<any>(null)

export const useAudio = () => {
  const audio = useContext(AudioContext)
  const setAudio = useContext(SetAudioContext)

  const switchTrack = (src: string) => {
    if (audio) {
      audio.pause()
      audio.src = src
      audio.currentTime = 0
    }
    else if (src) setAudio(new Audio(src))
    else setAudio(null)
  }

  return [ audio, switchTrack ]
}

const AudioProvider = ({ children }) => {
  const [audio, setAudio] = useState(null)

  return (
    <AudioContext.Provider value={audio}>
      <SetAudioContext.Provider value={setAudio}>
        { children }
      </SetAudioContext.Provider>
    </AudioContext.Provider>
  )
}

export default AudioProvider