const FullOverlay = ({ close, children }) => {
  const click = (e) => {
    if (e.target === e.currentTarget) close()
  }

  return (
    <div className="overlay" onClick={click}>
      { children }
    </div>
  )
}

export default FullOverlay