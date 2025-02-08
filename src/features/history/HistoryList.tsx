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
import { useEffect, useState } from "react"
import { NotificationProps } from "../../components/Notification"
import { Item, useGetItemsQuery } from "./historySlice"

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "whitesmoke",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

interface HistoryListProps {
  setIsLoading: (isLoading: boolean) => void
  setNotification: (notification: NotificationProps) => void
}

export default function HistoryList({
  setIsLoading,
  setNotification,
}: HistoryListProps) {
  const [items, setItems] = useState<Item[]>([])
  const [lastItem, setLastItem] = useState<Item | undefined>(undefined)
  const {
    data: newItems = [],
    isLoading,
    isFetching,
    isError,
  } = useGetItemsQuery({ lastItem })

  useEffect(() => {
    setIsLoading(isLoading || isFetching)
  }, [isLoading, isFetching])

  useEffect(() => {
    if (isError) {
      setNotification({
        message: "データの取得に失敗しました",
        severity: "error",
      })
    }
  }, [isError])

  useEffect(() => {
    if (newItems.length > 0) {
      setItems((prevItems) => {
        const newUniqueItems = newItems.filter(
          (newItem) => !prevItems.some((item) => item.id === newItem.id),
        )
        return [...prevItems, ...newUniqueItems]
      })
    }
  }, [newItems])

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      if (bottom && !isFetching) {
        setLastItem(items[items.length - 1])
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isFetching, items])

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
          {items.map((item) => (
            <StyledTableRow key={item.id}>
              <TableCell scope="row">{item.createDatetime}</TableCell>
              <TableCell>
                {item.category} {item.categorySub}
              </TableCell>
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
