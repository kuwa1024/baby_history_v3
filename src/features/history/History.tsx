import { useNavigate } from "react-router-dom"
import BottomForm from "../../components/BottomForm"
import FabSearch from "../../components/FabSearch"
import FabUp from "../../components/FabUp"
import HistoryTable from "../../components/HistoryTable"

export const History = () => {
  const navigate = useNavigate()
  return (
    <>
      <button onClick={() => navigate("/signout")}>サインアウト</button>
      <HistoryTable />
      <FabSearch />
      <FabUp />
      <BottomForm />
    </>
  )
}
