import LongTextPreview from './LongTextPreview'
import ShortTextPreview from './ShortTextPreview'
import SelectOnePreview from './SelectOnePreview'
import SelectMultiplePreview from './SelectMultiplePreview'
import DropDownPreview from './DropDownPreview'
import DateTypePreview from './DateTypePreview'
import SelectScorePreview from './SelectScorePreview'

const QuestionPreviewRenderer = ({ questionType, ...props }) => (
  <div className="my-5">
    {questionType === '서술형' && <LongTextPreview {...props} />}
    {questionType === '단답형' && <ShortTextPreview {...props} />}
    {questionType === '객관식' && <SelectOnePreview {...props} />}
    {questionType === '객관식(복수 선택)' && <SelectMultiplePreview {...props} />}
    {questionType === '드롭다운' && <DropDownPreview {...props} />}
    {['날짜', '시간', '날짜 + 시간'].includes(questionType) && <DateTypePreview questionType={questionType} {...props} />}
    {questionType === '점수 선택형' && <SelectScorePreview {...props} />}
  </div>
)

export default QuestionPreviewRenderer
