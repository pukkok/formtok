'use client'

import { useRef, useState } from "react"
import { InsertImageIcon, InsertLinkIcon } from '../icons/EditorInsertIcons'
import IconButton from "./IconButton"
import LinkModal from "./LinkModal"
import ImageModal from "./ImageModal"

const InsertGroup = ({ editor }) => {
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)

  const handleImageConfirm = (file, width, height) => {
    const reader = new FileReader()
    reader.onload = () => {
      editor.chain().focus().setImage({
        src: reader.result,
        ...(width && { width }),
        ...(height && { height })
      }).run()
    }
    reader.readAsDataURL(file)
  }

  const handleLinkConfirm = (url) => {
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <>
      <div className="flex gap-1 items-center">
        <IconButton onClick={() => setIsImageOpen(true)}>
          <InsertImageIcon />
        </IconButton>
        <IconButton onClick={() => setIsLinkOpen(true)}>
          <InsertLinkIcon />
        </IconButton>
      </div>

      <ImageModal 
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        onConfirm={(file, width, height) => {
          handleImageConfirm(file, width, height)
          setIsImageOpen(false)
        }}
      />

      <LinkModal
        isOpen={isLinkOpen}
        onClose={() => setIsLinkOpen(false)}
        onConfirm={(url) => {
          handleLinkConfirm(url)
          setIsLinkOpen(false)
        }}
      />
    </>
  )
}

export default InsertGroup
