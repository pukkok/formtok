const ToggleButton = ({ onClick, isOn = false }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-11 h-6 rounded-full border-2 cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-point border-point" : "bg-silver border-silver"
      }`}
    >
      <span
        className={`absolute top-1/2 w-5 h-[calc(100%-2px)] rounded-full bg-light-w transform -translate-y-1/2 transition-all duration-300 ${
          isOn ? "left-[calc(50%-2px)]" : "left-0"
        }`}
      ></span>
    </button>
  )
}

export default ToggleButton