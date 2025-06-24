'use client'

import React from "react"
import { DropdownArrowIcon } from "@/components/icons/CommonIcons"
import useOutsideClick from "@/hooks/useOutsideClick"

const Dropdown = ({ initialItem, children, initialState = false, style }) => {
  const { isOpen, setIsOpen, ref } = useOutsideClick(initialState)

  return (
    <div ref={ref} className="relative w-full" style={style}>
      <button
        className={`
          w-full flex gap-2 items-center h-[45px] px-4 py-2 rounded-xl font-bold transition border
          bg-bright-a
          ${isOpen ? "border-silver" : "border-zinc-900/10"}
          hover:border-silver
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {initialItem}
        <DropdownArrowIcon
          className={`
            ml-auto text-[24px] transition-transform
            ${isOpen ? "-rotate-180" : ""}
          `}
        />
      </button>

      <ul
        className={`
          absolute top-[50px] w-full z-50 border rounded-[12px] bg-bright-a px-2 py-3
          border-silver
          ${isOpen ? "block" : "hidden"}
        `}
        onClick={() => setIsOpen(false)}
      >
        {React.Children.map(children, (child) => (
          <li className="w-full px-2 
          hover:bg-light-w hover:text-light-purple hover:rounded-lg">
            {child}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
