import React, { useEffect, useRef, useState } from "react";
import { Icon, TableIcon } from "../../Components/Icons";
import TablePreviewer from "./TablePreviewer";
import styled from "styled-components";
import usePageActions from "../../Hooks/usePageActions";

const StyledTableEditor = styled.div`
    margin-top: 15px;
    display: grid;
    grid-template-areas: 
    'prevbtn prevbtn'
    'boxA boxB';
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    & > .prev-box{ // 표 미리보기
        grid-area: prevbtn;
        text-align: center;
        width: 100%;
        margin-top: 10px;
        button{
            padding: 4px 8px;
            border-radius: 8px;
            font-weight: 700;
            &:hover{
                background-color: var(--pk-charcoal);
            }
        }
    }
    & > .table-edit{  
        width: 100%;
        &.rowBox{ // 행 추가
            grid-area: boxA;
        }
        &.colBox{ // 열추가
            grid-area: boxB;
        }
        & > button{
            padding: 4px 6px;
            border-radius: 8px;
            display: flex;
            align-items: flex-end;
            align-items: center;
            gap: 5px;
            font-weight: 800;
            color: var(--pk-purple-font);

            &.col-add-btn{
                margin-left: auto;
            }
        
        }

        & > div{
            display: flex;
            width: 100%;
            height: 40px;
            padding: 8px 10px;
            border-radius: 12px;
            background-color: var(--pk-question-form-bg);
            margin-top: 10px;
            & > input{
                width: 100%;
                border-bottom: none;
            }
            button{
                display: none;
            }
            input:focus + button, &:hover button{
                display: block;
            }
        }
    }
`

const TableEditor = ({pages, pi, qi}) => {
    const { initialTable, addTableRowOrCol, deleteTableRowOrCol, updateTableValue } = usePageActions()
    const [start, setStart] = useState(true)
    const rows = pages[pi].questions[qi].tableRows
    const cols = pages[pi].questions[qi].tableCols
    
    const modalRef = useRef(null)
    
    useEffect(() => {
        if(start){
            setStart(false)
            initialTable(pi, qi)
        }
    }, [start, pi, qi])

    const modalOpen = () => {
        if (modalRef.current) {
            modalRef.current.showModal()  // modal 열기
        }
    }

    return (
        <StyledTableEditor>
            <div className="prev-box">
                <button onClick={modalOpen}>표 미리보기</button>
            </div>
            <div className="table-edit row-box">
                <button 
                onClick={() => addTableRowOrCol(pi, qi, 'row')}>
                    <TableIcon/>행 추가
                </button>
                {rows.length > 0 && rows.map((row, idx) => {
                    return (
                        <div key={row.id}>
                            <input 
                                className="nbb"
                                onChange={(e) => updateTableValue(pi, qi, row.id, e.target.value, 'row')}
                                placeholder={(idx+1)+' 행'} 
                                value={row.value}/>
                            {rows.length > 2 && (
                                <button onClick={() => deleteTableRowOrCol(pi, qi, row.id, 'row')}><Icon code={'close'}/></button>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="table-edit col-box">
                <button
                    className="col-add-btn" 
                    onClick={() => addTableRowOrCol(pi, qi, 'col')}>
                    <TableIcon rowOrCol="col"/>열 추가
                </button>
                {cols.length > 0 && cols.map((col, idx) => {
                    return (
                        <div key={col.id}>
                            <input 
                                className="nbb"
                                onChange={(e) => updateTableValue(pi, qi, col.id, e.target.value, 'col')}
                                placeholder={(idx+1)+' 열'} 
                                value={col.value}/>
                            {cols.length > 2 && (
                                <button onClick={() => deleteTableRowOrCol(pi, qi, col.id, 'col')}><Icon code={'close'}/></button>
                            )}
                        </div>
                    )
                })}
            </div>

            <TablePreviewer rows={rows} cols={cols} ref={modalRef}/>
        </StyledTableEditor>
    )
}

export default TableEditor