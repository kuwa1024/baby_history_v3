import styled from "@emotion/styled"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Button, Grid2 } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

const StyledTableRow = styled(TableRow)(({}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "whitesmoke",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

function createData(name: string, calories: string) {
  return { name, calories }
}

const rows = [
  createData("05/01 10:21", "母乳(右) 20分"),
  createData("05/02 10:21", "うんこ"),
  createData("05/03 10:21", "うんこ"),
  createData("05/04 10:21", "うんこ"),
  createData("05/05 10:21", "うんこ"),
  createData("05/06 10:21", "うんこ"),
  createData("05/07 10:21", "うんこ"),
  createData("05/08 10:21", "うんこ"),
  createData("05/09 10:21", "うんこ"),
  createData("05/10 10:21", "うんこ"),
  createData("05/11 10:21", "うんこ"),
  createData("05/12 10:21", "うんこ"),
  createData("05/13 10:21", "うんこ"),
  createData("05/14 10:21", "うんこ"),
  createData("05/15 10:21", "うんこ"),
  createData("05/16 10:21", "うんこ"),
  createData("05/17 10:21", "うんこ"),
  createData("05/18 10:21", "うんこ"),
  createData("05/19 10:21", "うんこ"),
  createData("05/20 10:21", "うんこ"),
  createData("05/21 10:21", "うんこ"),
  createData("05/22 10:21", "うんこ"),
  createData("05/23 10:21", "うんこ"),
  createData("05/24 10:21", "うんこ"),
  createData("05/25 10:21", "うんこ"),
  createData("05/26 10:21", "うんこ"),
]

export default function HistoryTable() {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: "100px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>日時</TableCell>
            <TableCell>行動</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <TableCell scope="row">{row.name}</TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell align="center">
                <Grid2 container sx={{ marginLeft: "20%", marginRight: "20%" }}>
                  <Grid2 size={6}>
                    <Button>
                      <EditIcon color="action" />
                    </Button>
                  </Grid2>
                  <Grid2 size={6}>
                    <Button>
                      <DeleteIcon color="action" />
                    </Button>
                  </Grid2>
                </Grid2>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
