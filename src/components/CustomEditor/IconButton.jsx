const IconButton = ({onClick, isActive=false, children}) => {

  return (
    <button 
      className={`
        ${isActive ? 'bg-point-hover text-bright-a' : 'hover:bg-light-purple hover:text-bright-a'} 
        p-1 rounded-sm
      `}
      onClick={onClick}
      >
      {children}
    </button>
  )
}

export default IconButton