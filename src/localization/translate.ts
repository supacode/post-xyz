import i18next from 'i18next';

export const t = (key: string, options?: any) => i18next.t(key, options) as string;
