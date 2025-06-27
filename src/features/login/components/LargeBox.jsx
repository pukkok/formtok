import LoginNav from "./LoginNav"

const LargeBox = ({className, children}) => {

  return (
    <div className={`absolute top-1/2 left-0 -translate-y-1/2
      w-[550px] h-[800px]
      dark:bg-dark-elevated bg-bright-b
      p-10 shadow-[0_0px_70px_rgba(0,0,0,0.1)]
      border-t-[5px] border-t-point z-[1]
      ${className}
    `}>
      <LoginNav />
      {children}
    </div>
  )
}

export default LargeBox