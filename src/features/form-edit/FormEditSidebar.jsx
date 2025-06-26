import { useState } from "react"
import EditNav from "./components/right-sidebar/EditNav"
import FormSummary from "./components/right-sidebar/FormSummary"
import FormOption from "./components/right-sidebar/FormOption"

const EDIT_NAVS = [
  {id: 'tab-a', title: '전체문항', items: []},
  {id: 'tab-b', title: '설문 설정', items: []}
]

const FormEditSidebar = () => {
  const [selected, setSelected] = useState(EDIT_NAVS[0].id)

  return (
    <div className="sticky top-0 w-sm h-screen flex flex-col border-l border-l-gray-300 bg-bright-a">
      <EditNav 
        navs={EDIT_NAVS}
        selected={selected}
        setSelected={setSelected}
      />
      <div>
        {selected === 'tab-a' && <FormSummary />}
        {selected === 'tab-b' && <FormOption />}
      </div>
    </div>
  )
}

export default FormEditSidebar