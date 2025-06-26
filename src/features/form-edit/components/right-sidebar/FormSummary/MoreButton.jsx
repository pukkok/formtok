const MoreButton = ({className, onClick, children, ...props}) => {

  return (
    <button
    onClick={onClick}
    className={`hover:bg-light-w px-2 py-2 rounded-md ${className}`}
    {...props}
    >{children}</button>
  )
}

export default MoreButton