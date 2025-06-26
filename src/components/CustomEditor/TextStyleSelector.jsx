import IconButton from './IconButton'
import { BoldIcon, ClearFormattingIcon, ItalicIcon, StrikeIcon, UnderlineIcon } from '../icons/TextTypeIcons'


const TextStyleSelector = ({ editor }) => {
  
  const TEXT_STYLES = [
    { mark: 'bold', icon: <BoldIcon />, action: () => editor.chain().focus().toggleBold().run() },
    { mark: 'italic', icon: <ItalicIcon />, action: () => editor.chain().focus().toggleItalic().run() },
    { mark: 'underline', icon: <UnderlineIcon />, action: () => editor.chain().focus().toggleUnderline().run() },
    { mark: 'strike', icon: <StrikeIcon />, action: () => editor.chain().focus().toggleStrike().run() },
    { mark: null, icon: <ClearFormattingIcon />, action: () => editor.chain().focus().unsetAllMarks().run() },
  ]

  return(
    <div className="flex gap-1 items-center">
      {TEXT_STYLES.map(({ mark, icon, action }, idx) => (
        <IconButton key={idx} onClick={action} isActive={mark && editor.isActive(mark)}>
          {icon}
        </IconButton>
      ))}
    </div>
  )
}

export default TextStyleSelector