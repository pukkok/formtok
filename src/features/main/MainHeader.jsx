import NavigateButton from "../../A-Components/Buttons/NavigateButton"
import FormTokLogo from "../../A-Components/FormTokLogo"
import PageSwitchButton from "../../A-Components/PageSwitch/PageSwitchButton"

const MainHeader = () => {

  // const buttons = [
  //   {to : '/form-list', title: '문의하기', wrap : <PageSwitchButton />},

  // ]

  return (
    <header className={`w-full px-0 py-2.5 
      fixed top-0 left-0 right-0
      bg-gradient-to-r from-[#5B1FB7] from-60% to-[#f06292]
      z-10
      `}
    >
      <nav className="flex mx-auto items-center max-w-main-wrap">
        <NavigateButton 
          className={`flex items-center gap-[10px] cursor-point`}
          to={"/"}  
        >
          <FormTokLogo boxSize={40} madeFix={'white'}/>
          <h3>폼톡</h3>
        </NavigateButton>
        <ul className="ml-auto flex items-center gap-4">
          <li className="text-[17px] font-bold"><PageSwitchButton>문의하기</PageSwitchButton></li>
          <li className="text-[17px] font-bold">
            <PageSwitchButton 
              to={'/login'}
              className={`
              block
              rounded-[50px] py-2 px-6 box-border
              bg-gradient-to-r from-[#f06292] from-0% via-[#7E37ED] via-50% to-[#f06292]
              bg-size-[200%_100%]
              bg-position-[0%_0%]
              shadow-[0px_4px_8px_rgba(0,0,0,0.2),0px_6px_20px_rgba(0,0,0,0.1)]
              transition-[background-position] duration-400 ease-in-out
              hover:bg-position-[100%_0%] 
              active:scale-[0.98] active:shadow-[0px_2px_4px_rgba(0,0,0,0.2),0px_4px_10px_rgba(0,0,0,0.1)]
              `}>
              로그인
            </PageSwitchButton>
          </li>
        </ul>
      </nav>

    </header>
  )
}

export default MainHeader