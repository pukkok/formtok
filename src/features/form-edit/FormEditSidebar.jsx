import { useState } from "react"
import EditNav from "./components/right-sidebar/EditNav"
import FormSummary from "./components/right-sidebar/FormSummary"

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
      <div className="flex-1">
        {selected === 'tab-a' && <FormSummary />}
        {selected === 'tab-b' && <></>}
      </div>
    </div>
  )
}

export default FormEditSidebar