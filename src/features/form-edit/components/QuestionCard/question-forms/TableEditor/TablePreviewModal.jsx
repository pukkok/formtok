const TablePreviewModal = ({ onClose, rows, cols}) => {
  
  return (
    <div
      className={`
        dark:bg-dark-deep bg-bright-a
        min-w-lg mx-auto p-5 rounded-lg shadow-lg border-none`}
    >
      <div className="flex justify-end mb-2">
        <button
          onClick={onClose}
          className="px-2 py-1 bg-red-600 text-white rounded cursor-pointer"
        >
          닫기
        </button>
      </div>
      
      <div className="max-w-[90vw] max-h-[50vh] overflow-scroll pb-2 pr-2">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="min-w-20 border border-gray-300 px-2 py-1 bg-light-w dark:border-dark-line-hover dark:bg-dark-hover"></th>
            {cols.map((col, idx) => (
              <th
                key={col.id}
                className="min-w-20 
                border dark:border-dark-line-hover border-gray-300 
                px-2 py-1 bg-light-w  dark:bg-dark-hover dark:text-bright-a"
              >
                {col.value || `열 ${idx + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id}>
              <th className="border border-gray-300 px-2 py-1 bg-light-w dark:border-dark-line-hover dark:bg-dark-hover dark:text-bright-a">
                {row.value || `행 ${rowIndex + 1}`}
              </th>
              {cols.map((col, colIndex) => (
                <td key={`${row.id}-${col.id}`} className="border border-gray-300 bg-bright-a px-2 py-1 dark:border-dark-line-hover dark:bg-dark-elevated dark:text-bright-a">
                  <button className="w-full">{`${rowIndex + 1},${colIndex + 1}`}</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default TablePreviewModal
