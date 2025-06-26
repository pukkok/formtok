const UnSavedAlertModal = ({ onClose, onConfirm }) => {

  return (
    <div className="min-w-xs p-5 dark:bg-deep-dark bg-light-w text-black border-point rounded-xl border-2">
      <h5 className="font-bold pb-8 border-b border-b-gray-300">
        작성중 변경된 사항이 있습니다. <br />
        저장하지 않고 나가시겠습니까?
      </h5>
      <div className="flex justify-end gap-2 pt-2">
        <button className="px-3 py-1.5 bg-red-400 hover:bg-red-500 text-bright-a rounded-lg cursor-pointer"
          onClick={() => {
            window.history.pushState(null, '', window.location.href)
            onClose()
          }}
        >아니요</button>
        <button className="px-3 py-1.5 bg-point-hover hover:bg-point text-bright-a rounded-lg cursor-pointer"
          onClick={onConfirm}
        >예</button>
      </div>
    </div>
  )
}

export default UnSavedAlertModal