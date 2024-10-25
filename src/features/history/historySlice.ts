import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore"
import { db } from "../../app/firebase"

interface Item {
  id: string
  category: string
  categorySub: string
  createDatetime: string
}

type NewItem = Pick<Item, "category" | "categorySub">

export const historySlice = createApi({
  reducerPath: "history",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      queryFn: async () => {
        const itemRef = collection(db, "items")
        const q = query(itemRef, orderBy("createDatetime", "desc"))
        const querySnapshot = await getDocs(q)
        let items: Item[] = []
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            category: doc.data().category,
            categorySub: doc.data().categorySub,
            createDatetime: new Date(
              doc.data().createDatetime.seconds * 1000,
            ).toLocaleString(),
          } as Item)
        })
        return { data: items }
      },
      providesTags: ["Item"],
    }),
    addNewItem: builder.mutation<null, NewItem>({
      queryFn: async (item) => {
        const docRef = await addDoc(collection(db, "items"), {
          ...item,
          createDatetime: Timestamp.fromDate(new Date()),
        })
        return { data: null }
      },
      invalidatesTags: ["Item"],
    }),
  }),
})

export const { useGetItemsQuery, useAddNewItemMutation } = historySlice
