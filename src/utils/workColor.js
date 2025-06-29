import dayjs from "dayjs"

const MANAGE_KEYS = ['all', 'draft', 'ready', 'active', 'finish']
const PARTICIPATE_KEYS = ['all', 'faq', 'noLogin', 'active', 'finish']
const workColors = ['bg-point', 'bg-work-sky', 'bg-work-yellow', 'bg-work-green', 'bg-work-red']

export const MANAGE_WORK_COLOR_MAP = Object.fromEntries(
  MANAGE_KEYS.map((key, i) => [key, workColors[i]])
)

export const MANAGE_WORK_HOVER_MAP = Object.fromEntries(
  MANAGE_KEYS.map((key, i) => [key, `hover:${workColors[i]}`])
)

export const manageWorkColorPick = ({isOpen, isEnd, isUseStartPeriod, startDate, endDate}) => {

  const now = dayjs()
  const start = startDate ? dayjs(startDate) : null
  const end = endDate ? dayjs(endDate) : null

  if (isEnd) return {work: 'finish', color: MANAGE_WORK_COLOR_MAP['finish']} // 설문 종료
  if (!isOpen) return {work: 'draft', color: MANAGE_WORK_COLOR_MAP['draft']} // 설문 작성 중
  if (!isUseStartPeriod || (start?.isBefore(now) && (!end || end?.isAfter(now)))) return {work: 'active', color: MANAGE_WORK_COLOR_MAP['active']} // 설문 진행 중
  if (start?.isAfter(now)) return {work: 'ready', color: MANAGE_WORK_COLOR_MAP['ready']} // 설문 시작 전
  if (end?.isBefore(now)) return {work:'finish', color: MANAGE_WORK_COLOR_MAP['finish']} // 설문 종료

  return ''
}

export const PARTICIPATE_WORK_COLOR_MAP = Object.fromEntries(
  PARTICIPATE_KEYS.map((key, i) => [key, workColors[i]])
)

export const PARTICIPATE_WORK_HOVER_MAP = Object.fromEntries(
  PARTICIPATE_KEYS.map((key, i) => [key, `hover:${workColors[i]}`])
)