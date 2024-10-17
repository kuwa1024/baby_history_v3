import Container from "@mui/material/Container"
import BottomForm from "../../components/BottomForm"
import FabSearch from "../../components/FabSearch"
import FabUp from "../../components/FabUp"
import HistoryTable from "../../components/HistoryTable"

export const History = () => {
  return (
    <Container maxWidth="md">
      <HistoryTable />
      <FabSearch />
      <FabUp />
      <BottomForm />
    </Container>
  )
}
