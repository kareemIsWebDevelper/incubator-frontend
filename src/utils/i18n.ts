// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { ensurePrefix } from '@/utils/string'

// Precompute the set of locales for faster lookup
const localeSet = new Set(i18n.locales);

// Check if the url is missing the locale
export const isUrlMissingLocale = (url: string) => {
  for (const locale of localeSet) {
    if (url.startsWith(`/${locale}/`) || url === `/${locale}`) {
      return false;
    }
  }
  return true;
}

// Get the localized url
export const getLocalizedUrl = (url: string, languageCode: string): string => {
  if (!url || !languageCode) throw new Error("URL or Language Code can't be empty");

  return isUrlMissingLocale(url) ? `/${languageCode}${ensurePrefix(url, '/')}` : url;
}


// // Check if the url is missing the locale
// export const isUrlMissingLocale = (url: string) => {
//   return i18n.locales.every(locale => !(url.startsWith(`/${locale}/`) || url === `/${locale}`))
// }

// // Get the localized url
// export const getLocalizedUrl = (url: string, languageCode: string): string => {
//   if (!url || !languageCode) throw new Error("URL or Language Code can't be empty")

//   return isUrlMissingLocale(url) ? `/${languageCode}${ensurePrefix(url, '/')}` : url
// }
