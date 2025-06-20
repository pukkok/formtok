const IconButton = ({onClick, children}) => {

  return (
    <button 
      className="p-1 hover:bg-light-purple hover:text-bright-a rounded-sm"
      onClick={onClick}
      >
      {children}
    </button>
  )
}

export default IconButton