const EditNav = ({navs, selected, setSelected}) => {

  return (
    <nav className="h-15 dark:border-b-dark-line-hover border-b-gray-300 border-b">
      {navs.length > 0 && 
        navs.map((item) => (
        <button key={item.id}
          className={`
            ${selected === item.id ? 'text-point border-b-3 border-b-point' : 'border-b-1 border-b-transparent'}
            font-[800] h-full px-3.5 pt-1
          `}
          onClick={() => setSelected(item.id)}
          >
            {item.title}
        </button>
      ))}
    </nav>
  )
}

export default EditNav