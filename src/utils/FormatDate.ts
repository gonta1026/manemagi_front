import dayjs from 'dayjs';

const now = dayjs(); // 現在の日付情報を取得
export const formatToday = now.format('YYYY-MM-DD');
