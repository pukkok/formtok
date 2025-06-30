import { randomKey } from "@/utils/generateKey"

export const initialSurveyOptions = () => ({
  isOpen: false,
  isEnd: false,
  isPublic: true,
  isUseStartPeriod: false,
  startDate: '',
  isUseEndPeriod: false,
  endDate: '',
  isNeedLogin: false,
  isUseMaximum: false,
  maximumCount: null,
  isAllowConfirmation: false,
  isAllowModify: false,
  isRevealTheResult: false,
})

export const createQuestion = () => ({
  id: 'Q' + randomKey(),
  type: '객관식',
  q: '',
  d: '',
  options: [{ id: 'O' + randomKey(), answer: '' }],
  hasExtraOption: false,
  scoreRanges: { min: 1, max: 5, minText: '', maxText: '' },
  tableRows: [],
  tableCols: [],
  hasDescription: false,
  period: { start: '', end: null },
  setPeriod: false, // 날짜 타입일때 사용
  essential: false, // 필수 질문
  setNextToPage: false, // 답변별 페이지 이동
  next: null, // 다음 페이지 설정
})

export const createPage = () => ({
  id: 'P' + randomKey(),
  title: '',
  description: '',
  questions: [createQuestion()],
  next: null,
})

export const initialEndingMent = () => ({
  title: '', description: ''
})