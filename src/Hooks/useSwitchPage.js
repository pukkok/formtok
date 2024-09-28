import { useRecoilState } from "recoil"
import { switchTheScreenAtom } from "../Recoils/screenAtom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function useSwitchPage () {
    const [switchTheScreen, setSwitchTheScreen] = useRecoilState(switchTheScreenAtom)
    const navigate = useNavigate()
    const goToPage = (path) => {
        setSwitchTheScreen('go')
        setTimeout(() => {
            navigate(path)
        }, 500);
    }

    useEffect(() => {
        if(switchTheScreen==='go'){
            setTimeout(() => {
                setSwitchTheScreen('')
            }, 1000);
        }
    }, [switchTheScreen, setSwitchTheScreen])

    return { goToPage }
}

export default useSwitchPage