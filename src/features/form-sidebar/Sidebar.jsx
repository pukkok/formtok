import SidebarWrapper from "./compoents/SideBarWrapper"
import SidebarHeader from "./compoents/SidebarHeader"
import UserInfoBox from "./compoents/UserInfoBox"
import SidebarNavs from "./compoents/SidebarNavs"

const Sidebar = () => {

  return (
    <SidebarWrapper>
      <SidebarHeader />
      <SidebarNavs />
      <footer className="mt-auto">
        <UserInfoBox />
      </footer>
    </SidebarWrapper>
  )
}

export default Sidebar