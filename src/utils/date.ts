import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

export const formatDate = {
  time: (timestamp: number): string => {
    return dayjs(timestamp).format('HH:mm');
  },

  date: (timestamp: number): string => {
    return dayjs(timestamp).format('YYYY-MM-DD');
  },

  datetime: (timestamp: number): string => {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm');
  },

  relative: (timestamp: number): string => {
    const now = dayjs();
    const target = dayjs(timestamp);
    const diffMinutes = now.diff(target, 'minute');
    
    if (diffMinutes < 1) return '刚刚';
    if (diffMinutes < 60) return `${diffMinutes}分钟前`;
    
    const diffHours = now.diff(target, 'hour');
    if (diffHours < 24) return `${diffHours}小时前`;
    
    const diffDays = now.diff(target, 'day');
    if (diffDays < 7) return `${diffDays}天前`;
    
    return target.format('MM-DD');
  },
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
