import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useAppSelector } from '@/app/hooks';
import { getInfiniteItemsQueryOptions } from '@/features/history/api/getItems';
import { Item } from '@/types/api';

const editItem = async (item: Item) => {
  await setDoc(doc(db, 'items', item.id), {
    category: item.category,
    categorySub: item.categorySub,
    createDatetime: item.createDatetime,
  });
  return item.id;
};

export const useEditItem = () => {
  const queryClient = useQueryClient();
  const search = useAppSelector((state) => state.item.search);
  return useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: getInfiniteItemsQueryOptions(search).queryKey,
      });
    },
    mutationFn: editItem,
  });
};
