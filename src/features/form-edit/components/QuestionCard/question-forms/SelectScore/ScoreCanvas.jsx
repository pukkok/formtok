import { useEffect, useRef } from "react"

const ScoreCanvas = ({ min = 1, max = 5, selected = null, onSelect }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width = canvas.offsetWidth
    const height = canvas.height = 100
    const radius = 12 // 원의 반지름
    const lineWidth = 4 // 메인 라인의 두께
    const circleStrokeWidth = 3 // 원 테두리의 두께
    
    // 원의 테두리가 잘리지 않도록 필요한 패딩 계산
    // 반지름 + (원 테두리 두께 / 2) 만큼의 여백이 필요합니다.
    const padding = radius + (circleStrokeWidth / 2) 

    const total = max - min
    // 양쪽 패딩을 제외한 실제 그림 영역의 너비
    const drawingWidth = width - (2 * padding)
    // 그림 영역 내에서 점들을 고르게 분포시키기 위한 간격
    const gap = drawingWidth / total 

    ctx.clearRect(0, 0, width, height)

    // 라인 그리기
    ctx.beginPath()
    // 패딩 경계 안에서 라인을 시작하고 끝냅니다.
    ctx.moveTo(padding, height / 2) 
    ctx.lineTo(width - padding, height / 2)
    ctx.strokeStyle = "#444466"
    ctx.lineWidth = lineWidth // 메인 라인 두께 적용
    ctx.stroke()

    // 점수 원들 그리기
    for (let i = 0; i <= total; i++) {
      // 패딩을 고려하여 x 위치 계산
      const x = padding + (i * gap) 
      const filled = selected === (min + i)

      // 바깥 원 (테두리)
      ctx.beginPath()
      ctx.arc(x, height / 2, radius, 0, Math.PI * 2) // x에 +3 오프셋 불필요
      ctx.fillStyle= '#fff'
      ctx.strokeStyle = "#AF7EFF"
      ctx.lineWidth = circleStrokeWidth // 원 테두리 두께 적용
      ctx.fill()
      ctx.stroke()
      
      // 안쪽 원 (채움)
      ctx.beginPath()
      // 안쪽 원의 반지름을 테두리 두께만큼 줄여서 테두리와 겹치지 않도록 합니다.
      ctx.arc(x, height / 2, radius - circleStrokeWidth, 0, Math.PI * 2) 
      ctx.fillStyle = filled ? "#AF7EFF" : "#fff"
      ctx.fill()

      // 텍스트 그리기
      ctx.fillStyle = "#000"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(min + i, x, height / 2 + 30)
    }
  }, [min, max, selected]) // 의존성 배열에 모든 외부 변수 포함

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left // 캔버스 내에서의 클릭 X 좌표

    // 클릭 감지 로직도 변경된 그림 영역에 맞춰 조정해야 합니다.
    const radius = 10
    const circleStrokeWidth = 3
    const padding = radius + (circleStrokeWidth / 2)
    const total = max - min
    const width = rect.width
    const drawingWidth = width - (2 * padding) // 실제 클릭 감지 영역의 너비

    // 클릭 위치를 그림 영역 기준으로 계산
    const clickXRelativeToDrawingArea = x - padding

    // 클릭이 패딩 영역 내에 있을 경우 최소/최대 값으로 처리
    if (clickXRelativeToDrawingArea < 0) {
        onSelect?.(min)
        return
    }
    if (clickXRelativeToDrawingArea > drawingWidth) {
        onSelect?.(max)
        return
    }

    // 그림 영역 내에서 클릭된 인덱스 계산
    const idx = Math.round((clickXRelativeToDrawingArea / drawingWidth) * total)
    const value = min + idx
    onSelect?.(value)
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="w-full h-24 cursor-pointer"
    />
  )
}

export default ScoreCanvas