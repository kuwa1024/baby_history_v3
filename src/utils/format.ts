export const formatDate = (date: string) => {
  const parsedDate: Date = new Date(date);
  const padZero = (num: number) => (num < 10 ? `0${num}` : num);
  return `${padZero(parsedDate.getMonth() + 1)}/${padZero(parsedDate.getDate())} ${padZero(parsedDate.getHours())}:${padZero(parsedDate.getMinutes())}`;
};
