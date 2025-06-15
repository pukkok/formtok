'use client'

// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

function NavigateButton ({ to='/', handleClick = null, className, children }) {
  const router = useRouter()
  // const navigate = useNavigate()

  const onClick = (to) => {
    router.push(to)
    if(handleClick) handleClick()
  }

  return <button type="button"
    className={className}
    onClick={()=>onClick(to)}
    >{children}</button>
}

export default NavigateButton