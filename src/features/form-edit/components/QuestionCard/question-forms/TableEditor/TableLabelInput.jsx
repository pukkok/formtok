// TableDimensionItem.js
import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { useFormEditStore } from '@/stores/useFormEditStore'

const TableLabelInput = ({ item, type, pi, qi, isDeletable, placeholderPrefix, idx }) => {
  const updateTableValue = useFormEditStore(s => s.updateTableValue)
  const deleteTableRowOrCol = useFormEditStore(s => s.deleteTableRowOrCol)

  return (
    <div
      key={item.id}
      className="flex w-full h-10 px-2.5 py-2.5 rounded-xl dark:bg-dark-elevated bg-light-w mt-2 relative group"
    >
      <input
        className="w-full outline-none bg-transparent"
        onChange={e => updateTableValue(pi, qi, item.id, e.target.value, type)}
        placeholder={`${idx + 1} ${placeholderPrefix}`}
        value={item.value}
      />
      {isDeletable && (
        <button
          onClick={() => deleteTableRowOrCol(pi, qi, item.id, type)}
          className="absolute right-2 top-2 hidden group-hover:block"
        >
          <IoIosClose className="text-[20px]" strokeWidth={2.3} />
        </button>
      )}
    </div>
  )
}

export default TableLabelInput