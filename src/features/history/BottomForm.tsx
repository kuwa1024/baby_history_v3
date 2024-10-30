import { Button, Grid2, Paper } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { CommonSelect, commonSelectProps } from "../../components/CommonSelect"
import { category } from "./category"
import { categorySub } from "./categorySub"
import { useAddNewItemMutation } from "./historySlice"

interface Inputs {
  category: string
  categorySub: string
}

export default function BottomForm() {
  const [addNewItem, { isLoading }] = useAddNewItemMutation()
  const { control, watch, handleSubmit, reset } = useForm<Inputs>()

  const categorySelectProps: commonSelectProps = {
    ...category,
    control: control,
    required: true,
  }

  const index = watch("category")
    ? category.relations[
        category.items.findIndex((item) => item === watch("category"))
      ]
    : 0
  const categorySubSelect = categorySub[index]
  const categorySubSelectProps: commonSelectProps = {
    ...categorySubSelect,
    control: control,
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await addNewItem({
        category: data.category,
        categorySub: data.categorySub,
      }).unwrap()
      reset()
    } catch (err) {
      console.error("Failed to save the post: ", err)
    }
  }

  return (
    <Paper
      sx={{ position: "fixed", bottom: 10, left: 0, right: 0 }}
      elevation={3}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={1}>
          <Grid2 size={4} sx={{ padding: "20px" }}>
            <CommonSelect {...categorySelectProps} />
          </Grid2>
          <Grid2 size={4} sx={{ padding: "20px" }}>
            <CommonSelect {...categorySubSelectProps} />
          </Grid2>
          <Grid2 size={4} sx={{ padding: "10px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                height: "70%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              登録
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  )
}
