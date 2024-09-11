import classNames from "classnames";
import React from "react";

function RadioButton ({isSelect}) {
    return <button className={classNames("radio-button", {select: isSelect})}>
        <span></span>
    </button>
}
export default RadioButton