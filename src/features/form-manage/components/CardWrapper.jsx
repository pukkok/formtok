const CardWrapper = ({ children }) => {

  return (
    <div className={`
      w-full h-52.5
      shadow-md
      transition-[box-shadow_300ms_cubic-bezier(0.4,0,0.2,1)_0ms]
      overflow-hidden rounded-xl
      dark:bg-dark cursor-pointer
    `}>
      {children}
    </div>
  )
}

export default CardWrapper