import Dropdown from "@/components/Dropdown"
import { useFormEditStore } from "@/stores/useFormEditStore"

const LIST_STYLES = [
  {style: 'N', text : '1. 2. 3.'}, 
  {style: 'Q', text : 'Q. Q. Q.'}, 
  {style: 'QN', text: 'Q1. Q2. Q3.'}, 
  {style: null, text: '없음'}
]

const FormListStyleSelector = () => {

  const listStyle = useFormEditStore(s => s.listStyle)
  const setListStyle = useFormEditStore(s => s.setListStyle)

  const getListStylePreview = (style) => {
    switch (style) {
      case 'N': return '1. 2. 3.'
      case 'Q': return 'Q. Q. Q.'
      case 'QN': return 'Q1. Q2. Q3.'
      default: return '없음'
    }
  }

  return (
    <div className="mb-4.5">
      <h4 className="pt-2.5 mb-4 text-[15px] font-extrabold">문항스타일</h4>
      <Dropdown initialItem={getListStylePreview(listStyle)}>
        {LIST_STYLES.map(item => {
          return (
            <button 
              onClick={()=>setListStyle(item.style)}
              className="w-full pr-1 py-2 rounded-md text-left"
              key={item.text}
            >{item.text}
            </button>
          )
        })}
      </Dropdown>
    </div>
  )
}

export default FormListStyleSelector