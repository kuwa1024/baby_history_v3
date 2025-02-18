import { Timestamp } from 'firebase/firestore';

export interface Item {
  id: string;
  category: string;
  categorySub: string;
  createDatetime: Timestamp;
}
