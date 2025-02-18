import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useAppSelector } from '@/app/hooks';
import { getInfiniteItemsQueryOptions } from '@/features/history/api/getItems';

const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, 'items', id));
  return id;
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const search = useAppSelector((state) => state.item.search);
  return useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: getInfiniteItemsQueryOptions(search).queryKey,
      });
    },
    mutationFn: deleteItem,
  });
};
