import { BulletDiscIcon, BulletHollowIcon, BulletSquareIcon, TextIcon } from '@/components/icons/ListIcons'
import useOutsideClick from '@/hooks/useOutsideClick'
import IconButton from './IconButton'
import { DropdownArrowIcon } from '../icons/CommonIcons'

const bulletOptions = [
  { iconRender: (size) => <BulletDiscIcon size={size}/>, className: 'bullet-disc'},
  { iconRender: (size) => <BulletHollowIcon size={size}/>, className: 'bullet-hollow' },
  { iconRender: (size) => <BulletSquareIcon size={size}/>, className: 'bullet-square' },
]

const orderedOptions = [
  { iconRender: (size) => <TextIcon size={size} text={['1.', '2.']} />, className: 'text-1' },
  { iconRender: (size) => <TextIcon size={size} text={['a.', 'b.']} />, className: 'text-a' },
  { iconRender: (size) => <TextIcon size={size} text={['A.', 'B.']} />, className: 'text-A' },
  { iconRender: (size) => <TextIcon size={size} text={['i.', 'ii.']} />, className: 'text-i' },
  { iconRender: (size) => <TextIcon size={size} text={['I.', 'II.']} />, className: 'text-I' },
]

const ListStyleSelector = ({ editor, type = 'bulletList', onSelect }) => {
  const { isOpen, setIsOpen, ref } = useOutsideClick(false)
  const options = type === 'bulletList' ? bulletOptions : orderedOptions

  return (
    <div ref={ref} className="relative">
      <div className='flex'>
        <IconButton onClick={() => onSelect(options[0].className)} isActive={editor.isActive(type)}>
          {options[0].iconRender(24)}
        </IconButton>
        <button onClick={() => setIsOpen(prev => !prev)} 
          className={`flex items-center w-4
            ${isOpen ? 'bg-light-purple hover:bg-light-purple text-bright-a' : 'hover:bg-gray-300 '} 
            border-l border-l-transparent rounded-r-sm rounded-b-sm
          `}>
          <DropdownArrowIcon />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 flex bg-white border border-light-w rounded shadow-md p-1 mt-1">
          {options.slice(1).map(({ iconRender, className }) => (
            <button
              key={className}
              onClick={() => {
                onSelect(className)
                setIsOpen(false)
              }}
              className="w-full flex items-center justify-start gap-2 px-1 py-1 hover:bg-light-purple hover:text-bright-a rounded-sm"
            >
              {iconRender(32)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListStyleSelector