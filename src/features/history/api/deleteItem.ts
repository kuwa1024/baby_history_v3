import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '@/app/firebase';
import { RootState } from '@/app/store';
import { getInfiniteItemsQueryOptions } from '@/features/history/api/getItems';

const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, 'items', id));
  return id;
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const search = useSelector((state: RootState) => state.item.search);
  return useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: getInfiniteItemsQueryOptions(search).queryKey,
      });
    },
    mutationFn: deleteItem,
  });
};
