import ModalCancelButton from "@/components/Modal/ModalCancelButton.style"
import ModalConfirmButton from "@/components/Modal/ModalConfirmButton.style"

const UnSavedAlertModal = ({ onClose, onConfirm }) => {

  return (
    <div className="min-w-xs p-5 dark:bg-dark-base dark:text-bright-a bg-light-w text-black border-point dark:border-dark-point-hover rounded-xl border-2">
      <h5 className="font-bold text-lg pb-8 border-b border-b-gray-300">
        작성중 변경된 사항이 있습니다. <br />
        저장하지 않고 나가시겠습니까?
      </h5>
      <div className="flex justify-end gap-2 pt-3">
        <ModalCancelButton onClick={() => {
          window.history.pushState(null, '', window.location.href)
          onClose()
        }} />
        <ModalConfirmButton onClick={onConfirm} />
      </div>
    </div>
  )
}

export default UnSavedAlertModal