const HelpScript = ({children, useUp=false}) => {

  return (
    <span className={`group-hover:block w-fit p-2.5 rounded-lg absolute hidden text-sm 
      bg-[#333] whitespace-pre-line
      text-light-w z-100
      ${useUp ? 'mt-0 mb-2.5 bottom-full' : 'top-full mt-2.5'}
    `}>
      <span className={`absolute left-5 border-[6px]
      ${useUp ? 
        'top-full border-r-transparent border-l-transparent border-t-[#333] border-b-transparent':
        'bottom-full border-r-transparent border-l-transparent border-b-[#333] border-t-transparent'
      }`}/>
      {children}
    </span>
  )
}

export default HelpScript