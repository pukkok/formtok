import { useEffect, useRef, useState } from "react"
import ModalConfirmButton from "../Modal/ModalConfirmButton.style"
import ModalCancelButton from "../Modal/ModalCancelButton.style"

const LinkModal = ({ onClose, onConfirm }) => {
  const [url, setUrl] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    setUrl('')
    inputRef.current?.focus()
  }, [])

  return (
    <form 
      className="p-5 min-w-[500px] rounded-xl border-2 border-point dark:bg-dark-base bg-light-w dark:text-bright-a"
      onSubmit={(e) => {
        e.preventDefault()
        if(onConfirm) onConfirm(url)
        onClose()
      }}
    >
      <h2 className="text-lg mb-2 font-semibold">링크 입력</h2>
      <input
        ref={inputRef}
        type="text"
        className="w-full p-2 border dark:border-dark-line-hover rounded"
        placeholder="URL을 입력하세요"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />

      <div className="mt-4 flex justify-end gap-2">
        <ModalCancelButton onClick={onClose} />
        <ModalConfirmButton />
      </div>
    </form>
  )
}

export default LinkModal