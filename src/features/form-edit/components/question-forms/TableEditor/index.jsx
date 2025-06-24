import React, { useEffect, useRef, useState } from "react"
import TablePreviewModal from "./TablePreviewModal"
import { useFormEditStore } from "@/stores/useFormEditStore"
import TableLabelInput from "./TableLabelInput"
import AddRowColButton from "./AddRowColButton"
import ModalContainer from "@/components/ModalContainer"

const TableEditor = ({ pages, pi, qi }) => {
  const [start, setStart] = useState(true)
  const rows = pages[pi].questions[qi].tableRows
  const cols = pages[pi].questions[qi].tableCols

  const tablePreviewModalRef = useRef(null)

  const initialTable = useFormEditStore(s => s.initialTable)

  useEffect(() => {
    if (start) {
      setStart(false)
      initialTable(pi, qi)
    }
  }, [start, pi, qi, initialTable]) // initialTable을 의존성 배열에 추가

  return (
    <div className="mt-[15px]"> {/* 전체 컨테이너 */}
      
      {/* 표 미리보기 버튼 (가운데 정렬) */}
      <div className="text-center mb-5"> {/* 하단 여백 추가 */}
        <button
          onClick={() => tablePreviewModalRef.current?.open()}
          className="px-4 py-2 rounded-lg font-bold hover:bg-[var(--pk-charcoal)] text-lg" // 버튼 크기 및 폰트 조정
        >
          표 미리보기
        </button>
      </div>

      {/* 행/열 편집 섹션 (Flexbox 사용) */}
      <div className="flex flex-col md:flex-row gap-x-5 gap-y-5 justify-center items-start"> {/* 모바일/데스크탑 반응형 flex */}
        
        {/* 행 편집 영역 */}
        <div className="w-full md:w-1/2"> {/* 너비를 조정하여 두 섹션이 나란히 오도록 */}
          <AddRowColButton
            type="row" pi={pi} qi={qi}
            buttonText="행 추가"
          />
          {rows.length > 0 &&
            rows.map((row, idx) => (
              <TableLabelInput 
                key={row.id}
                item={row}
                type="row"
                pi={pi} qi={qi}
                isDeletable={rows.length > 2}
                placeholderPrefix="행"
                idx={idx}
              />
            ))}
        </div>

        {/* 열 편집 영역 */}
        <div className="w-full md:w-1/2"> {/* 너비를 조정하여 두 섹션이 나란히 오도록 */}
          <AddRowColButton
            type="col" pi={pi} qi={qi}
            buttonText="열 추가"
          />
          {cols.length > 0 &&
            cols.map((col, idx) => (
              <TableLabelInput 
                key={col.id}
                item={col}
                type="col"
                pi={pi} qi={qi}
                isDeletable={cols.length > 2}
                placeholderPrefix="열"
                idx={idx}
              />
            ))}
        </div>
      </div>

      <ModalContainer ref={tablePreviewModalRef}>
        <TablePreviewModal 
          rows={rows} 
          cols={cols} 
        />
      </ModalContainer>
    </div>
  )
}

export default TableEditor