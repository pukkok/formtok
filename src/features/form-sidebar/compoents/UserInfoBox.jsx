import { useAuthStore } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"
import { LuLogIn, LuLogOut } from "react-icons/lu"
import { VscAccount } from "react-icons/vsc"

const UserInfoBox = () => {
  const userInfo = useAuthStore(s => s.userInfo)
  const logoutAction = useAuthStore(s => s.logoutAction)
  const router = useRouter()

  const goToLoginPage = () => {
    router.push('/login')
  }

  return (
    <div className={`border-t border-t-light-purple dark:border-t-charcoal pt-5 flex`}>
      <div className={`flex gap-3 items-center`}>
        <VscAccount fontSize={'34px'}/>
        <div className="">
          <h5 className="text-[17px]">{userInfo?.userId || '비회원'}</h5>
          <p className="text-sm text-silver">{userInfo?.email || '이메일 없음'}</p>
        </div>
      </div>

      <button 
        className={`ml-auto flex items-center gap-2.5 
        dark:hover:text-light-purple hover:text-[#fff] 
        cursor-pointer`}
        onClick={ userInfo ? logoutAction : goToLoginPage }  
      >
        {userInfo ? <LuLogOut fontSize={22}/> : <LuLogIn fontSize={22} />}
      </button>
    </div>
  )
}

export default UserInfoBox