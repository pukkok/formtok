import ModalCancelButton from "@/components/Modal/ModalCancelButton.style"
import ModalConfirmButton from "@/components/Modal/ModalConfirmButton.style"

const MoveToLoginPageModal = ({ onClose, onConfirm }) => {

  return (
    <div className="min-w-xs p-5 dark:bg-dark-base bg-light-w dark:text-bright-a border-point rounded-xl border-2">
      <h5 className="font-bold text-lg pb-8 border-b border-b-gray-300">
        로그인 후 이용 가능합니다. <br />
        로그인 페이지로 이동하시겠습니까?
      </h5>
      <div className="flex justify-end gap-2 pt-2">
        <ModalCancelButton onClick={onClose}/>
        <ModalConfirmButton onClick={onConfirm}/>
      </div>
    </div>
  )
}

export default MoveToLoginPageModal