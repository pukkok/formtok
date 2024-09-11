// import classNames from "classnames";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// import React, { useEffect, useRef, useState } from "react";
// import useOutsideClick from "../hooks/useOutsideClick";
// import usePageActions from "../hooks/usePageActions";

// function DescriptionInput({ value, placeholder, pi, changeHandler }) {
// 	const editorRef = useRef(null)
// 	const [editorContent, setEditorContent] = useState(value) // 에디터 내용을 저장하는 state

// 	const { isOpen, setIsOpen, ref } = useOutsideClick()

// 	const { changePDescription } = usePageActions()

// 	const toolbarOptions = [
// 		// [{ 'font-size': [] }],
// 		["bold", "italic", "underline", "strike"],
// 		[{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
// 		["link", "image"],
// 	]

// 	// 텍스트가 변경될 때 실행할 함수
// 	const handleTextChange = (quillEditor) => {
// 		setEditorContent(quillEditor.root.innerHTML)
// 	}

// 	useEffect(() => {
// 		const quillEditor = new Quill(editorRef.current, {
// 			theme: "snow",
// 			modules: {
// 				history: {
// 					delay: 100,
// 				},
// 				toolbar: toolbarOptions,
// 			},
// 			placeholder: placeholder,
// 		})

// 		// quillEditor에서 'text-change' 이벤트가 발생할 때마다 handleTextChange를 호출
// 		quillEditor.on("text-change", () => handleTextChange(quillEditor))
// 	}, [])

// 	useEffect(() => {
// 		const quillEditor = new Quill(editorRef.current, {
// 		theme: "snow",
// 		modules: {
// 			history : {
// 				delay: 100
// 			},
// 			toolbar: toolbarOptions, // 툴바 활성화
// 		},
// 		placeholder : placeholder
// 		})

// 		// 입력 값 변경 시 저장
// 		quillEditor.on("text-change", () => {
// 			// HTML이 아닌 실제 텍스트 내용이 있는지 확인
// 			const text = quillEditor.getText().trim() // 실제 텍스트만 가져옴
// 			if (text.length > 0) {
// 				setEditorContent(quillEditor.root.innerHTML)
// 			} else {
// 				setEditorContent('') // 텍스트가 없으면 content를 빈 값으로 설정
// 			}
// 		})
// 	}, [])

// 	useEffect(() => {
// 		changePDescription(editorContent, pi)
// 	}, [editorContent])

// 	return (
// 		<div ref={ref}
// 		onClick={setIsOpen}
// 		className={classNames("content-editor-wrapper", {on: isOpen})}>
// 		{/* {!editorContent && <div className="content-placeholder">{placeholder}</div>} */}
// 		<div
// 			className="content-editor"
// 			ref={editorRef}
// 		/>
// 		</div>
// 	)
// }

// export default DescriptionInput

import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classNames from "classnames";

function DescriptionInput({ value, placeholder, changeHandler }) {
	const [editorContent, setEditorContent] = useState(value);
	const [onFocus, setOnfocus] = useState(false)

	console.log(onFocus)

  	return (
    <div className={classNames("content-editor-wrapper", {on: onFocus})}>
		<CKEditor
			editor={ClassicEditor}
			data={editorContent || ""}
			config={{
			toolbar: ["bold", "italic", "underline", '|', "bulletedList", "numberedList", '|' , "link"], 
			placeholder: placeholder,
			}}
			onFocus={()=>setOnfocus(true)}
			onBlur={()=>setOnfocus(false)}
			onChange={(event, editor) => {
			const data = editor.getData()
			setEditorContent(data) // 에디터의 내용을 상태에 저장
			//   changeHandler && changeHandler(data); // 부모로 변경된 값 전달
			}}
		/>
    </div>
  )
}

export default DescriptionInput
