import { useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import './CustomEditor.css'
import CustomExtensionBulletList from './CustomExtensionBulletList'
import CustomExtensionOrderedList from './CustomExtensionOrderedList'
import ListStyleSelector from './ListStyleSelector'
import Placeholder from '@tiptap/extension-placeholder'
import { BoldIcon, ClearFormattingIcon, ItalicIcon, StrikeIcon, UnderlineIcon } from '../icons/TextTypeIcons'
import IconButton from './IconButton'
import { InsertImageIcon, InsertLinkIcon, InsertTableIcon } from '../icons/EditorInsertIcons'

const CustomEditor = ({ content, placeholder = '추가 설명', onChange }) => {
  const fileInputRef = useRef(null)

  const [isEditorFocused, setIsEditorFocused] = useState(false)
  const wrapperRef = useRef(null)

  const EDITOR_CLASS = [
    'edit-box',
    'min-h-[30px] text-[15px] p-1 bg-bright-a relative z-100',
    `${isEditorFocused ? 'border-b border-b-point border-b-2' : 'border-b border-b-transparent hover:border-b-gray-300'}` ,
    'focus:outline-none'
  ].join(' ')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
        bulletList: false,
        orderedList: false,
      }),
      Placeholder.configure({
        placeholder: placeholder,
        showOnlyWhenEditable: true,
        showOnlyCurrent:false
      }),
      CustomExtensionBulletList,
      CustomExtensionOrderedList,
      Link, Underline,
      Table.configure({ resizable: true }),
      TableRow, TableCell, TableHeader,
      Image.configure({ inline: false, allowBase64: true })
    ],
    content: content,
    editorProps: {
      attributes: {
        class: EDITOR_CLASS,
      }
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  const insertImage = file => {
    const reader = new FileReader()
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run()
    }
    reader.readAsDataURL(file)
  }

  const TEXT_STYLES = [
    { icon: <BoldIcon />, action: () => editor.chain().focus().toggleBold().run() },
    { icon: <ItalicIcon />, action: () => editor.chain().focus().toggleItalic().run() },
    { icon: <UnderlineIcon />, action: () => editor.chain().focus().toggleUnderline().run() },
    { icon: <StrikeIcon />, action: () => editor.chain().focus().toggleStrike().run() },
    { icon: <ClearFormattingIcon />, action: () => editor.chain().focus().unsetAllMarks().run() },
  ]

  const handleListSelect = (listType='bulletList', className) => {
    const currentClass = editor.getAttributes(listType)?.class

    // INFO : 처음 선택했는지 || 현재 선택한 클래스와 동일한지
    if (!currentClass || currentClass === className){
      listType === 'bulletList' ?
      editor.chain().focus().toggleBulletList().run() : 
      editor.chain().focus().toggleOrderedList().run()
    } 
      
    editor.commands.updateAttributes(listType, { class: className })
  }

  return (
    <div 
      ref={wrapperRef}
      className={`relative transition-all duration-150 ${isEditorFocused ? 'mb-10': 'mb-6'}`}
      tabIndex={0}
      onFocus={() => setIsEditorFocused(true)}
      onBlur={e => {
        // 내부 요소 클릭 시 blur 방지
        if (!wrapperRef.current.contains(e.relatedTarget)) {
          setIsEditorFocused(false)
        }
      }}>
      {/* 에디터 본문 */}
      <EditorContent editor={editor} /> 

      <div className={`transition-all duration-250 absolute
        ${isEditorFocused ? 'top-[100%]' : 'top-0'} 
        flex flex-wrap gap-2 items-center rounded px-1 py-1 bg-gray-50`}>
        {/* 텍스트 스타일 그룹 */}

        <div className="flex gap-2 items-center">
          {TEXT_STYLES.map(({ icon, action }, idx) => (
            <IconButton key={idx} onClick={action}>
              {icon}
            </IconButton>
          ))}
        </div>
        
        <div className="mx-1 border-l border-l-silver h-4" />
        
        {/* 리스트 그룹 */}
        <ListStyleSelector type="bullet" onSelect={className => handleListSelect('bulletList', className)} />
        <ListStyleSelector type="ordered" onSelect={className => handleListSelect('orderedList', className)} />

        <div className="mx-1 border-l border-l-silver h-4" />

        {/* 삽입 그룹 */}
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <InsertTableIcon />
        </button>
        <button onClick={() => fileInputRef.current?.click()}>
          <InsertImageIcon />
        </button>
        <button onClick={() => {
          const url = prompt('URL을 입력하세요')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}>
          <InsertLinkIcon />
        </button>

        {/* 숨겨진 이미지 업로드 input */}
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef}
          onChange={e => e.target.files && insertImage(e.target.files[0])} />
      </div>

      
    </div>
  )
}

export default CustomEditor
