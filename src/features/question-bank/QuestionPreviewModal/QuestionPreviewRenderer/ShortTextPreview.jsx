const ShortTextPreview = ({ content = '' }) => {
  return (
    <div className="w-full h-10 py-2 px-2.5 rounded-xl bg-light-w dark:bg-dark-elevated text-gray-500 border border-dashed flex items-center">
      {content || '단답형 입력 예시'}
    </div>
  )
}

export default ShortTextPreview