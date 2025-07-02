const MANAGE_KEYS = ['all', 'draft', 'ready', 'active', 'finish']
const PARTICIPATE_KEYS = ['all', 'faq', 'noLogin', 'active', 'finish']
const QUESTION_BANK_KEYS = ['all', 'choice', 'dropdown', 'datetime', 'table', 'text', 'score']
// const RESULT_KEYS = ['all', 'active', 'finish']
const workColors = ['bg-point', 'bg-work-sky', 'bg-work-yellow', 'bg-work-green', 'bg-work-red', 'bg-work-gray', 'bg-work-orange']
const hoverWorkColors = ['hover:bg-point', 'hover:bg-work-sky', 'hover:bg-work-yellow', 'hover:bg-work-green', 'hover:bg-work-red', 'hover:bg-work-gray', 'hover:bg-work-orange']
const textWorkColors = ['text-point', 'text-work-sky', 'text-work-yellow', 'text-work-green', 'text-work-red', 'text-work-gray', 'text-work-orange']

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

export const QUESTION_BANK_COLOR_MAP = Object.fromEntries(
  QUESTION_BANK_KEYS.map((key, i) => [key, workColors[i]])
)

export const QUESTION_BANK_HOVER_COLOR_MAP = Object.fromEntries(
  QUESTION_BANK_KEYS.map((key, i) => [key, hoverWorkColors[i]])
)

export const QUESTION_BANK_TEXT_COLOR_MAP = Object.fromEntries(
  QUESTION_BANK_KEYS.map((key, i) => [key, textWorkColors[i]])
)

export const RESULT_COLOR_MAP = {
  all: 'bg-point',
  active: 'bg-work-green',
  finish: 'bg-work-red',
}

export const RESULT_HOVER_MAP = {
  all: 'hover:bg-point',
  active: 'hover:bg-work-green',
  finish: 'hover:bg-work-red',
}