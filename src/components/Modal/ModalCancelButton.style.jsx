const ModalCancelButton = ({ type='button', onClick, children, ...props }) => {
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-md px-3 py-2 dark:text-light-w 
        bg-gray-300 dark:bg-gray-600 text-black cursor-pointer min-w-18`}
      {...props}
    >
      {children || '취소'}
    </button>
  )
}

export default ModalCancelButton