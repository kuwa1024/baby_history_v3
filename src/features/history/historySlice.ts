import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore"
import { db } from "../../app/firebase"

export interface Item {
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
    getItems: builder.query<Item[], { lastItems?: Item[] }>({
      queryFn: async ({ lastItems }) => {
        const itemRef = collection(db, "items")
        const queryConstraints = []
        queryConstraints.push(orderBy("createDatetime", "desc"))
        queryConstraints.push(limit(20))
        if (lastItems) {
          const lastItem = lastItems[lastItems.length - 1]
          const lastItemDate = Timestamp.fromDate(
            new Date(lastItem.createDatetime),
          )
          queryConstraints.push(startAfter(lastItemDate))
        }
        let q = query(itemRef, ...queryConstraints)
        const querySnapshot = await getDocs(q)
        let items: Item[] = lastItems ? [...lastItems] : []
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
    addNewItem: builder.mutation<string, NewItem>({
      queryFn: async (item) => {
        // テスト用遅延ロード
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        const docRef = await addDoc(collection(db, "items"), {
          ...item,
          createDatetime: Timestamp.fromDate(new Date()),
        })
        return { data: docRef.id }
      },
      invalidatesTags: ["Item"],
    }),
  }),
})

export const { useGetItemsQuery, useAddNewItemMutation } = historySlice
