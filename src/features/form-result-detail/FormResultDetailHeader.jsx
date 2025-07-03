import { useFormManageStore } from "@/stores/useFormManageStore"
import { toast } from "sonner"

const FormResultDetailHeader = () => {
    
    const resultTitle = useFormManageStore(s => s.resultTitle)

    const readyMsg = () => {
      toast.error('준비중입니다.')
    }

    return (
      <header className={`sticky top-0 w-full flex items-center h-15 px-5 z-300
      dark:bg-dark-deep bg-bright-a
      border-b dark:border-b-dark-line-base border-b-gray-300
      `}>
        <h4 className="text-lg mr-auto pl-2 p-1 ">{resultTitle}</h4>
        <button 
          className="dark:bg-dark-elevated bg-gray-300 ml-2.5 px-2.5 py-1.5 font-bold rounded-md cursor-pointer"
          onClick={readyMsg}>종합 결과</button>
        <button 
          className="dark:bg-dark-elevated bg-gray-300 ml-2.5 px-2.5 py-1.5 font-bold rounded-md cursor-pointer"
          onClick={readyMsg}>참여자별 결과</button>
        <button 
          className="bg-point hover:bg-point-hover dark:hover:bg-dark-point-hover ml-2.5 px-2.5 py-1.5 font-bold text-light-w rounded-md cursor-pointer"
          onClick={readyMsg}>결과 저장</button>        
      </header>
    )
}

export default FormResultDetailHeader