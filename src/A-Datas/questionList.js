import { 
  MdNotes, MdShortText, MdFormatListNumbered, MdCheckBox, MdArrowDropDownCircle, 
  MdCalendarToday, MdSchedule, MdDateRange, MdTableChart, MdGrade 
} from "react-icons/md";
import styled, {css} from 'styled-components';

// 공통 스타일을 적용한 아이콘 컴포넌트
const iconStyle = css`
  font-size: 22px;
`
  
const NotesIcon = styled(MdNotes)`${iconStyle}`
const ShortTextIcon = styled(MdShortText)`${iconStyle}`
const NumberedListIcon = styled(MdFormatListNumbered)`${iconStyle}`
const CheckBoxIcon = styled(MdCheckBox)`${iconStyle}`
const DropDownIcon = styled(MdArrowDropDownCircle)`${iconStyle}`
const CalendarIcon = styled(MdCalendarToday)`${iconStyle}`
const ScheduleIcon = styled(MdSchedule)`${iconStyle}`
const DateTimeIcon = styled(MdDateRange)`${iconStyle}`
const TableIcon = styled(MdTableChart)`${iconStyle}`
const ScoreIcon = styled(MdGrade)`${iconStyle}`
  
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