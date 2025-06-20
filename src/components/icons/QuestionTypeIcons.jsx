import {
  MdNotes, MdShortText, MdFormatListNumbered, MdCheckBox,
  MdOutlineArrowDropDownCircle, MdCalendarToday, MdSchedule,
  MdDateRange, MdTableChart, MdGrade
} from "react-icons/md"

export const NotesIcon = (props) => <MdNotes className="text-[22px]" {...props} />
export const ShortTextIcon = (props) => <MdShortText className="text-[22px]" {...props} />
export const NumberedListIcon = (props) => <MdFormatListNumbered className="text-[22px]" {...props} />
export const CheckBoxIcon = (props) => <MdCheckBox className="text-[22px]" {...props} />
export const DropDownIcon = (props) => <MdOutlineArrowDropDownCircle className="text-[22px]" {...props} />
export const CalendarIcon = (props) => <MdCalendarToday className="text-[22px]" {...props} />
export const ScheduleIcon = (props) => <MdSchedule className="text-[22px]" {...props} />
export const DateTimeIcon = (props) => <MdDateRange className="text-[22px]" {...props} />
export const TableIcon = (props) => <MdTableChart className="text-[22px]" {...props} />
export const ScoreIcon = (props) => <MdGrade className="text-[22px]" {...props} />