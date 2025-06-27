'use client'

import { useRef } from "react"
import { InsertImageIcon, InsertLinkIcon } from '../icons/EditorInsertIcons'
import IconButton from "./IconButton"
import LinkModal from "./LinkModal"
import ImageModal from "./ImageModal"
import ModalContainer from "../Modal/ModalContainer"

const InsertGroup = ({ editor }) => {
  
  const linkModalRef = useRef(null)
  const imageModalRef = useRef(null)

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
        <IconButton onClick={() => imageModalRef.current?.open()}>
          <InsertImageIcon />
        </IconButton>
        <IconButton onClick={() => linkModalRef.current?.open()}>
          <InsertLinkIcon />
        </IconButton>
      </div>

      <ModalContainer ref={imageModalRef}>
        <ImageModal 
          onConfirm={(file, width, height) => {
            handleImageConfirm(file, width, height)
          }}
        />
      </ModalContainer>

      <ModalContainer ref={linkModalRef}>
        <LinkModal
          onConfirm={(url) => {
            handleLinkConfirm(url)
          }}
        />
      </ModalContainer>

    </>
  )
}

export default InsertGroup
