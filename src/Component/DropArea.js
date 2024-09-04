import React, { useState } from "react";
import './DropArea.css'

const DropArea = ({ onDrop }) => {
    const [showDrop, setShowDrop] = useState(false)

    return <section 
    onDragEnter={() => setShowDrop(true)}
    onDragLeave={() => setShowDrop(false)}
    onDragOver={e => e.preventDefault()}
    onDrop={()=>{
        onDrop()
        setShowDrop(false)
    }}
    className={showDrop ? "drop-area" : 'hide-drop'}>
    {showDrop && 'Drop Here'}
    </section>
}

export default DropArea