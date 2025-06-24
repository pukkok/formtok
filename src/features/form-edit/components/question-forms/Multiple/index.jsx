import AddAnswer from "./AddAnswer"
import { useFormEditStore } from "@/stores/useFormEditStore"

const Multiple = ({style, pages, pi, qi}) => {

  const updateQuestion = useFormEditStore(s => s.updateQuestion)
  
  const addOption = useFormEditStore(s => s.addOption)
  const updateOption = useFormEditStore(s => s.updateOption)
  const deleteOption = useFormEditStore(s => s.deleteOption)

  return (
    <div className="mt-5">
      {pages[pi].questions[qi].options.map((option, oi) => {
        const { id, answer } = option
        return (
          <AddAnswer key={id} 
            placeholder={'옵션'+(oi+1)} value={answer} 
            inputChange={(e)=>updateOption(pi, qi, oi, {answer: e.target.value})} 
            buttonClick={()=>deleteOption(pi, qi, oi)}
            isNotUseBtn={pages[pi].questions[qi].options.length===1 && oi===0}
          />
        )
      })}
      {style !== '드롭다운' ? (
        <>
        {pages[pi].questions[qi].hasExtraOption && 
        <AddAnswer defaultValue={'기타'} disabled={true} 
        buttonClick={()=>updateQuestion(pi, qi, {hasExtraOption: false})}
        />}
        <div className="mt-5">
          <button className="px-2.5 py-1.5 rounded-xl font-bold bg-point text-bright-a mr-2.5 cursor-pointer" 
          onClick={()=> addOption(pi, qi)}
          >항목 추가</button>
          {!pages[pi].questions[qi].hasExtraOption && (
            <> 또는
              <button className="px-2.5 py-1.5 rounded-xl font-bold bg-gray-300 text-dark ml-2.5 cursor-pointer" 
              onClick={()=> updateQuestion(pi, qi, {hasExtraOption: true})}
              >'기타' 추가</button>
            </>)
          }
        </div>
        </> ) : (
        <div className="mt-5">
          <button 
            className="px-2.5 py-1.5 rounded-xl font-bold bg-point text-bright-a mr-2.5 cursor-pointer" 
            onClick={()=> addOption(pi, qi)}
          >항목 추가</button>
        </div>
        )
        }
    </div>
  )
}

export default Multiple