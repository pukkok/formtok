import React, { useState } from 'react'
import styled from 'styled-components'

const StyledTableEditor = styled.div`

    table{
        width: 1240px;
        border-collapse: collapse;
        tbody{
            tr{
                display: flex;
                td{
                    flex: 1;
                }
            }
        }
    }


    button{
        color: #000;
    }
`

const TableEditor = () => {
  const [tableData, setTableData] = useState([
    [{ id: '1-1', content: 'A', colspan: 0, rowspan: 0 }, { id: '1-2', content: 'B', colspan: 0, rowspan: 0 }],
    [{ id: '2-1', content: 'C', colspan: 0, rowspan: 0 }, { id: '2-2', content: 'D', colspan: 0, rowspan: 0 }],
  ])

  const [selectedCells, setSelectedCells] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [splitDirection, setSplitDirection] = useState('horizontal')
  const [splitCount, setSplitCount] = useState(2)

  const handleMouseDown = (rowIdx, colIdx) => {
    setIsDragging(true)
    setDragStart({ row: rowIdx, col: colIdx })
    setSelectedCells([{ row: rowIdx, col: colIdx }])
  }

  const handleMouseOver = (rowIdx, colIdx) => {
    if (isDragging) {
      const newSelectedCells = getCellsInRange(dragStart, { row: rowIdx, col: colIdx })
      setSelectedCells(newSelectedCells)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getCellsInRange = (start, end) => {
    const cells = []
    for (let row = Math.min(start.row, end.row); row <= Math.max(start.row, end.row); row++) {
      for (let col = Math.min(start.col, end.col); col <= Math.max(start.col, end.col); col++) {
        cells.push({ row, col })
      }
    }
    return cells
  }

  const isCellSelected = (rowIdx, colIdx) => {
    return selectedCells.some((cell) => cell.row === rowIdx && cell.col === colIdx)
  }

  const mergeCells = () => {
    if (selectedCells.length > 1) {
      const start = selectedCells[0]
      const end = selectedCells[selectedCells.length - 1]
  
      const newTableData = [...tableData]
      const rowspan = Math.abs(end.row - start.row) + 1
      const colspan = Math.abs(end.col - start.col) + 1
  
      // 병합할 셀에 rowspan과 colspan 적용
      newTableData[start.row][start.col].rowspan = rowspan
      newTableData[start.row][start.col].colspan = colspan
  
      // 병합된 셀들 삭제
      for (let row = start.row; row <= end.row; row++) {
        for (let col = start.col; col <= end.col; col++) {
          if (row !== start.row || col !== start.col) {
            newTableData[row].splice(col, 1)  // 셀 제거
          }
        }
      }
  
      setTableData(newTableData)
      setSelectedCells([])  // 병합 후 선택 초기화
    }
  }

  const splitCells = () => {
    setShowDialog(true)// 분할 다이얼로그 표시
  }

  const handleConfirmSplit = () => {
    const newTableData = [...tableData]
  
    selectedCells.forEach(({ row, col }) => {
      const cell = newTableData[row][col]
  
      if (splitDirection === 'horizontal') {
        // 가로로 분할
        const newCells = Array(splitCount).fill(null).map((_, idx) => ({
          id: `${row}-${col}-${idx}`,
          content: cell.content,  // 셀 내용을 복사
          colspan: 1,  // 분할했으니 colspan을 1로 설정
          rowspan: cell.rowspan,
        }))
        
        // 선택된 셀을 가로로 나누고 새로 추가
        newTableData[row] = [
          ...newTableData[row].slice(0, col),
          ...newCells,
          ...newTableData[row].slice(col + 1),
        ]
  
        // 아래에 있는 셀들도 분할된 셀의 colspan에 맞게 크기 조정
        for (let r = row + 1; r < tableData.length; r++) {
          const belowCell = newTableData[r][col]
          if (belowCell) {
            belowCell.colspan = splitCount  // 아래 셀들의 colspan 맞추기
          }
        }
  
      } else if (splitDirection === 'vertical') {
        // 세로로 분할
        const newRows = []
        for (let i = 0; i < splitCount - 1; i++) {
          const newRow = [...newTableData[row]]
          newRow[col] = {
            id: `${row + i + 1}-${col}`,
            content: cell.content,  // 셀 내용을 복사
            colspan: cell.colspan,
            rowspan: 1,  // 세로로 분할하면 rowspan을 1로 설정
          }
          newRows.push(newRow)
        }
        
        // 새로운 행 추가
        newTableData.splice(row + 1, 0, ...newRows)
  
        // 기존 셀의 rowspan 조정
        newTableData[row][col].rowspan = splitCount
  
        // 오른쪽에 있는 셀들의 rowspan도 동일하게 맞춰야 함
        for (let c = col + 1; c < tableData[row].length; c++) {
          const rightCell = newTableData[row][c]
          if (rightCell) {
            rightCell.rowspan = splitCount  // 오른쪽 셀들의 rowspan 맞추기
          }
        }
      }
    })
  
    setTableData(newTableData)  // 테이블 데이터 업데이트
    setShowDialog(false)  // 다이얼로그 닫기
  }
  
  

  return (
    <StyledTableEditor>
      <table border="1" >
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) =>
                cell ? (
                  <td
                    key={cell.id}
                    rowSpan={cell.rowspan}
                    colSpan={cell.colspan}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                    onMouseUp={handleMouseUp}
                    style={{
                      backgroundColor: isCellSelected(rowIndex, colIndex) ? 'lightblue' : 'white',
                    }}
                  >
                    {cell.content}
                  </td>
                ) : (
                  <td key={`${rowIndex}-${colIndex}`} style={{ visibility: 'hidden' }} />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={mergeCells}>Merge Cells</button>
      <button onClick={splitCells}>Split Cells</button>

      {showDialog && (
        <dialog open>
          <div>
            <label>
              Split Direction:
              <select value={splitDirection} onChange={(e) => setSplitDirection(e.target.value)}>
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </label>
            <br />
            <label>
              Split Count:
              <input
                type="number"
                value={splitCount}
                onChange={(e) => setSplitCount(parseInt(e.target.value))}
                min="2"
              />
            </label>
            <br />
            <button onClick={handleConfirmSplit}>Confirm</button>
            <button onClick={() => setShowDialog(false)}>Cancel</button>
          </div>
        </dialog>
      )}
    </StyledTableEditor>
  )
}

export default TableEditor
