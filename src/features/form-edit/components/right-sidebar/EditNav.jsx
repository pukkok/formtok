'use client'

import { useState } from "react"

const EditNav = ({navs}) => {
  const [active, setActive] = useState(navs[0].id)

  return (
    <nav className="h-15 border-b-gray-300 border-b">
      {navs.length > 0 && 
        navs.map((item) => (
        <button key={item.id}
          className={`
            ${active === item.id ? 'text-point border-b-3 border-b-point' : 'border-b-1 border-b-transparent'}
            font-[800] h-full px-3.5 pt-2.5 
          `}
          onClick={() => setActive(item.id)}
          >
            {item.title}
        </button>
      ))}
    </nav>
  )
}

export default EditNav