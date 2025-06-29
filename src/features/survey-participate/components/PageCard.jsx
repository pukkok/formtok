import CustomEditor from "@/components/CustomEditor"

const PageCard = ({ pageCnt, title, description }) => {

  return (
    <div className="border-2 border-lgiht-w 
          dark:bg-dark-surface bg-bright-a rounded-xl min-h-30 mb-4 text-black
          dark:border-dark-line-base border-light-w">
      <h4 className="px-5 py-2.5 rounded-t-lg
          dark:bg-dark-elevated bg-light-purple
          text-light-w w-full font-bold mb-2.5">{pageCnt} 페이지</h4>

      <div className="px-5 py-2.5">
        <p className="pl-0.5 w-full pb-1 text-2xl dark:text-bright-a">{title || '제목없는 페이지'}</p>
        {description && <CustomEditor content={description} readOnly={true}/>}
      </div>

    </div>
  )
}

export default PageCard