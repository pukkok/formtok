import { useEffect, useRef, useState } from "react"

const ImageModal = ({ onClose, onConfirm }) => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [width, setWidth] = useState('100%')  // 기본 100%
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }, [file])

  useEffect(() => {
    setFile(null)
    setPreview('')
    setWidth('100%')  // 모달 열 때 기본값 초기화
  }, [])

  return (
    <form 
      className="p-5 min-w-[500px] rounded-xl border-2 border-point dark:bg-deep-dark bg-light-w"
      onSubmit={e => {
        e.preventDefault()
        if (file && onConfirm) onConfirm(file, width)
        onClose()
      }}
    >
      <h2 className="text-lg mb-2 font-semibold">이미지 삽입</h2>

      {/* 파일 선택 커스텀 버튼 */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mb-4 px-4 py-2 bg-point text-light-w rounded hover:bg-point-hover"
      >
        이미지 선택
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          e.stopPropagation()
          const selectedFile = e.target.files?.[0]
          if(selectedFile) setFile(selectedFile)
        }}
      />

      {preview && (
        <div className="mb-4">
          <img src={preview} alt="preview" className="max-h-40 mb-2 rounded border" />
          <div className="flex gap-2">
            {['25%', '50%', '75%', '100%'].map((per) => (
              <button
                key={per}
                type="button"
                onClick={() => setWidth(per)}
                className={`px-3 py-1 rounded border ${width === per ? 'bg-point text-light-w border-point' : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}
              >
                {per}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-light-w font-bold bg-gray-500 hover:bg-gray-400"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!file}
          className="rounded-lg px-3 py-2 text-light-w font-bold bg-point hover:bg-point-hover"
        >
          확인
        </button>
      </div>
    </form>
  )
}

export default ImageModal
