import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '@/app/firebase';
import { RootState } from '@/app/store';
import { getInfiniteItemsQueryOptions } from '@/features/history/api/getItems';

interface Item {
  category: string;
  categorySub: string;
}

const createItem = async (item: Item) => {
  // テスト用遅延ロード
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const docRef = await addDoc(collection(db, 'items'), {
    ...item,
    createDatetime: Timestamp.fromDate(new Date()),
  });
  return docRef.id;
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  const search = useSelector((state: RootState) => state.item.search);
  return useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: getInfiniteItemsQueryOptions(search).queryKey,
      });
    },
    mutationFn: createItem,
  });
};
