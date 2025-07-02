import TreeNode from "./TreeNode";
import { FaRegEdit } from "react-icons/fa";
import { MdEqualizer, MdOutlineContactPage, MdOutlineFindInPage, MdOutlineInventory } from "react-icons/md";
import { LuFolderCog, LuSettings } from "react-icons/lu";
import { FiHome } from "react-icons/fi";

const sidebarNavs = [
  { text: '홈', icon: <FiHome fontSize={20} strokeWidth={2}/>, path: '/' },
  { 
    text: '내 설문지', icon: <MdOutlineContactPage fontSize={22}/>,
    children: [
      { text: '제작하기', icon: <FaRegEdit fontSize={20} strokeWidth={2}/>, path: '/my-form/manage' },
      { text: '결과확인', icon: <MdOutlineFindInPage fontSize={22}/>, path: '/my-form/result' },
      { text: '문항관리', icon: <LuFolderCog fontSize={22}/>, path: '/my-form/question-bank' }
    ]
  },
  { text: '참여하기', icon: <MdOutlineInventory fontSize={22}/>, path: '/participate' },
  { text: '대시보드', icon: <MdEqualizer fontSize={22}/>, path: '/dashboard' },
  { text: '설정', icon: <LuSettings fontSize={22}/>, path: '/setting' },
]

const SidebarNavs = ({ handleRouteChange }) => {

  return (
    <ul className="flex flex-col">
      {sidebarNavs.map((node, idx) => {
        return <TreeNode key={idx} handleRouteChange={handleRouteChange} node={node}/>
      })}
    </ul>
  )
}

export default SidebarNavs