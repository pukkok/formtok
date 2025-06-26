const CapsLockMessage = ({active = false}) => {
  
  if(!active) return null

  return (
    <span className="text-fold-point">캡스락이 켜져있습니다.</span>
  )
  
}

export default CapsLockMessage