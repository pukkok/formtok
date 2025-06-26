const SubmitButton = ({onClick, children}) => {

  const handleClick = (e) => {
    e.preventDefault()
    if(typeof onClick === 'function') onClick()
  }

  return (
    <button 
      onClick={handleClick}
      type="submit"
      className="ml-auto text-center rounded-[50px] min-w-[100px] py-2 px-4 border-2 border-transparent bg-point font-bold cursor-pointer hover:bg-point-hover text-light-w">
      {children}
    </button>
  )
}

export default SubmitButton