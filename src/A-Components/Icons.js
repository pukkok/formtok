import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { modeAtom } from "../C-Recoils/screenAtom";

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

function TableIcon ({width= 16, height=14, rowOrCol = 'row'}) {
    const mode = useRecoilValue(modeAtom)
    // const [color, setColor] = useState(mode === 'dark' ? '#EDEDED' : '#111')
    const color = '#af7eff'
    const canvasRef = useRef(null)

    // useEffect(() => {
    //     setColor(mode === 'dark' ? '#EDEDED' : '#111')
    // }, [mode])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height
        ctx.fillStyle = color

        function drawRowLine () {
            ctx.fillRect(0, 8, canvas.width, 2)
            ctx.fillRect(0, 12, canvas.width , 2)
        }

        function drawRowArrow () {
            ctx.beginPath()
            ctx.moveTo(0, 6)
            ctx.lineTo(canvas.width, 6)
            ctx.lineTo(canvas.width -8, 0)
            ctx.lineTo(canvas.width -8, 4)
            ctx.lineTo(0, 4)
            ctx.fill()
        }

        function drawColLine () {
            ctx.fillRect(2, 0, 2.5, canvas.height)
            ctx.fillRect(6.5, 0, 2.5, canvas.height)
        }

        function drawColArrow () {
            ctx.beginPath()
            ctx.moveTo(11, 0)
            ctx.lineTo(11, canvas.height)
            ctx.lineTo(16, canvas.height - 6)
            ctx.lineTo(13, canvas.height - 6)
            ctx.lineTo(13, 0)
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

function PieIcon () {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // 배경
        ctx.fillStyle = '#2A2A40'
        ctx.fillRect(0, 0, 24, 24)

        // 원형 파이차트
        ctx.beginPath()
        ctx.moveTo(12, 12)
        ctx.arc(12, 12, 10, Math.PI / 180 * 300, Math.PI / 180 * 60)
        ctx.closePath()
        ctx.fillStyle = '#F44336'
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(12, 12)
        ctx.arc(12, 12, 10, Math.PI / 180 * 60, Math.PI)
        ctx.closePath()
        ctx.fillStyle = '#FFC107'
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(12, 12)
        ctx.arc(12, 12, 10, Math.PI / 180 * 160, Math.PI / 180 * 300)
        ctx.closePath()
        ctx.fillStyle = '#2196F3'
        ctx.fill()
    }, [])

    return <canvas ref={canvasRef} width={24} height={24} />
}

function BarIcon () {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // 배경
        ctx.fillStyle = '#2A2A40'
        ctx.fillRect(0, 0, 24, 24)

        // 막대들
        ctx.fillStyle = '#F44336'
        ctx.fillRect(5, 10, 4, 10)
        ctx.fillStyle = '#FFC107'
        ctx.fillRect(12, 3, 4, 17)
        ctx.fillStyle = '#2196F3'
        ctx.fillRect(19, 6, 4, 14)
    }, [])

    return <canvas ref={canvasRef} width={24} height={24} />
}

function BarIconHorizontal() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // 배경
        ctx.fillStyle = '#2A2A40'
        ctx.fillRect(0, 0, 24, 24)

        // 가로 막대들 (y 좌표 고정, x 좌표가 변하면서 가로로 막대 그림)
        ctx.fillStyle = '#F44336'
        ctx.fillRect(3, 3, 10, 4) // 첫 번째 막대
        ctx.fillStyle = '#FFC107'
        ctx.fillRect(3, 10, 17, 4) // 두 번째 막대
        ctx.fillStyle = '#2196F3'
        ctx.fillRect(3, 17, 14, 4) // 세 번째 막대
    }, [])

    return <canvas ref={canvasRef} width={24} height={24} />
}

function DoughnutIcon () {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // 배경
        ctx.fillStyle = '#2A2A40'
        ctx.fillRect(0, 0, 24, 24)

        ctx.lineWidth = 4

        ctx.beginPath()
        ctx.arc(12, 12, 8, Math.PI / 180 * 300, Math.PI / 180 * 60)
        ctx.strokeStyle = '#F44336'
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(12, 12, 8, Math.PI / 180 * 60, Math.PI)
        ctx.strokeStyle = '#FFC107'
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(12, 12, 8, Math.PI / 180 * 160, Math.PI / 180 * 300)
        ctx.strokeStyle = '#2196F3'
        ctx.stroke()
        ctx.closePath()
    }, [])

    return <canvas ref={canvasRef} width={24} height={24} />
}

function LineIcon() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // 배경
        ctx.fillStyle = '#2A2A40'
        ctx.fillRect(0, 0, 24, 24)

        // 라인 스타일
        ctx.strokeStyle = '#F44336'
        ctx.lineWidth = 2

        // 사인 곡선처럼 휘는 라인을 그리기
        ctx.beginPath()
        ctx.moveTo(2, 16) // 시작점

        ctx.quadraticCurveTo(8, 4, 12, 12) // 첫 번째 곡선
        ctx.quadraticCurveTo(16, 20, 22, 8) // 두 번째 곡선

        ctx.stroke() // 곡선 그리기
        ctx.closePath()

        // 데이터 포인트에 원 추가 (강조)
        ctx.fillStyle = '#FFC107'
        const points = [
            { x: 2, y: 16 },  // 시작점
            { x: 12, y: 12 }, // 중심
            { x: 22, y: 8 }   // 끝점
        ]

        points.forEach(point => {
            ctx.beginPath()
            ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
            ctx.fill()
        })
    }, [])

    return <canvas ref={canvasRef} width={24} height={24} />
}


export { Icon, AddCircleIcon, TableIcon, 
    PieIcon, BarIcon, BarIconHorizontal, DoughnutIcon, LineIcon }