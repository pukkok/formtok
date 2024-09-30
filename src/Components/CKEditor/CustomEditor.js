import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	AutoImage,
	AutoLink,
	Autosave,
	Base64UploadAdapter,
	Bold,
	CloudServices,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	ImageBlock,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Italic,
	Link,
	List,
	ListProperties,
	Paragraph,
	RemoveFormat,
	SelectAll,
	SpecialCharacters,
	Strikethrough,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	Underline,
	Undo
} from 'ckeditor5';
import translations from 'ckeditor5/translations/ko.js';
import 'ckeditor5/ckeditor5.css';

function CustomEditor({value, onChange, placeholder, isReadOnly=false}) {
	const editorConfig = {
		toolbar: {
			items: [
				// 'undo',
				// 'redo',
				// '|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'removeFormat',
				'|',
                'bulletedList',
				'numberedList',
                '|',
				// 'fontSize',
				// 'fontFamily',
				// 'fontColor',
				// 'fontBackgroundColor',
				// '|',
				// 'insertTable',
				'insertImage',
				'link',				
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			AutoImage,
			AutoLink,
			Autosave,
			Base64UploadAdapter,
			Bold,
			CloudServices,
			Essentials,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			GeneralHtmlSupport,
			ImageBlock,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageToolbar,
			ImageUpload,
			Italic,
			Link,
			List,
			ListProperties,
			Paragraph,
			RemoveFormat,
			SelectAll,
			SpecialCharacters,
			Strikethrough,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			Underline,
			Undo
		],
		fontFamily: {
			supportAllValues: true
		},
		fontSize: {
			options: [10, 12, 14, 'default', 18, 20, 22],
			supportAllValues: true
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			]
		},
		image: {
			toolbar: [
				'imageTextAlternative',
				'|',
				'imageStyle:alignBlockLeft',
				'imageStyle:block',
				'imageStyle:alignBlockRight',
				'|',
				'resizeImage'
			],
			styles: {
				options: ['alignBlockLeft', 'block', 'alignBlockRight']
			}
		},
		language: 'ko',
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true
			}
		},
		placeholder: placeholder || "",
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		},
		translations: [translations]
	}

    return (
        <CKEditor 
        editor={ClassicEditor}
        data={value || ""}
        config={editorConfig}
        onChange={onChange}
		disabled={isReadOnly}
        />
	)
}

export default CustomEditor