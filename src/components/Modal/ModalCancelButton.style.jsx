const ModalCancelButton = ({ type='button', onClick, children, ...props }) => {
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-lg px-3 py-2 text-light-w font-bold 
        bg-gray-500 cursor-pointer min-w-18`}
      {...props}
    >
      {children || '취소'}
    </button>
  )
}

export default ModalCancelButton