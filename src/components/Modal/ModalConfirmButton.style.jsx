const ModalConfirmButton = ({ type='submit', onClick, children, ...props }) => {

  return (
    <button 
      onClick={onClick}
      type={type}
      className={`
        rounded-lg px-3 py-2 text-light-w font-bold 
      bg-point dark:bg-dark-point-hover cursor-pointer min-w-18`}
      {...props}
    >
      {children || '확인'}
    </button>
  )
}

export default ModalConfirmButton