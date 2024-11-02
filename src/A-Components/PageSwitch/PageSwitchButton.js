import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { switchTheScreenAtom } from "../../C-Recoils/screenAtom";
import { useNavigate } from "react-router-dom";

function PageSwitchButton ({to, children, className}) {
  const [switchTheScreen, setSwitchTheScreen] = useRecoilState(switchTheScreenAtom)

  const navigate = useNavigate()
  const goToPage = (path) => {
    setSwitchTheScreen('go')
    setTimeout(() => {
      navigate(path)
    }, 500)
  }

  useEffect(() => {
    if(switchTheScreen === 'go'){
      setTimeout(() => {
        setSwitchTheScreen('')
      }, 1000)
    }
  }, [switchTheScreen, setSwitchTheScreen])

  return <button className={className} onClick={()=>goToPage(to)}>{children}</button>
}

export default PageSwitchButton