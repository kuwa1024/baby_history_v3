import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '@/app/firebase';
import { RootState } from '@/app/store';
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
  const search = useSelector((state: RootState) => state.item.search);
  return useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: getInfiniteItemsQueryOptions(search).queryKey,
      });
    },
    mutationFn: editItem,
  });
};
