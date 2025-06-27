import dayjs from "dayjs"

const colorKeys = ['point', 'sky', 'yellow', 'green', 'red']

export const MANAGE_WORK_TYPES = ['all', 'draft', 'ready', 'active', 'finish']
export const PARTICIPATE_WORK_TYPES = ['all', 'faq', 'noLogin', 'active', 'finish']

const makeColorMap = (types, prefix = 'bg-') =>
  Object.fromEntries(types.map((type, i) => [type, `${prefix}work-${colorKeys[i]}`.replace('work-point', 'point')]))

export const MANAGE_WORK_COLOR_MAP = makeColorMap(MANAGE_WORK_TYPES, 'bg-')
export const MANAGE_WORK_HOVER_MAP = makeColorMap(MANAGE_WORK_TYPES, 'hover:bg-')

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

export const PARTICIPATE_WORK_COLOR_MAP = makeColorMap(PARTICIPATE_WORK_TYPES, 'bg-')
export const PARTICIPATE_WORK_HOVER_MAP = makeColorMap(PARTICIPATE_WORK_TYPES, 'hover:bg-')