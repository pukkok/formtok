const ScoreTextInput = ({ value, onChange, placeholder, className = '', ...props }) => {
  return (
    <input
      className={`bg-light-w dark:bg-dark-elevated rounded-md px-2 py-5 border border-transparent focus:border-point outline-none ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

export default ScoreTextInput