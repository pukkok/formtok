import ani from '@/animations/SidebarExpand.module.css'
import { useScreenStore } from "@/stores/useScreenStore"
import ToggleOpenButton from './ToggleOpenButton'

const EXPAND_WIDTH = 320

const SidebarWrapper = ({ children }) => {

  const sidebarWidth = useScreenStore(s => s.sidebarWidth)

  return (
    <aside className={`
      ${sidebarWidth === EXPAND_WIDTH ? ani['expand-sidebar'] : ''}
      w-full max-h-screen h-screen sticky top-0 bottom-0 
    text-light-w border-r bg-point 
    dark:bg-dark dark:border-charcoal
      duration-300 `}
      style={{width: `${sidebarWidth}px`}}
    >
      <ToggleOpenButton />

      <div className={`w-[${EXPAND_WIDTH}px]
        py-7.5 px-5 flex flex-col h-full`}>
      {children}
      </div>
    </aside>
  )
}

export default SidebarWrapper