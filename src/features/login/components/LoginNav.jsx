import NavigateButton from "@/components/NavigateButton"
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon"
import { HomeIcon } from "@/components/icons/HomeIcon"

const NAVS = [
  {to: 'back', icon: <ArrowBackIcon className="dark:hover:text-light-w hover:text-point cursor-pointer"/>},
  {to: '/', icon: <HomeIcon className="hover:text-light-w hover:text-point cursor-pointer"/>}
]

const LoginNav = () => {

  return (
    <div className="flex justify-between">
      {NAVS.map(item => (
        <NavigateButton 
        key={item.to}
          className={'text-light-purple'}
          to={item.to}
        >
          {item.icon}
        </NavigateButton>
      ))}
    </div>
  )
}

export default LoginNav