'use client'

const SearchFilter = ({ filters = [], filtering = null, colorMap, hoverMap, pick = 'all' }) => {

  return (
    <div className="flex gap-2 mt-4">
      {filters.map((filter) => {
        const { work, text } = filter
        const picked = pick === work

        const bgColor = picked ? colorMap[work] : 'bg-white dark:bg-dark-hover'
        const hoverColor = picked ? '' : hoverMap[work]

        return (
          <button 
            key={text}
            className={`
              ${picked ? 'text-white' : 'text-dark-deep dark:text-white'} ${bgColor} ${hoverColor}
              px-4 py-2 rounded-xl
              shadow-md cursor-pointer text-sm transition-[background-color_0.3s,color_0.3s]
              hover:text-white
            `}
            onClick={() => filtering(work)}
          >
            {text}
          </button>
        )
      })}
    </div>
  )
}

export default SearchFilter