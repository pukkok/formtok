import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '../1-Components/Icons'

const StyledTableEditor = styled.div`
  table {
    max-width: 756px;
    width: 100%;
    border-collapse: collapse;
    td, th {
      border: 1px solid #000;
      padding: 10px;
      text-align: center;
    }
    input {
      max-width: fit-content;
      width: 100%;
      border: none;
      text-align: center;
    }
  }
  button {
    margin: 10px;
  }
`

const TableEditor = () => {
    const [tableData, setTableData] = useState([
      ['', '열 1', '열 2'],
      ['행 1', '', ''],
      ['행 2', '', ''],
    ])
  
    // 행 추가
    const addRow = () => {
      const newRow = Array(tableData[0].length).fill('') // 열의 길이에 맞춰 빈 값을 가진 새 행 생성
      newRow[0] = `행 ${tableData.length}` // 새 행의 첫 번째 셀에 행 번호 추가
      setTableData([...tableData, newRow])
    }
  
    // 열 추가
    const addColumn = () => {
      const newTableData = tableData.map((row, rowIndex) => {
        if (rowIndex === 0) {
          return [...row, `열 ${row.length}`] // 첫 번째 행에는 열 번호 추가
        } else {
          return [...row, ''] // 나머지 행에는 빈 열 추가
        }
      })
      setTableData(newTableData)
    }
  
    // 셀 값 변경
    const handleInputChange = (e, rowIdx, colIdx) => {
      const newTableData = [...tableData]
      newTableData[rowIdx][colIdx] = e.target.value
      setTableData(newTableData)
    }
  
    return (
      <StyledTableEditor>
        <table>
          <tbody>
            {tableData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td key={colIdx}>
                    {rowIdx === 0 || colIdx === 0 ? ( // 1행과 1열에만 인풋 필드
                      <>
                      <input
                        type="text"
                        placeholder={cell}
                        onChange={(e) => handleInputChange(e, rowIdx, colIdx)}
                        disabled={rowIdx ===0 && colIdx === 0}
                      />
                      <button onClick={()=>{}}><Icon code={'close'}/></button>
                      </>
                    ) : (
                      cell // 나머지 셀은 기본 내용
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        <button onClick={addRow}>행 추가</button>
        <button onClick={addColumn}>열 추가</button>
      </StyledTableEditor>
    )
  }

export default TableEditor

