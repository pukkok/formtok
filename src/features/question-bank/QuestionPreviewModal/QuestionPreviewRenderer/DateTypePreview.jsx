const swtichByType = (questionType) => {
  switch (questionType) {
    case '날짜' : return 'date'
    case '시간' : return 'time'
    case '날짜 + 시간' : return 'datetime-local'
    default : return 'date'
  }
}

const getDefaultValue = (questionType, isStart) => {
  if (questionType === '날짜') {
    // ISO 날짜 포맷 'YYYY-MM-DD'
    return isStart ? '2025-07-11' : '2025-07-20'
  }
  if (questionType === '시간') {
    // 시간 포맷 'HH:MM'
    return isStart ? '09:00' : '18:00'
  }
  if (questionType === '날짜 + 시간') {
    // ISO 날짜+시간 포맷 'YYYY-MM-DDTHH:MM'
    return isStart ? '2025-07-11T09:00' : '2025-08-11T18:00'
  }
  return ''
}

const DateTypePreview = ({ questionType, setPeriod }) => {
  const type = swtichByType(questionType)

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-fit h-10 px-2.5 py-2 rounded-xl bg-light-w dark:bg-dark-elevated">
        <input 
          className="calendar-indicator-filter" 
          type={type} 
          disabled 
          value={getDefaultValue(questionType, true)}
        />
      </div>
      {setPeriod && (
        <>
          <span>~</span>
          <div className="w-fit h-10 px-2.5 py-2 rounded-xl bg-light-w dark:bg-dark-elevated">
            <input 
              className="calendar-indicator-filter" 
              type={type} 
              disabled 
              value={getDefaultValue(questionType, false)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default DateTypePreview
