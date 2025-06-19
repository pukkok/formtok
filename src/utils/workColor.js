import dayjs from "dayjs"

export const workColors = {
  draft: '#779ECB',     // 설문 작성 중
  ready: '#FFD700',     // 설문 시작 준비
  active: '#77DD77',    // 설문 진행 중
  finish: '#ff6961'     // 응답 종료
}

export const manageWorkColorPick = ({isOpen, isEnd, isUseStartPeriod, startDate, endDate}) => {
  const now = dayjs()
  const start = startDate ? dayjs(startDate) : null
  const end = endDate ? dayjs(endDate) : null

  if (isEnd) return {work: 'finish', color: workColors.finish} // 설문 종료
  if (!isOpen) return {work: 'draft', color: workColors.draft} // 설문 작성 중
  if (!isUseStartPeriod || (start?.isBefore(now) && (!end || end?.isAfter(now)))) return {work: 'active', color: workColors.active} // 설문 진행 중
  if (start?.isAfter(now)) return {work: 'ready', color: workColors.ready} // 설문 시작 전
  if (end?.isBefore(now)) return {work:'finish', color: workColors.finish} // 설문 종료

  return ''
}

export const MANAGE_WORK_COLOR_MAP = {
  all: 'bg-point',
  draft: 'bg-work-draft',
  ready: 'bg-work-ready',
  active: 'bg-work-active',
  finish: 'bg-work-finish',
}
export const MANAGE_WORK_HOVER_MAP = {
  all: 'hover:bg-point',
  draft: 'hover:bg-work-draft',
  ready: 'hover:bg-work-ready',
  active: 'hover:bg-work-active',
  finish: 'hover:bg-work-finish',
}