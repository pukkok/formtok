import FeatureCard from './components/FeatureCard'

const CONTENTS = [
	{
    describe: 'write',
    headLine: '간편한 설문지 작성',
    content: `나만의 설문지를 쉽고 빠르게 작성하세요. \n다양한 질문 타입을 지원하며\n 사용자 경험에 맞춘 직관적인 인터페이스로 누구나 설문을 만들 수 있습니다.`
  },
  {
    describe: 'analysis',
    headLine: '실시간 데이터 분석',
    content: `실시간으로 응답 데이터를 받아보세요. 수집된 데이터를 한눈에 확인하고, 참여자의 통찰력 있는 피드백을 통해 더욱 풍성한 분석 결과를 얻으세요.`
  },
  {
    describe: 'my-dashboard',
    headLine: '나만의 대시보드 구성',
    content: `설문 결과를 시각적으로 커스터마이징해보세요. 그래프, 차트 등 다양한 분석 도구를 활용해 데이터를 의미 있게 정리하고 공유할 수 있습니다.`
  }
]


function FeatureSection() {
	
	return (
		<section className='p-5 bg-[#fff] flex flex-col items-center'>
			<div className='relative flex justify-end gap-10 w-full max-w-main-wrap'>
				{CONTENTS.map(item => {
					const {describe, headLine, content} = item
					return <FeatureCard 
						key={describe}
						describe={describe} 
						headLine={headLine} 
						content={content}
					/>
				})}
			</div>
		</section>
	)
}

export default FeatureSection