'use client'

import { useState } from "react"
import ImgBox from "@/components/ImgBox"
import darkScreen from '@/assets/dark-screen.jpg'
import whiteScreen from '@/assets/white-screen.jpg'

const CONTENT = {
  title: '작업 환경에 맞춰 자유롭게 모드를 선택하세요.',
  description: '핀을 좌우로 움직여보세요!'
}

function DetailSection () {

  const [percent, setPercent] = useState(50)

  const changePercent = (e) => {
    setPercent(e.target.value)
  }

  return (
  <section className="h-fit py-5 text-[#333]">
    <div className="max-w-main-wrap mx-auto auto-show">
      <h2 className="text-3xl">
        {CONTENT.title}
        <span className="ml-2.5 text-base">{CONTENT.description}</span>
      </h2>

      <input 
        className={`pk-slider pt-10 w-full h-[6px] 
        rounded-lg appearance-none cursor-pointer
        relative top-1
        `}

        type="range" onChange={changePercent} max={100} min={0} value={percent}/>

      <div className="relative w-main-wrap left-0">
        <ImgBox 
          className={'w-full h-auto rounded-2xl'}
          src={whiteScreen.src} alt="라이트 모드"
        />

        <div className={`absolute top-0 left-0 rounded-2xl overflow-hidden`}
          style={{width: `${percent}%`}}
        >
          <ImgBox 
            className={'w-main-wrap'}
            src={darkScreen.src} alt="다크 모드"
          />
        </div>
      </div>
    </div>
  </section>
  )
}

export default DetailSection