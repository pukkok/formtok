'use client'

import { useScreenStore } from "@/stores/useScreenStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const TreeNode = ({node}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const router = useRouter()
  
  const activeTab = useScreenStore(s => s.activeTab)
  const setActiveTab = useScreenStore(s => s.setActiveTab)

  const toggleOpen = () => {
    setIsExpanded(!isExpanded)
  }

  const goToTab = (node) => {
    router.push(node.path)
    setActiveTab(node.path)
  }

  const hasChildren = node?.children && node.children.length > 0

  return (
    <li className="mt-2">
      <button 
        className={`
          w-full hover:bg-light-purple dark:hover:bg-charcoal 
          flex items-center gap-x-3 
          py-2 px-3 
          rounded-lg
          transition-[background-color_0.3s]
          cursor-pointer
          ${(hasChildren && isExpanded) ? 'bg-lgith-purple dark:bg-charcoal' : ''}
          ${
            activeTab === node.path ? 'bg-point-hover hover:bg-point-hover dark:hover:bg-point-hover' : ''}
          `}
        onClick={hasChildren ? toggleOpen : () => goToTab(node)}  
      >
        {node?.icon} 
        {node?.text}
        {hasChildren && <span 
          className={`${isExpanded ? '' : 'rotate-180'} transition-all duration-200 flex justify-center items-center ml-auto`}>
            <FaAngleDown />
        </span>}
      </button>

      {hasChildren && (
        <ul className={`mx-3 
        ${isExpanded ? 'h-40' : 'h-0'} max-h-fit overflow-hidden transition-all duration-300`}>
          {node.children.map(item => {
            return <TreeNode key={item.text} node={item} />
          })}
        </ul>
      )}
    </li>
  )
}

export default TreeNode