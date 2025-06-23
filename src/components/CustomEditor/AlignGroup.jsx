'use client'

import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from '@/components/icons/AlignIcons'
import IconButton from './IconButton'

const iconsMap = {
  left: <AlignLeftIcon />,
  center: <AlignCenterIcon />,
  right: <AlignRightIcon />,
}

const AlignGroup = ({ editor }) => {
  if (!editor) return null

  // 현재 커서 위치의 노드에서 class 값을 가져옴
  const selection = editor.state.selection
  let currentClass = null

  if (selection.node) {
    // NodeSelection (예: 이미지 클릭 시)
    currentClass = selection.node.attrs?.class || null
  } else {
    // TextSelection (텍스트/문단 등)
    const node = selection.$from.node()
    currentClass = node.attrs?.class || null
  }

  const handleChange = (align) => {
    editor.chain().focus().command(({ tr }) => {
      const { from, to } = editor.state.selection
      tr.doc.nodesBetween(from, to, (node, pos) => {
        if (['paragraph', 'listItem', 'image'].includes(node.type.name)) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            class: align,
          })
        }
      })
      return true
    }).run()
  }

  const isActive = (align) => {
    if (!currentClass && align === 'left') return true   // 기본: class 없으면 왼쪽 정렬
    return currentClass === align                        // 나머진 명시적 class만 체크
  }

  return (
    <div className="flex gap-1">
      {['left', 'center', 'right'].map((align) => (
        <IconButton
          key={align}
          type="button"
          onClick={() => handleChange(align)}
          aria-label={`${align} 정렬`}
          isActive={isActive(align)}
        >
          {iconsMap[align]}
        </IconButton>
      ))}
    </div>
  )
}

export default AlignGroup
