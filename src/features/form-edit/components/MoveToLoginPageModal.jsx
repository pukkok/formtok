const MoveToLoginPageModal = ({ onClose, onConfirm }) => {

  return (
    <div className="min-w-xs p-5 dark:bg-deep-dark bg-light-w border-point rounded-xl border-2">
      <h5 className="font-bold pb-8 border-b border-b-gray-300">
        로그인 후 이용 가능합니다. <br />
        로그인 페이지로 이동하시겠습니까?
      </h5>
      <div className="flex justify-end gap-2 pt-2">
        <button className="px-3 py-1.5 bg-red-400 hover:bg-red-500 text-bright-a rounded-lg cursor-pointer"
          onClick={onClose}
        >아니요</button>
        <button className="px-3 py-1.5 bg-point-hover hover:bg-point text-bright-a rounded-lg cursor-pointer"
          onClick={onConfirm}
        >예</button>
      </div>
    </div>
  )
}

export default MoveToLoginPageModal