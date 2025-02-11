import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/app/firebase';

export interface Item {
  id: string;
  category: string;
  categorySub: string;
  createDatetime: string;
}

type NewItem = Pick<Item, 'category' | 'categorySub'>;

export const historySlice = createApi({
  reducerPath: 'history',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    getItems: builder.query<Item[], { lastItems: Item[]; search?: string }>({
      queryFn: async ({ lastItems, search }) => {
        const itemRef = collection(db, 'items');
        const queryConstraints = [];
        queryConstraints.push(orderBy('createDatetime', 'desc'));
        queryConstraints.push(limit(20));
        if (search) {
          queryConstraints.push(where('category', '==', search));
        }
        if (lastItems.length > 0) {
          const lastItem = lastItems[lastItems.length - 1];
          const lastItemDate = Timestamp.fromDate(new Date(lastItem.createDatetime));
          queryConstraints.push(startAfter(lastItemDate));
        }
        const q = query(itemRef, ...queryConstraints);
        const querySnapshot = await getDocs(q);
        const items: Item[] = [...lastItems];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            category: data.category as string,
            categorySub: data.categorySub as string,
            createDatetime: new Date(
              (data.createDatetime as Timestamp).seconds * 1000
            ).toLocaleString(),
          } as Item);
        });
        return { data: items };
      },
      providesTags: ['Item'],
    }),
    addNewItem: builder.mutation<string, NewItem>({
      queryFn: async (item) => {
        // テスト用遅延ロード
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        const docRef = await addDoc(collection(db, 'items'), {
          ...item,
          createDatetime: Timestamp.fromDate(new Date()),
        });
        return { data: docRef.id };
      },
      invalidatesTags: ['Item'],
    }),
  }),
});

export const { useGetItemsQuery, useAddNewItemMutation } = historySlice;
