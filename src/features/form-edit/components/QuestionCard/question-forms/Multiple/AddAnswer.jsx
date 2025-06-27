import { IoIosClose } from "react-icons/io"

function AddAnswer({ type, inputChange, buttonClick, placeholder, defaultValue, value, disabled, isNotUseBtn = false }) {
  return (
    <div className={`flex items-center mt-3 first-of-type:mt-6`}>
      <input
        type={type}
        placeholder={placeholder}
        onChange={inputChange}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        className="min-w-[300px] w-full pl-1 border-b border-b-transparent 
        dark:hover:border-b-dark-line-hover hover:border-gray-300 focus:border-b-point focus:hover:border-b-point focus:border-b-2 outline-none"
      />
      <button
        tabIndex={-1}
        onClick={buttonClick}
        style={{ display: isNotUseBtn ? "none" : "block" }}
        className="ml-2"
      >
        <IoIosClose className="text-[26px] transition-transform duration-200 ease-in-out hover:scale-105"/>
      </button>
    </div>
  )
}

export default AddAnswer
