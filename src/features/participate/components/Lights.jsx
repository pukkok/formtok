import { PARTICIPATE_WORK_COLOR_MAP } from "@/utils/workColor"

const Lights = ({ works }) => {

  return (
    <div className="flex gap-2">
      {works.map(work => (
        <span key={work} className={`mr-auto w-2.5 h-2.5 rounded-full ${PARTICIPATE_WORK_COLOR_MAP[work]}`}/>
      ))}
    </div>
  )
}

export default Lights