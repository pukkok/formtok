import React from "react";
import ContentEditable from "react-contenteditable";

function DescriptionInput ({value, placeholder, changeHandler}) {

    return <div className="content-editor-wrapper">
    {!value && <div className="content-placeholder">{placeholder}</div>}
    <ContentEditable 
    className="content-editor"
    html={value}
    onChange={changeHandler}/>
</div>
}
export default DescriptionInput