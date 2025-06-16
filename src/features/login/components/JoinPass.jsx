const JoinPass = ({isComplete=false, onClick=null, className, children}) => {
  if(isComplete) return (
    <span className={`
      w-[22px] h-[22px] -rotate-45 translate-x-0 translate-y-[-7px]
      before:content-[""]
      before:absolute
      before:bottom-0 before:left-0
      before:w-full before:h-0.5
      before:bg-emerald-400 before:duration-300

      after:content-[""]
      after:absolute
      after:bottom-0 after:left-0
      after:w-0.5 after:h-1/2
      after:bg-emerald-400 after:duration-300
    `} />
  )

  return <button type="button" className={`cursor-pointer ${className}`} onClick={onClick}>{children}</button>

}

export default JoinPass