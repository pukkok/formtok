import React from "react";
import classNames from "classnames";
import useOutsideClick from "../../Hooks/useOutsideClick";
import { CKEditorWrapper } from "./StyledCKEditor";
import CustomEditor from "./CustomEditor";

function DescriptionEditor({ value, placeholder, handleChange, pi, qi, isReadOnly=false}) {
	const { isOpen, setIsOpen, ref } = useOutsideClick(false)

	return (
		<CKEditorWrapper
		onFocus={() => !isReadOnly && setIsOpen(true)}
		ref={ref}
		aria-disabled = {isReadOnly}
		onKeyDown={e => e.key === 'Tab' && setIsOpen(false)}
		className={classNames("ck-editor-wrapper", { on: isOpen })}
		>
			<CustomEditor
			value={value}
			placeholder={placeholder}
			isReadOnly={isReadOnly}
			onChange={(_, editor) => {
				const data = editor.getData()
				handleChange && handleChange(data, pi, qi)
			}}/>
			
		</CKEditorWrapper>
	)
}

export default DescriptionEditor
