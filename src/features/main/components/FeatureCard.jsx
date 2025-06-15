import icons from '../../../assets/images/colorful-icons.png'

function FeatureCard ({describe, headLine, content}) {
  
  const bgPosition = {
    "write": 'bg-position-[left_-252px_top_-252px]',
    "analysis": 'bg-position-[left_-140px_top_-28px]',
    "my-dashboard": 'bg-position-[left_-30px_top_-252px]'
  }[describe]

  return (
    <div className={`relative top-[100vh] flex flex-col gap-5 max-w-sm
      bg-charcoal bg-linear-to-r from-charcoal from-20% to-dark
      animate-moveToHigh
      p-9 rounded-xl transition-[0.3s]
      hover:translate-y-[-10px]
    `}>
      <div 
        className={`w-[110px] h-[110px] mb-2.5
          ${bgPosition} bg-size-[500px] bg-no-repeat
        `}
        style={{backgroundImage : `url(${icons})`}}
      ></div>
      <h3 className="text-2xl mb-2.5">{headLine}</h3>
      <p>{content}</p>
    </div>
  )
}

export default FeatureCard