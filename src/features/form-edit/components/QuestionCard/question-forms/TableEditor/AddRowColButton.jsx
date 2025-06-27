// AddDimensionButton.js
import React from 'react'
import { useFormEditStore } from '@/stores/useFormEditStore'
import { RowColIcon } from '@/A-Components/Icons/CustomIcons'

const AddRowColButton = ({ type, pi, qi, buttonText }) => {
  const addTableRowOrCol = useFormEditStore(s => s.addTableRowOrCol)

  return (
    <button
      onClick={() => addTableRowOrCol(pi, qi, type)}
      className="px-1.5 py-1 rounded-lg flex items-center gap-1 font-extrabold text-light-purple cursor-pointer"
    >
      <RowColIcon rowOrCol={type}/>
      {buttonText}
    </button>
  )
}

export default AddRowColButton