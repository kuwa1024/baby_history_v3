import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import {
  collection,
  orderBy,
  limit,
  where,
  Timestamp,
  startAfter,
  query,
  getDocs,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '@/app/firebase';
import { RootState } from '@/app/store';
import { Item } from '@/types/api';

const pageLimit = 20;

const getItems = async ({ search, lastItem }: { search?: string; lastItem?: Item }) => {
  const itemRef = collection(db, 'items');
  const queryConstraints = [];
  queryConstraints.push(orderBy('createDatetime', 'desc'));
  queryConstraints.push(limit(pageLimit));
  if (search) {
    queryConstraints.push(where('category', '==', search));
  }
  if (lastItem) {
    queryConstraints.push(startAfter(lastItem.createDatetime));
  }
  const q = query(itemRef, ...queryConstraints);
  const querySnapshot = await getDocs(q);
  const items: Item[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    items.push({
      id: doc.id,
      category: data.category as string,
      categorySub: data.categorySub as string,
      createDatetime: data.createDatetime as Timestamp,
    } as Item);
  });
  return items;
};

export const getInfiniteItemsQueryOptions = (search?: string) => {
  return infiniteQueryOptions({
    queryKey: ['items', search],
    queryFn: ({ pageParam }: { pageParam: Item | undefined }) => {
      return getItems({ search, lastItem: pageParam });
    },
    getNextPageParam: (items) => {
      if (items.length < pageLimit) return undefined;
      return items[items.length - 1];
    },
    initialPageParam: undefined,
  });
};

export const useInfiniteItems = () => {
  const search = useSelector((state: RootState) => state.item.search);
  return useInfiniteQuery({
    ...getInfiniteItemsQueryOptions(search),
  });
};
