import { ArrowDownIcon } from '@/A-Components/Icons/Icons'
import { BulletDiscIcon, BulletHollowIcon, BulletSquareIcon, TextIcon } from '@/components/icons/ListIcons'
import useOutsideClick from '@/hooks/useOutsideClick'
import IconButton from './IconButton'

const bulletOptions = [
  { icon: <BulletDiscIcon />, className: 'bullet-disc' },
  { icon: <BulletHollowIcon />, className: 'bullet-hollow' },
  { icon: <BulletSquareIcon />, className: 'bullet-square' },
]

const orderedOptions = [
  { icon: <TextIcon text={['1.', '2.']} />, className: 'text-1' },
  { icon: <TextIcon text={['a.', 'b.']} />, className: 'text-a' },
  { icon: <TextIcon text={['A.', 'B.']} />, className: 'text-A' },
  { icon: <TextIcon text={['i.', 'ii.']} />, className: 'text-i' },
  { icon: <TextIcon text={['I.', 'II.']} />, className: 'text-I' },
]

const ListStyleSelector = ({ type = 'bullet', onSelect }) => {
  const { isOpen, setIsOpen, ref } = useOutsideClick(false)
  const options = type === 'bullet' ? bulletOptions : orderedOptions

  return (
    <div ref={ref} className="relative">
      <div className='flex'>
        <IconButton onClick={() => onSelect(options[0].className)}>{options[0].icon}</IconButton>
        <button onClick={() => setIsOpen(prev => !prev)} 
          className="flex border-l border-l-transparent hover:border-l-gray-300">
          <ArrowDownIcon />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 flex bg-white border border-light-w rounded shadow-md p-1 mt-1">
          {options.slice(1).map(({ icon, className }) => (
            <button
              key={className}
              onClick={() => {
                onSelect(className)
                setIsOpen(false)
              }}
              className="w-full flex items-center justify-start gap-2 px-2 py-1 hover:bg-light-purple hover:text-bright-a rounded-sm"
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListStyleSelector