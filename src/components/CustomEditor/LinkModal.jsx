import { useEffect, useRef, useState } from "react"

const LinkModal = ({ onClose, onConfirm }) => {
  const [url, setUrl] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    setUrl('')
    inputRef.current?.focus()
  }, [])

  return (
    <form 
      className="p-5 min-w-[500px] rounded-xl border-2 border-point dark:bg-deep-dark bg-light-w"
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
        className="w-full p-2 border rounded"
        placeholder="URL을 입력하세요"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />

      <div className="mt-4 flex justify-end gap-2">
        <button 
          type="button"
          className="rounded-lg px-3 py-2 text-light-w font-bold bg-gray-500 hover:bg-gray-400 cursor-pointer" 
          onClick={onClose}
        >취소</button>
        <button
          type="submit"
          className="rounded-lg px-3 py-2 text-light-w font-bold bg-point hover:bg-point-hover cursor-pointer"
        >확인</button>
      </div>
    </form>
  )
}

export default LinkModal