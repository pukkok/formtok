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
    [{ id: '1-1', content: 'A', colspan: 1, rowspan: 1 }, { id: '1-2', content: 'B', colspan: 1, rowspan: 1 }],
    [{ id: '2-1', content: 'C', colspan: 1, rowspan: 1 }, { id: '2-2', content: 'D', colspan: 1, rowspan: 1 }],
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
  
      // 선택된 셀들 삭제
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

  const adjustColspanRowspan = (newTableData) => {
    // 각 셀에 대해 colspan과 rowspan 조정을 진행
    for (let row = 0; row < newTableData.length; row++) {
      for (let col = 0; col < newTableData[row].length; col++) {
        const cell = newTableData[row][col];
        if (!cell) continue;
  
        // 오른쪽의 colspan이 적용된 셀 조정
        if (cell.colspan > 1) {
          for (let c = 1; c < cell.colspan; c++) {
            if (newTableData[row][col + c]) {
              newTableData[row][col + c].colspan -= 1;
            }
          }
        }
  
        // 아래쪽의 rowspan이 적용된 셀 조정
        if (cell.rowspan > 1) {
          for (let r = 1; r < cell.rowspan; r++) {
            if (newTableData[row + r] && newTableData[row + r][col]) {
              newTableData[row + r][col].rowspan -= 1;
            }
          }
        }
      }
    }
    return newTableData;
  }
  
  const handleConfirmSplit = () => {
    const newTableData = [...tableData];
  
    selectedCells.forEach(({ row, col }) => {
      const cell = newTableData[row][col];
  
      if (splitDirection === 'horizontal') {
        // 가로 분할
        const newCells = Array(splitCount).fill(null).map((_, idx) => ({
          id: `${row}-${col}-${idx}`,
          content: `${cell.content}${idx + 1}`,
          colspan: 1,
          rowspan: cell.rowspan,
        }));
  
        // 셀을 가로로 나누고 새 셀 추가
        newTableData[row] = [
          ...newTableData[row].slice(0, col),
          ...newCells,
          ...newTableData[row].slice(col + 1),
        ];
  
        // 인접한 셀의 colspan 조정
        for (let r = 0; r < tableData.length; r++) {
          for (let c = 0; c < col; c++) {
            if (newTableData[r][c]) {
              newTableData[r][c].colspan += (splitCount - 1);
            }
          }
        }
  
      } else if (splitDirection === 'vertical') {
        // 세로 분할
        const newRows = Array(splitCount - 1).fill(null).map((_, idx) => {
          const newRow = [...newTableData[row]];
          newRow[col] = {
            id: `${row + idx + 1}-${col}`,
            content: `${cell.content}${idx + 1}`,
            colspan: cell.colspan,
            rowspan: 1,
          };
          return newRow;
        });
  
        // 새로운 행 추가
        newTableData.splice(row + 1, 0, ...newRows);
  
        // 인접한 셀의 rowspan 조정
        for (let r = 0; r < row; r++) {
          if (newTableData[r][col]) {
            newTableData[r][col].rowspan += (splitCount - 1);
          }
        }
      }
    });
  
    setTableData(adjustColspanRowspan(newTableData)); // 인접 셀 조정 로직 적용
    setShowDialog(false);  // 다이얼로그 닫기
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
                <option value="horizontal">행</option>
                <option value="vertical">열</option>
              </select>
            </label>
            <br />
            <label>
              개수:
              <input
                type="number"
                value={splitCount}
                onChange={(e) => setSplitCount(parseInt(e.target.value))}
                min="2"
              />
            </label>
            <br />
            <button onClick={handleConfirmSplit}>확인</button>
            <button onClick={() => setShowDialog(false)}>취소</button>
          </div>
        </dialog>
      )}
    </StyledTableEditor>
  )
}

export default TableEditor
