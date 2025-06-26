import { HomeIcon, MyFormIcon, EidtIcon, ResultIcon, QuestionListIcon, FormListIcon, DashBoardIcon, SettingIcon } from "@/A-Components/Icons/Icons"
import TreeNode from "./TreeNode";

const sidebarNavs = [
  { text: '홈', icon: <HomeIcon />, path: '/' },
  { 
    text: '내 설문지', icon: <MyFormIcon />,
    children: [
      { text: '제작하기', icon: <EidtIcon />, path: '/my-form/manage' },
      { text: '결과확인', icon: <ResultIcon />, path: '/my-form/result' },
      { text: '문항관리', icon: <QuestionListIcon />, path: '/my-form/questions' }
    ]
  },
  { text: '참여하기', icon: <FormListIcon />, path: '/form-list' },
  { text: '대시보드', icon: <DashBoardIcon />, path: '/dashboard' },
  { text: '설정', icon: <SettingIcon />, path: '/setting' },
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