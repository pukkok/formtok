import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "./Icons";

const SearchFormWrapper = styled.form`
    & {
        border-radius: 22px;
        background-color: var(--pk-search-form-background);
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
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--pk-point);
            span{
                color: var(--pk-light-grey);
                font-size: 24px;
                font-weight: 600;
            }
        }
    }
`

/** handleClick의 첫번째 인자로 input의 value가 전달됩니다. */
function SearchForm ({placeholder='검색하기', handleClick, width}) {
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