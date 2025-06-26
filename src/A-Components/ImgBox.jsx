const ImgBox = ({className, boxStyle, src, alt="", draggable=false}) => {

  return (
    <div className={`overflow-hidden ${className}`} style={boxStyle}>
      <img className="w-full h-full" src={src} alt={alt} draggable={draggable}/>
    </div>
  )
}

export default ImgBox