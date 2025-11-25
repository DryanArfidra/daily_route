export const getCurrentWeek = (): string => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return `Week-${Math.ceil(days / 7)}`;
};

export const getCurrentMonth = (): string => {
  return new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' });
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getTodayKey = (): string => {
  return formatDate(new Date());
};