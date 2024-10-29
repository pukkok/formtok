import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { modeAtom } from "../C-Recoils/screenAtom";

/** modeFix = white, dark */
function FormTokLogo ({boxSize = 200, modeFix=null}) {
  const mode = useRecoilValue(modeAtom)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = boxSize
    canvas.height = boxSize

    let balloonColor = {
      big : mode === 'dark' ? "#fefefe" : "#444466",
      small : mode === 'dark' ? "#444466" : "#fefefe"
    }
    if(modeFix === 'dark'){
      balloonColor.big = "#444466"
      balloonColor.small = '#fefefe'
    }
    if(modeFix === 'white'){
      balloonColor.big = "#fefefe"
      balloonColor.small = '#444466'
    }

    const bigBalloon = {
      direction : true,
      size: boxSize / 2,
      color: balloonColor.big ,
    }

    const smallBalloon = {
      direction : false,
      size: bigBalloon.size * 72/100,
      color: balloonColor.small ,
    }

    const bottomLine = boxSize / 5
    const barWidth = boxSize * 15 / 100
    const barGap = boxSize * 18 / 100
    const barRadius = boxSize * 3 / 100
    const samllBar = {
      height: boxSize * 16 / 100,
      color: '#FFD54F',
      radius: barRadius,
      x: canvas.width/2 - barWidth/2 - barGap,
      y: canvas.height / 2 + bottomLine
    }

    const midiumBar = {
      height: boxSize * 28 / 100,
      maxHeight: 80,
      color: '#F06292',
      radius: barRadius,
      x: canvas.width / 2 - barWidth/2,
      y: canvas.height / 2 + bottomLine
    }

    const bigBar = {
      height: boxSize * 38 / 100,
      color: '#7E37ED',
      radius: barRadius,
      x: canvas.width / 2 - barWidth/2 + barGap,
      y: canvas.height / 2 + bottomLine
    }

    function drawRoundedRect(bar) {
      const {x, y, height, radius, color} = bar
      const width = boxSize * 12 / 100
      const changeY = y - height // 아래서부터 정렬
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x + radius, changeY)
      ctx.arcTo(x + width, changeY, x + width, changeY + height, radius)
      ctx.arcTo(x + width, changeY + height, x, changeY + height, radius)
      ctx.arcTo(x, changeY + height, x, changeY, radius)
      ctx.arcTo(x, changeY, x + width, changeY, radius)
      ctx.fill()
    }

    function drawBalloon(balloon) {
      const { size, color, direction } = balloon

      const [x, y] = [canvas.width / 2, canvas.height / 2]

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()

      if(direction){
        ctx.beginPath() // 꼬리
        ctx.moveTo(x - size, y + size)
        ctx.lineTo(x + size / 2, y + size / 2)
        ctx.lineTo(x, y)
        ctx.lineTo(x - size / 2, y - size / 2)
        ctx.fill()
      } else {
        ctx.beginPath() // 꼬리
        ctx.moveTo(x + size - size / 20, y + size - size / 20)
        ctx.lineTo(x + size / 2, y - size / 2)
        ctx.lineTo(x, y)
        ctx.lineTo(x - size / 2, y + size / 2)
        ctx.fill()
      }

    }

    function start() {
      drawBalloon(bigBalloon)
      drawBalloon(smallBalloon)
      drawRoundedRect(samllBar)
      drawRoundedRect(midiumBar)
      drawRoundedRect(bigBar)
    }

    start()
  },[boxSize, mode])

  return <canvas ref={canvasRef}></canvas>
}

export default FormTokLogo