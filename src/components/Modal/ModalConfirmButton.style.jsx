const ModalConfirmButton = ({ type='submit', onClick, children, ...props }) => {

  return (
    <button 
      onClick={onClick}
      type={type}
      className={`
        rounded-md px-3 py-2 text-light-w 
      bg-point dark:bg-dark-point-hover cursor-pointer min-w-18`}
      {...props}
    >
      {children || '확인'}
    </button>
  )
}

export default ModalConfirmButton