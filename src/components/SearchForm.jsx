'use client'

import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"

/** handleClick의 첫번째 인자로 input의 value가 전달됩니다. */
const SearchForm = ({placeholder='검색하기', search, resetKey=0}) => {
    const [searchWord, setSearchWord] = useState('')
    
    const searchAction = (e, word) => {
      e.preventDefault()
      search && search(word)
    }

    useEffect(() => {
      setSearchWord('')
    }, [resetKey])

    return (
        <form className={`rounded-[22px] w-sm h-12.5 p-1.5 flex
        dark:bg-dark-hover bg-[#ddd]`}>
          <input 
            className="pl-2.5 h-full flex-1 outline-none"
            placeholder={placeholder} 
            onChange={(e) => setSearchWord(word => word = e.target.value)} value={searchWord}/>
          <button 
            className="ml-auto flex items-center justify-center w-10 h-10 rounded-full text-light-w bg-point" 
            onClick={(e) => searchAction(e, searchWord)}>
              <FaSearch />
          </button>
        </form>
    )
}

export default SearchForm