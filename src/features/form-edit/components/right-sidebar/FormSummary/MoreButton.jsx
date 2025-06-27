const MoreButton = ({className, onClick, children, ...props}) => {

  return (
    <button
    onClick={onClick}
    className={`dark:hover:bg-dark-elevated dark:text-bright-a text-dark-deep hover:bg-light-w px-2 py-2 rounded-md ${className}`}
    {...props}
    >{children}</button>
  )
}

export default MoreButton