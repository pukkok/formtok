import PageSwitchButton from '@/components/page-switch/PageSwitchButton'

const CONTENT = {
  headLine : '한번 해보는게 빠르죠!',
  content: `폼톡을 사용하여 쉽게 설문조사를 생성하고 데이터를 분석해보세요.`,
  navigate: '/login',
  navText: '가입하기'
}

const CTA_Section = () => {

  return (
    <section className='py-20 px-10 flex flex-col items-center bg-dark-surface'>
      <h3 className='text-3xl mb-5 text-point'>{CONTENT.headLine}</h3>
      <p className='text-lg mb-10'>{CONTENT.content}</p>
      <PageSwitchButton 
        className={'px-6 py-3 font-bold text-lg bg-point rounded-lg transition-[background-color] duration-300 hover:bg-dark-point-hover'}
        to={CONTENT.navigate}>
        {CONTENT.navText}
      </PageSwitchButton>
    </section>
  )
}

export default CTA_Section