import CardWrapper from "./CardWrapper"
import { IoMdAddCircle } from "react-icons/io"

const CreateCard = () => {

  return (
    <CardWrapper>
      <button className={`
      group
      flex justify-center items-center w-full h-full p-6
      dark:bg-charcoal dark:hover:bg-charcoal
      bg-bright-b hover:bg-bright-c cursor-pointer
      `}>
        <IoMdAddCircle className="text-6xl text-[#CDCDCD] group-hover:text-point" />
      </button>
    </CardWrapper>
  )
}

export default CreateCard