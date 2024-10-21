import acceptLanguage from 'accept-language';

import { page } from '$app/stores';
import { derived, type Readable } from 'svelte/store';

export const defaultLang = 'en';

export const languages = {
  en: 'English',
  fr: 'Français'
} as const;

export type Language = keyof typeof languages;

export const isLang = (lang: string): lang is Language => {
  return Object.keys(languages).includes(lang) && lang !== defaultLang;
};

export const lang: Readable<Language> = derived(page, ($page) => {
  return isLang($page.params.lang) ? $page.params.lang : defaultLang;
});

export const getOptimalLanguage = (acceptLanguageHeader: string | null): Language => {
  try {
    acceptLanguage.languages(Object.keys(languages));
    const optimalLanguage = acceptLanguage.get(acceptLanguageHeader);

    return optimalLanguage && isLang(optimalLanguage) ? optimalLanguage : defaultLang;
  } catch (error) {
    console.error(error);
    return defaultLang;
  }
};
