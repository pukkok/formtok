import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledTablePreview = styled.dialog`
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .close-btn {
    text-align: right;
    button {
      padding: 5px 10px;
      background-color: red;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    td, th {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }
    th {
      background-color: var(--pk-question-form-bg);
    }
  }
`

function TablePreview ({ rows, cols }, ref) {
  return (
    <StyledTablePreview ref={ref}>
      <div className="close-btn">
        <button onClick={() => ref.current.close()}>닫기</button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {cols.map((col, idx) => (
              <th key={col.id}>{col.value || `열 ${idx + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id}>
              <th>{row.value || `행 ${rowIndex + 1}`}</th>
              {cols.map((col, colIndex) => (
                <td key={`${row.id}-${col.id}`}>
                  <button>{`${rowIndex + 1},${colIndex + 1}`}</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTablePreview>
  )
}

export default forwardRef(TablePreview)