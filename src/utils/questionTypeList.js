import {
  NotesIcon, ShortTextIcon, NumberedListIcon, CheckBoxIcon, DropDownIcon,
  CalendarIcon, ScheduleIcon, DateTimeIcon, TableIcon, ScoreIcon
} from "@/components/icons/QuestionTypeIcons"

export const questionTypeList = [
  { type: '서술형', icon: <NotesIcon /> },
  { type: '단답형', icon: <ShortTextIcon /> },
  { type: '객관식', icon: <NumberedListIcon /> },
  { type: '객관식(복수 선택)', icon: <CheckBoxIcon /> },
  { type: '드롭다운', icon: <DropDownIcon /> },
  { type: '날짜', icon: <CalendarIcon /> },
  { type: '시간', icon: <ScheduleIcon /> },
  { type: '날짜 + 시간', icon: <DateTimeIcon /> },
  { type: '표형', icon: <TableIcon /> },
  { type: '점수 선택형', icon: <ScoreIcon /> },
]

// 타입 → 아이콘 매핑 Map
export const questionTypeMap = new Map(
  questionTypeList.map(q => [q.type, q.icon])
)
