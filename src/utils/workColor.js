const MANAGE_KEYS = ['all', 'draft', 'ready', 'active', 'finish']
const PARTICIPATE_KEYS = ['all', 'faq', 'noLogin', 'active', 'finish']
const workColors = ['bg-point', 'bg-work-sky', 'bg-work-yellow', 'bg-work-green', 'bg-work-red']
const hoverWorkColors = ['hover:bg-point', 'hover:bg-work-sky', 'hover:bg-work-yellow', 'hover:bg-work-green', 'hover:bg-work-red']

export const MANAGE_WORK_COLOR_MAP = Object.fromEntries(
  MANAGE_KEYS.map((key, i) => [key, workColors[i]])
)

export const MANAGE_WORK_HOVER_MAP = Object.fromEntries(
  MANAGE_KEYS.map((key, i) => [key, hoverWorkColors[i]])
)

export const PARTICIPATE_WORK_COLOR_MAP = Object.fromEntries(
  PARTICIPATE_KEYS.map((key, i) => [key, workColors[i]])
)

export const PARTICIPATE_WORK_HOVER_MAP = Object.fromEntries(
  PARTICIPATE_KEYS.map((key, i) => [key, hoverWorkColors[i]])
)