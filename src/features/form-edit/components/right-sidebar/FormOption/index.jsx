import React from "react"
import OptionInput from "./OptionInput"
import FormListStyleSelector from "./FormListStyleSelector"
import Head4 from "./Head4.style"
import ToggleOption from "./ToggleOption"

export const SURVEY_MANAGEMENT_OPTIONS = [
  { label: '게시', script: '응답 수집을 시작합니다.', option: 'isOpen' },
  { label: '종료', script: '응답 수집을 강제로 종료합니다.', option: 'isEnd' },
]

export const SURVEY_PERIOD_OPTIONS = [
  {
    label: '시작일 설정',
    script: `설문조사의 시작일을 입력하지 않은 경우\n설문조사의 기간은 게시 시점부터 시작됩니다.`,
    option: 'isUseStartPeriod'
  },
  {
    label: '종료일 설정',
    script: `종료일을 설정할 경우, 시간이 만료됨과 동시에\n설문조사가 종료됩니다.`,
    option: 'isUseEndPeriod'
  }
]

export const PARTICIPATION_OPTIONS = [
  {
    label: '전체 공개 설정',
    script: `설문지가 참여하기에 공개 됩니다.\n설문지 전체 공개에 동의하시는 경우 버튼을 켜주세요.`,
    option: 'isPublic'
  },
  {
    label: '로그인 필수',
    script: `로그인 한 유저만 참여 가능합니다.`,
    option: 'isNeedLogin'
  },
  {
    label: '최대 참여 수 설정',
    script: `최대인원을 설정합니다.\n최대 인원은 10,000명 까지입니다.`,
    option: 'isUseMaximum'
  },
  {
    label: '설문 대상 설정',
    script: `업데이트 예정`,
    option: null // 아직 기능 없음
  },
]

export const PARTICIPANT_PERMISSIONS_OPTIONS = [
  {
    label: '답변 확인 허용',
    script: `설문 참여 후, 본인이 작성한 답변을 확인할 수 있습니다.`,
    option: 'isAllowConfirmation',
    useUp: true
  },
  {
    label: '답변 수정 허용',
    script: `설문 제출 후, 본인이 작성한 답변을 수정할 수 있습니다.`,
    option: 'isAllowModify',
    useUp: true
  },
  {
    label: '설문 결과 공개',
    script: `참여자에게 설문 결과를 공개합니다.`,
    option: 'isRevealTheResult',
    useUp: true
  },
]

const FormOption = () => {

  return (
    <div className="w-full h-[calc(100vh-60px)] overflow-scroll box-border pt-2.5 pl-4 pr-6 pb-8">
      <FormListStyleSelector />

      <Head4>설문지 관리</Head4>
      {SURVEY_MANAGEMENT_OPTIONS.map(opt => (
        <ToggleOption key={opt.label} {...opt} />
      ))}

      <Head4>설문 기간 설정</Head4>
      {SURVEY_PERIOD_OPTIONS.map(opt => (
        <React.Fragment key={opt.label}>
          <ToggleOption {...opt} />
          <OptionInput option={opt.option}/>
        </React.Fragment>
      ))}
      
      <Head4>설문 참여 설정</Head4>
      {PARTICIPATION_OPTIONS.map(opt => (
        <React.Fragment key={opt.label}>
          <ToggleOption {...opt} />
          {opt.option === 'isUseMaximum' && 
            <OptionInput option={opt.option} type="number" placeholder="0"/>
          }
        </React.Fragment>
      ))}

      <Head4>참여자 권한 설정</Head4>
      {PARTICIPANT_PERMISSIONS_OPTIONS.map(opt => (
        <ToggleOption key={opt.label} {...opt} />
      ))}
    </div>
  )
}

export default FormOption