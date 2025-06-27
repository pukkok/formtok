'use client'

import { useScreenStore } from "@/stores/useScreenStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa"

const TreeNode = ({node, handleRouteChange }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const router = useRouter()
  
  const activeTab = useScreenStore(s => s.activeTab)
  const setActiveTab = useScreenStore(s => s.setActiveTab)

  const toggleOpen = () => {
    setIsExpanded(!isExpanded)
  }

  const goToTab = (node) => {
    const isChanged = handleRouteChange(node.path)
    if(!isChanged) setActiveTab(node.path)
  }

  const hasChildren = node?.children && node.children.length > 0

  return (
    <li className="mt-2">
      <button 
        className={`
          w-full 
          flex items-center gap-x-3 
          py-2 px-3 
          rounded-lg
          transition-[background-color_0.3s]
          cursor-pointer font-bold
          ${(hasChildren && isExpanded) ? 'bg-point-hover dark:bg-dark-hover' : ''}
          ${ activeTab === node.path ? 
            'bg-light-purple hover:bg-light-purple dark:bg-point dark:hover:bg-point' : 
            'hover:bg-point-hover dark:hover:bg-dark-hover'}`}
        onClick={hasChildren ? toggleOpen : () => goToTab(node)}
        tabIndex={-1}
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
            return <TreeNode key={item.text} handleRouteChange={handleRouteChange} node={item} />
          })}
        </ul>
      )}
    </li>
  )
}

export default TreeNode