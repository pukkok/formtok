import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "./Icons";

const SearchFormWrapper = styled.form`
    & {
        border-radius: 12px;
        background-color: var(--pk-dark);
        min-width: 310px;
        max-width: 400px;
        height: 50px;
        padding: 6px;
        display: flex;
        & > * {
            height: 100%;
        }
        input{
            padding-left: 10px;
            flex: 1;
        }
        button{
            margin-left: auto;
            display: flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 16px;
            background-color: var(--pk-point);
            span{
                font-size: 24px;
                font-weight: 700;
            }
        }
    }
`

/** handleClick의 첫번째 인자로 input의 value가 전달됩니다. */
function SearchForm ({placeholder='검색하기', handleClick}) {
    const [searchWord, setSearchWord] = useState('')
    
    const search = (e, word) => {
        e.preventDefault()
        handleClick && handleClick(word)
    }

    return (
        <SearchFormWrapper>
            <input placeholder={placeholder} 
            onChange={e=>setSearchWord(word => word = e.target.value)} value={searchWord}/>
            <button className="search-btn" onClick={e=>search(e, searchWord)}>
                <Icon code={'search'}/>
            </button>
        </SearchFormWrapper>
    )
}

export default SearchForm