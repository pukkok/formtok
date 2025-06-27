'use client'

import { useScreenStore } from "@/stores/useScreenStore"

const DateInput = ({ style }) => {
  const mode = useScreenStore(s => s.mode)
  const changeStyleToType = (style) => {
    switch (style) {
      case '날짜': return 'date'
      case '시간': return 'time'
      case '날짜 + 시간': return 'datetime-local'
      default: return 'date'
    }
  }

  return (
    <input type={changeStyleToType(style)} 
      className={`
        w-fit h-10 px-2.5 py-2 rounded-xl 
      bg-light-w focus:outline-none dark:bg-dark-elevated 
        ${mode === 'dark' ? 'calendar-indicator-filter' : ''} 
    `}/>
  )
}

const DateTypeInput = ({ style, setPeriod = false }) => {

  return (
    <div className="mt-[15px] flex items-center gap-[10px]">
      <div>
        <DateInput style={style}/>
      </div>
      {setPeriod && <>
        <span>~</span>
        <div>
          <DateInput style={style}/>
        </div>
      </>}
    </div>
  )
}

export default DateTypeInput
