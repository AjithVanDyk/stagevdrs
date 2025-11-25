import { useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../config/translations';

type TranslationTree = Record<string, unknown>;

const isTranslationTree = (value: unknown): value is TranslationTree =>
  typeof value === 'object' && value !== null;

const lookupValue = (tree: TranslationTree, keys: string[]): unknown => {
  return keys.reduce<unknown>((acc, key) => {
    if (isTranslationTree(acc) && key in acc) {
      return acc[key];
    }
    return undefined;
  }, tree);
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const keys = key.split('.');
      const localizedValue = lookupValue(translations[language], keys);
      if (typeof localizedValue === 'string') {
        return localizedValue;
      }

      const fallbackValue = lookupValue(translations.en, keys);
      if (typeof fallbackValue === 'string') {
        return fallbackValue;
      }

      return fallback || key;
    },
    [language]
  );

  return { t, language };
};









