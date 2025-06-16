import loginBg from '@/assets/login-bg.jpg'

const LoginPageCover = ({ children }) => {

  return (
    <section 
      className={`
        w-full h-screen bg-deep-dark bg-size-[cover]
        
        after:content-[""] 
        after:absolute 
        after:top-0 after:left-0 
        after:w-full after:h-full 
        after:bg-deep-dark/70
        `} 
      style={{backgroundImage : `url(${loginBg.src})`}}>
      <div className='relative mx-auto h-screen w-[1000px] z-10'>
        {children}
      </div>
    </section>
  )
}

export default LoginPageCover