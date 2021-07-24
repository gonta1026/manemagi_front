import dayjs from 'dayjs';

export const formatDay = (date: Date | string) => dayjs(date).format('YYYY-MM-DD');
