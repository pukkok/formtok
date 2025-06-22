const ModalCover = ({ children }) => {

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1000">
        {children}
      </div>
    </div>
  )
}

export default ModalCover