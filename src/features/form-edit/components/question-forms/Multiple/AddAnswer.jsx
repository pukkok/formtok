import { IoIosClose } from "react-icons/io"

function AddAnswer({ type, inputChange, buttonClick, placeholder, defaultValue, value, disabled, isNotUseBtn = false }) {
  return (
    <div className={`flex items-center mt-1.5 first-of-type:mt-3`}>
      <input
        type={type}
        placeholder={placeholder}
        onChange={inputChange}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        className="min-w-[300px] w-full border-b border-transparent hover:border-gray-300 outline-none"
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
