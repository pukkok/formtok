import { NotesIcon, ShortTextIcon, NumberedListIcon, CheckBoxIcon, DropDownIcon, CalendarIcon, ScheduleIcon, DateTimeIcon, TableIcon, ScoreIcon } from "../A-Components/Icons/Icons";
  
const questionList = [
  { code: 'notes', type: '서술형', icon: <NotesIcon /> },
  { code: 'short_text', type: '단답형', icon: <ShortTextIcon /> },
  { code: 'format_list_numbered', type: '객관식', icon: <NumberedListIcon /> },
  { code: 'select_check_box', type: '객관식(복수 선택)', icon: <CheckBoxIcon /> },
  { code: 'arrow_drop_down_circle', type: '드롭다운', icon: <DropDownIcon /> },
  { code: 'calendar_today', type: '날짜', icon: <CalendarIcon /> },
  { code: 'schedule', type: '시간', icon: <ScheduleIcon /> },
  { code: 'calendar_clock', type: '날짜 + 시간', icon: <DateTimeIcon /> },
  { code: 'table_rows', type: '표형', icon: <TableIcon /> },
  { code: 'commit', type: '점수 선택형', icon: <ScoreIcon /> }
]
  
export default questionList