import React from "react";
import classNames from "classnames";
import useOutsideClick from "../hooks/useOutsideClick";
import StyledCKEdtior from "../styles/StyledCKEditor";
import CustomEditor from "../ckeditor/CustomEditor";
function DescriptionEditor({ value, placeholder, handleChange, pi, qi, ending}) {
	const { isOpen, setIsOpen, ref } = useOutsideClick(false)

	return (
		<StyledCKEdtior>
			<div
			onFocus={() => setIsOpen(true)}
			ref={ref}
			onKeyDown={e => e.key === 'Tab' && setIsOpen(false)}
			className={classNames("content-editor-wrapper", { on: isOpen })}>

				<CustomEditor
				value={value}
				placeholder={placeholder}
				onChange={(e, editor) => {
					const data = editor.getData()
					handleChange && handleChange(data, pi, qi)
				}}/>
				
			</div>
		</StyledCKEdtior>
	)
}

export default DescriptionEditor
