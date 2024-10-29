import React from "react";
import classNames from "classnames";
import styled from "styled-components";

const StyledSearchFilter = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  background-color: ${({ isActive, bgColor }) => isActive ? 
  bgColor ? bgColor : 'var(--pk-point)' : 
  'var(--pk-survey-card)'};
  color: ${({ isActive }) => isActive ? '#fff' : 'var(--pk-dark-grey)'};
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ bgColor }) => bgColor || 'var(--pk-point)'};
    color: #fff;
  }
`

function SearchFilter({ filters = [], fitering = null, active = null }) {
  return (
    <StyledSearchFilter>
      {filters.map((filter) => {
        const { work, text, bgColor } = filter;
        return (
          <FilterButton
            key={text}
            bgColor={bgColor}
            isActive={active === work}
            className={classNames(work)}
            onClick={() => fitering(work)}
          >
            {text}
          </FilterButton>
        )
      })}
    </StyledSearchFilter>
  )
}

export default SearchFilter
