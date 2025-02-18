import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return dayjs(date).format('MM/DD HH:mm');
};
