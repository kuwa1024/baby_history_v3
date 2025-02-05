import { useState } from "react"
import FabSearch from "../../components/FabSearch"
import FabUp from "../../components/FabUp"
import BottomForm from "./BottomForm"
import HistoryList from "./HistoryList"

export const History = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div>
      <HistoryList isLoading={isLoading} />
      <FabSearch />
      <FabUp />
      <BottomForm setIsLoading={setIsLoading} />
    </div>
  )
}
