const TextBox = ({ values = [], qid }) => {
  if (values.length === 0) {
    return <p className="px-2 py-1 text-sm text-gray-400">응답이 없습니다.</p>
  }

  return (
    <div className="dark:bg-dark-hover bg-bright-c rounded-lg p-2 space-y-1">
      {values.map((answer, idx) => (
        <div className="px-2 py-1 flex items-start gap-2" key={`${qid}-${idx}`}>
          <p className="shrink-0 text-sm dark:text-gray-400 text-gray-600">참여 {idx + 1} |</p>
          <div
            className="text-sm break-words"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      ))}
    </div>
  )
}

export default TextBox