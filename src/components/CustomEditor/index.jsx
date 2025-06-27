import { useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import './CustomEditor.css'
import CustomExtensionBulletList from './CustomExtensionBulletList'
import CustomExtensionOrderedList from './CustomExtensionOrderedList'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyleSelector from './TextStyleSelector'
import ListStyleSelector from './ListStyleSelector'
import InsertGroup from './InsertGroup'
import CustomExtensionImage from './CustomExtensionImage'
import CustomExtensionParagraph from './CustomExtensionParagraph'
import AlignGroup from './AlignGroup'

const CustomEditor = ({ content, placeholder = '추가 설명', onChange }) => {

  const [isEditorFocused, setIsEditorFocused] = useState(false)
  const wrapperRef = useRef(null)

  const EDITOR_CLASS = [
    'edit-box',
    'min-h-[30px] text-[15px] p-1 mt-3 relative z-1',
    'dark:bg-dark-surface dark:text-[#DDD] bg-bright-a',
    `${isEditorFocused ? 'border-b border-b-point border-b-2' : 'border-b border-b-transparent hover:border-b-gray-300 dark:hover:border-b-dark-line-hover'}` ,
    'focus:outline-none'
  ].join(' ')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        history: false,
        bulletList: false,
        orderedList: false,
        image: false,
      }),
      Placeholder.configure({
        placeholder: placeholder,
        showOnlyWhenEditable: true,
        showOnlyCurrent:false
      }),
      CustomExtensionParagraph,
      CustomExtensionImage,
      CustomExtensionBulletList,
      CustomExtensionOrderedList,
      Link, Underline,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: EDITOR_CLASS,
      }
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

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
      className={`relative transition-all outline-none duration-150 ${isEditorFocused ? 'z-10 mb-18': 'mb-6'}`}
      tabIndex={-1}
      onFocus={() => setIsEditorFocused(true)}
      onBlur={e => {
        // 내부 요소 클릭 시 blur 방지
        if (!wrapperRef.current.contains(e.relatedTarget)) {
          setIsEditorFocused(false)
        }
      }}>
      {/* 에디터 본문 */}
      <EditorContent editor={editor} /> 

      {editor && // INFO : 에디터가 생성된 후에 로드
      <div className={`transition-all duration-250 absolute
        ${isEditorFocused ? 'top-[100%]' : 'top-0 opacity-0'}
        flex flex-wrap gap-2 items-center rounded px-1 py-1 dark:bg-dark-surface dark:text-bright-a bg-gray-50`}>
        {/* 텍스트 스타일 그룹 */}
        <TextStyleSelector editor={editor} />
        <div className="mx-1 border-l border-l-silver h-4" />
        {/* 정렬 그룹 */}
        <AlignGroup editor={editor}/>
        <div className="mx-1 border-l border-l-silver h-4" />
        {/* 리스트 그룹 */}
        <ListStyleSelector editor={editor} type="bulletList" onSelect={className => handleListSelect('bulletList', className)} />
        <ListStyleSelector editor={editor} type="orderedList" onSelect={className => handleListSelect('orderedList', className)} />
        <div className="mx-1 border-l border-l-silver h-4" />
        {/* 삽입 그룹 */}
        <InsertGroup editor={editor}/>
      </div>}

    </div>
  )
}

export default CustomEditor
