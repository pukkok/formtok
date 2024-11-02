import React from "react";

function List({list, handleClick}) {
  return (
    <ul>
      {list.map(item => {
        <li><button onClick={handleClick}>{item?.text}</button></li>
      })}
    </ul>
  )
}