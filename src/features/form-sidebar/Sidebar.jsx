import SidebarWrapper from "./compoents/SideBarWrapper"
import SidebarHeader from "./compoents/SidebarHeader"
import UserInfoBox from "./compoents/UserInfoBox"
import SidebarNavs from "./compoents/SidebarNavs"
import useRouteGuard from "@/hooks/useRouteGuard"
import ModalContainer from "@/components/Modal/ModalContainer"
import UnSavedAlertModal from "./compoents/UnSavedAlertModal"
import { useScreenStore } from "@/stores/useScreenStore"
import { useEffect } from "react"

const Sidebar = () => {

  const { modalRef, handleRouteChange, confirmNavigation } = useRouteGuard()

  const setActiveTab = useScreenStore(s => s.setActiveTab) 

  const confirmAction = () => {
    const next = confirmNavigation()
    setActiveTab(next)
  }

  // TODO: 없으면 ESC로 나가지기 때문에 필수 요소이다.
  useEffect(() => {
    modalRef.current?.setEscapeEnabled(false)
    return () => modalRef.current?.setEscapeEnabled(true)
  }, [])


  return (
    <SidebarWrapper>
      <SidebarHeader />
      <SidebarNavs handleRouteChange={handleRouteChange}/>
      <footer className="mt-auto">
        <UserInfoBox />
      </footer>

      <ModalContainer ref={modalRef}>
        <UnSavedAlertModal onConfirm={confirmAction}/>
      </ModalContainer>
    </SidebarWrapper>
  )
}

export default Sidebar