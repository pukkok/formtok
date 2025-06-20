import useOutsideClick from "@/hooks/useOutsideClick"
import { MoreVerticalIcon } from "@/components/icons/CommonIcons"

const MoreVert = ({ children, autoClose = true, addOptionClass }) => {
  const { isOpen, setIsOpen, ref } = useOutsideClick(false)

  return (
    <div
      ref={ref}
      className="relative z-10 flex items-center"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center cursor-pointer">
        <span className={`flex items-center justify-center w-7 h-6 text-lg p-1
        ${isOpen ? 'bg-light-w' : ''}
        hover:bg-light-w rounded-sm`}>
          <MoreVerticalIcon />
        </span>
      </button>

      <div
        onClick={() => autoClose && setIsOpen(false)}
        className={`absolute right-5 top-0 z-10 flex flex-col text-sm bg-bright-a shadow-md rounded-xl overflow-hidden ${
          isOpen ? "h-auto p-3" : "h-0 overflow-hidden"
        } ${addOptionClass || ""}`}
      >
        {children}
      </div>
    </div>
  )
}

export default MoreVert
