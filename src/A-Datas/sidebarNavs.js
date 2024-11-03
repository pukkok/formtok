import { HomeIcon, MyFormIcon, EidtIcon, ResultIcon, QuestionListIcon, FormListIcon, DashBoardIcon, SettingIcon } from "../A-Components/Icons/Icons"

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