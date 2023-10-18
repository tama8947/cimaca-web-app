import 'server-only';
import type { Locale } from '@/i18n.config';

const dictionaries = {
  es : async () => (await import('@/utils/internationalization/dictionaries/es.json')).default,
  en : async () => (await import('@/utils/internationalization/dictionaries/en.json')).default
};

export const getDictionary = async (locale: Locale) => await dictionaries[locale]();
