import React, { useEffect, useRef } from "react"

function FormTokLoading({width = window.innerWidth, height = window.innerHeight, setFinish}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        canvas.width = width
        canvas.height = height

        const bigBalloon = {
            x: canvas.width / 2 - 160,
            y: canvas.height / 2,
            size: 110,
            color: "#444466",
            speed: 8,
        }

        const smallBalloon = {
            x: canvas.width / 2 + 160,
            y: canvas.height / 2,
            size: 75,
            // color: "#E8E8EC",
            color: "#fefefe",
            speed: 8,
        }

        const samllBar = {
            width: 30,
            height: 0,
            maxHeight: 40,
            color: '#FFD54F',
            radius: 8,
            x: canvas.width / 2 -15 - 45,
            y: canvas.height / 2 + 50
        }

        const midiumBar = {
            width: 30,
            height: 0,
            maxHeight: 80,
            color: '#F06292',
            radius: 8,
            x: canvas.width / 2 - 15,
            y: canvas.height / 2 + 50
        }

        const bigBar = {
            width: 30,
            height: 0,
            maxHeight: 100,
            color: '#7E37ED',
            radius: 8,
            x: canvas.width / 2 - 15 + 45,
            y: canvas.height / 2 + 50
        }

        let animationFrameId
        let accel = 0
        let isCollision = false
        let smallBarStarted = false
        let midBarStarted = false
        let bigBarStarted = false
        let isFinish = false

        function drawRoundedRect(x, y, width, height, radius, color) {
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.moveTo(x + radius, y)
            ctx.arcTo(x + width, y, x + width, y + height, radius)
            ctx.arcTo(x + width, y + height, x, y + height, radius)
            ctx.arcTo(x, y + height, x, y, radius)
            ctx.arcTo(x, y, x + width, y, radius)
            ctx.fill()
        }

        function drawBigBalloon(balloon) {
            const { size, color } = balloon
            let currentX = balloon.x
            if (balloon.x < canvas.width / 2) {
                balloon.x += accel
                balloon.size += 0.5
                if(accel < 10){
                    accel+= 0.4
                }
            }
            if(currentX === balloon.x) {
                setTimeout(() => {
                    isCollision = true
                }, 500)
            }

            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(balloon.x, balloon.y, size, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.moveTo(balloon.x - size, balloon.y + size)
            ctx.lineTo(balloon.x + size / 2, balloon.y + size / 2)
            ctx.lineTo(balloon.x, balloon.y)
            ctx.lineTo(balloon.x - size / 2, balloon.y - size / 2)
            ctx.fill()
        }

        function drawSmallBalloon(balloon) {
            const { size, color } = balloon
            if (balloon.x > canvas.width / 2) {
                balloon.x -= accel 
                balloon.size += .5
            }

            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(balloon.x, balloon.y, size, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.moveTo(balloon.x + size - 15, balloon.y + size - 15)
            ctx.lineTo(balloon.x + size / 2, balloon.y - size / 2)
            ctx.lineTo(balloon.x - size / 2, balloon.y + size / 2)
            ctx.fill()
        }

        function drawBars() {

            if (!smallBarStarted) {
                smallBarStarted = true
            }

            if (smallBarStarted && samllBar.height < samllBar.maxHeight){
                samllBar.height += 2
            }

            if (samllBar.height >= 10 && !midBarStarted) {
                setTimeout(() => {
                    midBarStarted = true
                }, 100)
            }

            if (midBarStarted && midiumBar.height < midiumBar.maxHeight){
                midiumBar.height += 3
            }

            if (midiumBar.height >= 10 && !bigBarStarted) {
                setTimeout(() => {
                    bigBarStarted = true
                }, 100)
            }
            let currentHeight = bigBar.height
            if (bigBarStarted && bigBar.height < bigBar.maxHeight){
                bigBar.height += 4
            }
            if(currentHeight === bigBar.height){
                setTimeout(() => {
                    isFinish = true
                }, 1000)
            }

            drawRoundedRect(samllBar.x, samllBar.y - samllBar.height, samllBar.width, samllBar.height, samllBar.radius, samllBar.color)
            drawRoundedRect(midiumBar.x, midiumBar.y - midiumBar.height, midiumBar.width, midiumBar.height, midiumBar.radius, midiumBar.color)
            drawRoundedRect(bigBar.x, bigBar.y - bigBar.height, bigBar.width, bigBar.height, bigBar.radius, bigBar.color)
        }

        function start() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawBigBalloon(bigBalloon)
            drawSmallBalloon(smallBalloon)
            if(isCollision){
                drawBars()
            }
            animationFrameId = requestAnimationFrame(start)
            if(isFinish){
                cancelAnimationFrame(animationFrameId)
                setFinish && setFinish(true)
            }
        }

        start()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [height, setFinish, width])

    return <canvas ref={canvasRef}></canvas>
}

export default FormTokLoading
