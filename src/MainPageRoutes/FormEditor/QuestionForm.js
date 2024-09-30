import React, { useEffect, useState, useRef } from "react"
import { useRecoilValue } from "recoil"
import { pagesAtom } from "../../Recoils/surveyAtoms"
import AddAnswer from '../../Components/AddAnswer'
import usePageActions from "../../Hooks/usePageActions"
import DropDown from "../../Components/DropDown"
import styled from "styled-components"

const StyledQuestionForm = styled.div`
    margin-bottom: 20px;
`

function QuestionForm ({pi, qi}){
    const pages = useRecoilValue(pagesAtom)
    const style = pages[pi].questions[qi].type || '객관식'

    return <StyledQuestionForm>
        {style === '서술형' && <LongText />}
        {style === '단답형' && <ShortText />}
        {['객관식', '객관식(복수 선택)', '드롭다운'].includes(style) && <Multiple pages={pages} pi={pi} qi={qi}/>}
        {['날짜', '시간', '날짜 + 시간'].includes(style) && <DateTypeInput style={style}/>}
        {style === '표형' && <TableCanvas/>}
        {style === '점수 선택형' &&<SelectScore pi={pi} qi={qi}/>}
    </StyledQuestionForm>
}

export default QuestionForm

const StyledMultiple = styled.div`
    .add-btns{
        margin-top: 20px;

        button{
            padding: 5px 10px;
            border-radius: 12px;
            font-weight: 500;

            &.add-answer-btn{
                background-color: var(--pk-point);
                color: var(--pk-light-grey);
                margin-right: 10px;
            }
            &.add-extra-btn{
                background-color: var(--pk-add-extra-btn-bg);
                color: var(--pk-light-grey);
                margin-left: 10px;
            }
        }
    }
`

function Multiple ({pages, pi, qi}) {
    
    const { addOption, toggleEXtraOption, changeOption, deleteOption } = usePageActions()

    return (
    <StyledMultiple>
        {pages[pi].questions[qi].options.map((option, idx3) => {
            const {id, answer} = option
            return <AddAnswer key={id} 
            inputChange={(e)=>changeOption(e, pi, qi, idx3)} placeholder={'옵션'+(idx3+1)} value={answer} 
            buttonClick={()=>deleteOption(pi, qi, idx3)}
            isNotUseBtn={pages[pi].questions[qi].options.length===1 && idx3===0}
            />
        })}
        {pages[pi].questions[qi].hasExtraOption && 
        <AddAnswer defaultValue={'기타'} disabled={true} buttonClick={()=>toggleEXtraOption(pi, qi, false)}/>}
        <div className="add-btns">
            <button className="add-answer-btn" onClick={()=>addOption(pi, qi)}>항목 추가</button>
            {!pages[pi].questions[qi].hasExtraOption && <>
                또는
            <button className="add-extra-btn"onClick={()=>toggleEXtraOption(pi, qi, true)}>'기타' 추가</button>
            </>}
        </div>
    </StyledMultiple>)
}

// 서술형
const StyledLongText = styled.div`
    margin-top: 15px;
    width: 100%;
    height: 80px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-charcoal);
`
function LongText () {
    return <StyledLongText>
        <input placeholder="서술형 (1000자 이내)" disabled={true}/>
    </StyledLongText>
}

// 단답형
const StyledShortText = styled.div`
    margin-top: 15px;
    width: 40%;
    height: 40px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-charcoal);
`
function ShortText () {
    return <StyledShortText>
        <input placeholder="단답형 (100자 이내)" disabled={true}/>
    </StyledShortText>
}

// 날짜, 시간, 날짜+시간
const StyledDateTypeInput = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    & > div{
        width: fit-content;
        height: 40px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-charcoal);
    }

    input[type="date"]::-webkit-calendar-picker-indicator, 
    input[type="time"]::-webkit-calendar-picker-indicator, 
    input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
        filter: invert(.8);
        cursor: pointer;
    }

    input:focus{
        border: none;
    }

    span{
        /* font-weight: 800; */
    }
`

function DateTypeInput ({style, setToPeriod = true}) {

    const changeStyleToType = (style) => {
        let type = ''
        switch (style) {
            case '날짜' : type = 'date'; break;
            case '시간' : type = 'time'; break;
            case '날짜 + 시간' : type = 'datetime-local'; break;
            default : type = 'date'
        }
        return type 
    }

    return <StyledDateTypeInput>
        <div>
            <input type={changeStyleToType(style)} />
        </div>
        {setToPeriod && <>
            <span>~</span>
        <div>
            <input type={changeStyleToType(style)} />
        </div>
        </>
        }
    </StyledDateTypeInput>
}

// 점수 선택형
const StyledSelcetScore = styled.div` 
    width: 80%;
    margin: 30px auto;
    .option-input-box{
        input{
            width: 100px;
            border: solid 1px var(--pk-charcoal);
            padding: 4px 8px;
            border-radius: 8px;
            &:focus{
                border: solid 1px var(--pk-point);
            }
        }
        input:first-child{
            float: left;
        }
        input:last-child{
            float: right;
            text-align: right;
        }
        height: 30px;
        margin-bottom: 20px;
    }

    ul.line{
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;
        position: relative;
        display: flex;
        justify-content: space-between;
        height: fit-content;
        cursor: pointer;

        &::before{
            content: '';
            width: 100%;
            height: 3px;
            position: absolute;
            top: 25%;
            left: 0;
            right: 0;
            background-color: var(--pk-charcoal);
        }

        li{
            padding-top: 40px;
            flex: 2;
            display: flex;
            justify-content: center;
            &:first-child, &:nth-last-of-type(1){
                flex: 1;
            }
            &:first-child{
                justify-content: flex-start;
            }
            &:nth-last-of-type(1){
                justify-content: flex-end;
            }
        }
        .ball{
            display: block;
            position: absolute;
            top: 25%;
            left: 0;
            width: 50%;
            height: 3px;
            background-color: var(--pk-point);
            transition: .3s;
            &::after{
                content: '';
                position: absolute;
                top: 0;
                right: -10px;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: var(--pk-point);
            }
        }

        
    }

    .minmax-box{
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        & > div{
            display: inline-flex;
            gap: 10px;
            align-items: center;
        }
    }
        
`

function SelectScore ({pi, qi}) {
    const [percent, setPercent] = useState(50)
    const [maxScore, setMaxScore] = useState(5)

    const scores = Array(maxScore).fill(1).map((n, idx) => n+idx)

    return (
    <StyledSelcetScore>
        <div className="option-input-box">
            <input placeholder="왼쪽값 입력"/>
            <input placeholder="오른쪽값 입력"/>
        </div>

        <ul className="line">
            {scores.map((n, idx) => {
                return <li key={idx} value={idx} onClick={()=>setPercent(idx / (scores.length - 1) * 100)}>{n}</li>
            })}
            <span className="ball" style={{width : percent + '%'}}></span>
        </ul>

        <div className="minmax-box">
            <div>최소 : 
                <DropDown initialItem={1} style={{width: '80px'}}>
                    <li><button>1</button></li>
                    <li><button>2</button></li>
                    <li><button>3</button></li>
                    <li><button>4</button></li>
                    <li><button>5</button></li>
                </DropDown>
            </div>
            <span>~</span>
            <div>최대 :
                <DropDown initialItem={5} style={{width: '80px'}}>
                    <li><button>2</button></li>
                    <li><button>3</button></li>
                    <li><button>4</button></li>
                    <li><button>5</button></li>
                    <li><button>6</button></li>
                    <li><button>7</button></li>
                    <li><button>8</button></li>
                    <li><button>9</button></li>
                    <li><button>10</button></li>
                </DropDown>
            </div>
        </div>
    </StyledSelcetScore>
    )
}

const TableCanvas = () => {
  const canvasRef = useRef(null);
  const [cells, setCells] = useState([
    { row: 0, col: 0, x: 0, y: 0, width: 100, height: 50 },
    { row: 0, col: 1, x: 100, y: 0, width: 100, height: 50 },
    { row: 0, col: 2, x: 200, y: 0, width: 100, height: 50 },
    { row: 1, col: 0, x: 0, y: 50, width: 100, height: 50 },
    { row: 1, col: 1, x: 100, y: 50, width: 100, height: 50 },
    { row: 1, col: 2, x: 200, y: 50, width: 100, height: 50 }
  ]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawTable(ctx);
    console.log(cells)
  }, [cells, selectedCells]);

  const drawTable = (ctx) => {
    ctx.clearRect(0, 0, 300, 150); // Clear the canvas

    cells.forEach((cell) => {
      ctx.beginPath();

      // If the cell is selected, fill it with a background color
      if (selectedCells.includes(cell)) {
        ctx.fillStyle = "rgba(0, 128, 255, 0.3)"; // Light blue background for selected cells
        ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
      }

      // Draw cell borders
      ctx.strokeStyle = "black"; // Border color for cells
      ctx.rect(cell.x, cell.y, cell.width, cell.height);
      ctx.stroke();
    });
  };

  const getCellAtPosition = (x, y) => {
    return cells.find(
      (cell) =>
        x >= cell.x && x < cell.x + cell.width && y >= cell.y && y < cell.y + cell.height
    );
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const startCell = getCellAtPosition(x, y);
    if (startCell) {
      setIsDragging(true);
      setDragStart(startCell); // Store the start cell
      setSelectedCells([startCell]); // Reset selection to the initial cell
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const endCell = getCellAtPosition(x, y);
    if (endCell) {
      const startRow = Math.min(dragStart.row, endCell.row);
      const endRow = Math.max(dragStart.row, endCell.row);
      const startCol = Math.min(dragStart.col, endCell.col);
      const endCol = Math.max(dragStart.col, endCell.col);

      // Select all cells within the rectangle defined by drag start and end
      const newSelectedCells = cells.filter(
        (cell) =>
          cell.row >= startRow &&
          cell.row <= endRow &&
          cell.col >= startCol &&
          cell.col <= endCol
      );
      setSelectedCells(newSelectedCells);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const mergeCells = () => {
    if (selectedCells.length > 1) {
        console.log('셀렉티드셀',selectedCells)
      const mergedCell = {
        row: selectedCells[0].row,
        col: selectedCells[selectedCells.length - 1].col,
        x: selectedCells[0].x,
        y: selectedCells[0].y,
        width: selectedCells.reduce((acc, cell) => acc + cell.width, 0),
        height: selectedCells.reduce((acc, cell) => acc + cell.height, 0)
      };

      const remainingCells = cells.filter(
        (cell) => !selectedCells.includes(cell)
      );
      setCells([...remainingCells, mergedCell]);
      setSelectedCells([]);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid black" }}
      ></canvas>
      <button onClick={mergeCells}>Merge Cells</button>
    </div>
  );
};

