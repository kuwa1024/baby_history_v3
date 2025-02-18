import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useAppSelector } from '@/app/hooks';
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
  const search = useAppSelector((state) => state.item.search);
  return useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: getInfiniteItemsQueryOptions(search).queryKey,
      });
    },
    mutationFn: createItem,
  });
};
