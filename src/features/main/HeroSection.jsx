import ani from '@/animations/HeroUp.module.css'
import PageSwitchButton from '@/components/page-switch/PageSwitchButton'
import cloud from '@/assets/cloud.png'
import hero from '@/assets/hero-image.png'

const CONTENT = {
  summary : '폼톡 - 당신의 의견을 나눠 보세요. 쉽게 사용하는 오픈 설문 플랫폼',
  headLine : `나만의 대시보드를 \n만들어 보세요`,
  detail: `조사, 분석, 자료정리까지 쉽고 빠르게 설문지를 만들어 보세요 \n대시보드를 사용해 응답받은 자료를 정리해보세요`,
  navigate: '/my-form/manage',
  navText: '시작하기'
}

const HeroSection = () => {

  return (
    <section className={` w-full h-[90vh] relative overflow-hidden bg-linear-to-r from-[#5B1FB7] from-60% to-[#f06292]`}>
      <div className='absolute w-full h-full bg-size-[900px_auto] bg-no-repeat bg-bottom-right' style={{ backgroundImage : `url(${cloud.src})`}}/>

      <article className='relative top-1/2 my-0 mx-auto -translate-y-1/2 max-w-main-wrap'>
        <div className='flex flex-col items-start gap-4 whitespace-pre'>
          <p className='text-base'>{CONTENT.summary}</p>
          <h1 className='text-6xl'>{CONTENT.headLine}</h1>
          <h4 className='text-xl/1.1 text-[#AF7EFF]'>{CONTENT.detail}</h4>
          <PageSwitchButton 
            className={`rounded-[55px]
              bg-linear-to-r from-[#7E37ED] from-0% via-[#f06292] via-50% to-[#7E37ED]
              shadow-[0px_4px_8px_rgba(0,0,0,0.2),0px_6px_20px_rgba(0,0,0,0.1)]
              py-3 px-7
              bg-size-[200%_100%] bg-position-[0%_0%]
              transition-[background-position] duration-400 ease-in-out

              hover:bg-position-[100%_0%]
              active:scale-[0.98] active:shadow-[0px_2px_4px_rgba(0,0,0,0.2),0px_4px_10px_rgba(0,0,0,0.1)]
              `}
            to={CONTENT.navigate}>{CONTENT.navText}
          </PageSwitchButton>
        </div>

        <div className={`${ani['hero-up']} absolute right-0 top-[100vh] max-w-[780px] h-fit`}>
          <img className='drop-shadow-[-2px_8px_14px_#444466]' src={hero.src} alt='hero'/>
        </div>
      </article>
    </section>
  )
}

export default HeroSection