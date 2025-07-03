const ExtraBox = ({ extras }) => {
  return (
    <details className="border-t dark:border-dark-line-base border-gray-300 mt-4">
      <summary className="cursor-pointer py-1 text-sm text-gray-700 dark:text-gray-300">
        기타 의견 보기
      </summary>
      <div className="dark:bg-dark-hover bg-bright-c rounded-lg p-2 space-y-2 mt-2">
        {extras.map((extra, idx) => (
          <div key={idx} className="px-2 py-1 flex gap-2 text-sm break-words">
            <span className="shrink-0 text-gray-600 dark:text-gray-400">의견 {idx + 1} |</span> 
            <span>{extra}</span>
          </div>
        ))}
      </div>
    </details>
  )
}

export default ExtraBox