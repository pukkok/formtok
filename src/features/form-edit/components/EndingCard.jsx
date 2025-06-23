'use client'

import React from "react"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import CustomEditor from "../../../components/CustomEditor"

const EndingCard = () => {
  const endingMent = useFormEditStore(s => s.endingMent)
  const setEndingMent = useFormEditStore(s => s.setEndingMent)

  const activeCard = useFormEditUiStore(s => s.activeCard)
  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)

  const changeEndingTitle = (e) => {
    setEndingMent({ ...endingMent, title: e.target.value })
  }

  const changeEndingDescription = (html) => {
    setEndingMent({...endingMent, description : html })
  }

  return (
    <div
      onClick={() => setActiveCard("end")}
      className={`
        border-2 border-lgiht-w bg-bright-a rounded-xl min-h-45 mb-4 text-black 
        ${activeCard === "end" ? "border-point-hover" : "border-light-w"} 
      `}
    >
      <h4 className={`px-5 py-2.5 rounded-t-lg
        bg-light-purple text-light-w w-full font-bold mb-2.5`}>
        엔딩 메세지
      </h4>

      <div className="px-5 py-2.5">
        <input
          className="pl-0.5 w-full pb-1 text-lg
          border-b border-b-transparent hover:border-b-silver 
          focus:border-b-point-hover focus:border-b-2"
          value={endingMent?.title || ""}
          placeholder="응답해 주셔서 감사합니다."
          onChange={changeEndingTitle}
        />

        <CustomEditor placeholder={'추가 설명'} onChange={changeEndingDescription}/>
      </div>
    </div>
  )
}

export default EndingCard
