import loginBg from '@/assets/login-bg.jpg'

const LoginPageCover = ({ children }) => {

  return (
    <section 
      className={`
        w-full h-screen bg-dark-base bg-size-[cover]
        
        after:content-[""] 
        after:absolute 
        after:top-0 after:left-0 
        after:w-full after:h-full 
        dark:after:bg-dark-base/70 after:bg-bright-a/30
        `} 
      style={{backgroundImage : `url(${loginBg.src})`}}>
      <div className='relative mx-auto h-screen w-[1000px] z-10'>
        {children}
      </div>
    </section>
  )
}

export default LoginPageCover