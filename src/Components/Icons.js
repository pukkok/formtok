import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { modeAtom } from "../Recoils/screenAtom";

function Icon ({ code, handleclick, className }) {
    return <span 
    className={`material-symbols-outlined notranslate icon ${className}`}
    onClick={handleclick}
    >{code}</span>
}

function AddCircleIcon() {
    
    return (
        <svg fill="none" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <path d="m28 0.44434c15.194 0 27.556 12.362 27.556 27.556s-12.362 27.556-27.556 27.556-27.556-12.362-27.556-27.556 12.362-27.556 27.556-27.556zm-10.598 29.675h8.4787v8.4787c0 0.5621 0.2233 1.1013 0.6208 1.4988s0.9366 0.6208 1.4988 0.6208 1.1013-0.2233 1.4988-0.6208 0.6209-0.9367 0.6209-1.4988v-8.4787h8.4786c0.5622 0 1.1013-0.2233 1.4988-0.6208s0.6209-0.9366 0.6209-1.4988-0.2234-1.1013-0.6209-1.4988-0.9366-0.6209-1.4988-0.6209h-8.4786v-8.4786c0-0.5622-0.2234-1.1013-0.6209-1.4988s-0.9366-0.6209-1.4988-0.6209-1.1013 0.2234-1.4988 0.6209-0.6208 0.9366-0.6208 1.4988v8.4786h-8.4787c-0.5621 0-1.1013 0.2234-1.4988 0.6209s-0.6208 0.9366-0.6208 1.4988 0.2233 1.1013 0.6208 1.4988 0.9367 0.6208 1.4988 0.6208z"/>
        </svg>
    )

}

function TableIcon ({width= 20, height=18, rowOrCol = 'row'}) {
    const mode = useRecoilValue(modeAtom)
    const [color, setColor] = useState(mode === 'dark' ? '#EDEDED' : '#111')
    const canvasRef = useRef(null)

    useEffect(() => {
        setColor(mode === 'dark' ? '#EDEDED' : '#111')
    }, [mode])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height

        function drawRowLine () {
            ctx.fillStyle = color
            ctx.fillRect(0, 9, canvas.width, 2.5)
            ctx.fillRect(0, 15, canvas.width , 2.5)
        }

        function drawRowArrow () {
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.moveTo(0, 6)
            ctx.lineTo(canvas.width, 6)
            ctx.lineTo(canvas.width -8, 0)
            ctx.lineTo(canvas.width -8, 3)
            ctx.lineTo(0, 3)
            ctx.fill()
        }

        function drawColLine () {
            ctx.fillStyle = color
            ctx.fillRect(0, 0, 3, canvas.height)
            ctx.fillRect(6, 0, 3, canvas.height)
        }

        function drawColArrow () {
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.moveTo(12, 0)
            ctx.lineTo(12, canvas.height)
            ctx.lineTo(18, canvas.height - 8)
            ctx.lineTo(15, canvas.height - 8)
            ctx.lineTo(15, 0)

            ctx.fill()
        }
        
        function start(){
            if(rowOrCol === 'row'){
                drawRowLine()
                drawRowArrow()
            }else{
                drawColLine()
                drawColArrow()
            }
        }
        start()
    }, [color, height, width])

    return <canvas ref={canvasRef}></canvas>
}

export { Icon, AddCircleIcon, TableIcon }