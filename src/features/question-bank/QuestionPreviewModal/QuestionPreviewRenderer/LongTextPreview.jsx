const LongTextPreview = ({ content = '' }) => {
  return (
    <div
      className="content-div w-full h-20 py-2 px-2.5 rounded-xl bg-light-w dark:bg-dark-elevated text-gray-300 whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: content || '긴 텍스트 입력 예시입니다.' }}
    />
  )
}

export default LongTextPreview
