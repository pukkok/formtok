import { IoIosClose } from "react-icons/io";
import styled, { css } from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { 
  MdNotes, MdShortText, MdFormatListNumbered, MdCheckBox, MdOutlineArrowDropDownCircle, 
  MdCalendarToday, MdSchedule, MdDateRange, MdTableChart, MdGrade 
} from "react-icons/md";
import { MdOutlineContactPage, MdOutlineFindInPage, MdOutlineInventory, MdEqualizer } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { LuFolderCog, LuSettings } from "react-icons/lu";
import { LuCopyPlus } from "react-icons/lu";
import { CgRemoveR } from "react-icons/cg";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";

const strokeStyle = css`
  font-size: 20px;
  stroke-width: 2.3px;
`

const boxStyle = css`
  font-size: 22px;
`

// 애로우 다운
export const ArrowDownIcon = styled(MdOutlineArrowDropDown)`${boxStyle}`

// 더보기 버튼
export const MoreVerticalIcon = styled(FiMoreVertical)`${strokeStyle}`

// 검색아이콘
export const SearchIcon = styled(FaSearch)`${strokeStyle}`

// 링크 쉐어 아이콘
export const LinkIcon = styled(FaLink)`${strokeStyle}`

// 화살표 왼쪽 오른쪽
export const ArrowLeftIcon = styled(GoArrowLeft)`${boxStyle}`
export const ArrowRightIcon = styled(GoArrowRight)`${boxStyle}`

// 체크 아이콘
export const CheckVIcon = styled(FaCheck)`${strokeStyle}`

// 닫기
export const CloseIcon = styled(IoIosClose)`${strokeStyle}`
// 뒤로가기
export const BackIcon = styled(IoArrowBack)`${strokeStyle}`

// 복사
export const CopyIcon = styled(LuCopyPlus)`${boxStyle}`
// 삭제 - 더 좋은 아이콘을 찾으면 바꾸자
export const DeleteIcon = styled(CgRemoveR)`${boxStyle}`

// 사이드바 네비게이션 아이콘

// 홈
export const HomeIcon = styled(FiHome)`${strokeStyle}`
// 내 설문지
export const MyFormIcon = styled(MdOutlineContactPage)`${boxStyle}`
// 제작하기
export const EidtIcon = styled(FaRegEdit)`${strokeStyle}`
// 결과 확인
export const ResultIcon = styled(MdOutlineFindInPage)`${boxStyle}`
// 문항 관리
export const QuestionListIcon = styled(LuFolderCog)`${boxStyle}`
// 참여하기
export const FormListIcon = styled(MdOutlineInventory)`${boxStyle}`
// 대시보드
export const DashBoardIcon = styled(MdEqualizer)`${boxStyle}`
// 설정
export const SettingIcon = styled(LuSettings)`${boxStyle}`


// 질문 유형 아이콘

//서술형
export const NotesIcon = styled(MdNotes)`${boxStyle}`
// 단답형
export const ShortTextIcon = styled(MdShortText)`${boxStyle}`
// 객관식
export const NumberedListIcon = styled(MdFormatListNumbered)`${boxStyle}`
// 객관식(복수 선택)
export const CheckBoxIcon = styled(MdCheckBox)`${boxStyle}`
// 드롭다운
export const DropDownIcon = styled(MdOutlineArrowDropDownCircle)`${boxStyle}`
// 날짜
export const CalendarIcon = styled(MdCalendarToday)`${boxStyle}`
// 시간
export const ScheduleIcon = styled(MdSchedule)`${boxStyle}`
// 날짜 + 시간
export const DateTimeIcon = styled(MdDateRange)`${boxStyle}`
// 표형
export const TableIcon = styled(MdTableChart)`${boxStyle}`
// 점수 선택형
export const ScoreIcon = styled(MdGrade)`${boxStyle}`