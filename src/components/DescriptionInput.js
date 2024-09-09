import React from "react";
import ContentEditable from "react-contenteditable";

function DescriptionInput ({value, placeholder, changeHandler}) {

    return <div className="content-editor-wrapper">
    {!value && <p className="content-placeholder">{placeholder}</p>}
    <ContentEditable 
    className="content-editor" 
    tagName="p"
    html={value}
    onChange={changeHandler}/>
</div>
}
export default DescriptionInput