import { MdOutlineContactPage, MdOutlineFindInPage, MdOutlineInventory, MdEqualizer } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { LuFolderCog, LuSettings } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import styled, { css } from 'styled-components';

const strokeStyle = css`
  font-size: 20px;
  stroke-width: 2.3px;
`

const boxStyle = css`
  font-size: 22px;
`

const HomeIcon = styled(FiHome)`${strokeStyle}`
const MyFormIcon = styled(MdOutlineContactPage)`${boxStyle}`
const EidtIcon = styled(FaRegEdit)`${strokeStyle}`
const ResultIcon = styled(MdOutlineFindInPage)`${boxStyle}`
const QuestionListIcon = styled(LuFolderCog)`${boxStyle}`
const FormListIcon = styled(MdOutlineInventory)`${boxStyle}`
const DashBoardIcon = styled(MdEqualizer)`${boxStyle}`
const SettingIcon = styled(LuSettings)`${boxStyle}`

const sidebarNavs = [
{   text: '홈', 
    icon: <HomeIcon />, 
    path: '/' },
  { 
    text: '내 설문지', 
    icon: <MyFormIcon />,
    depth2: [
      { 
        text: '제작하기', 
        icon: <EidtIcon />, 
        path: '/my-form/manager'
      },
      { 
        text: '결과확인', 
        icon: <ResultIcon />, 
        path: '/my-form/result' 
      },
      { 
        text: '문항관리', 
        icon: <QuestionListIcon />, 
        path: '/my-form/questions' 
      }
    ]
  },
  { 
    text: '참여하기', 
    icon: <FormListIcon />, 
    path: '/form-list'
  },
  { 
    text: '대시보드', 
    icon: <DashBoardIcon />, 
    path: '/dash-board' 
  },
  { 
    text: '설정', 
    icon: <SettingIcon />, 
    path: 'setting' 
  },
]

export default sidebarNavs