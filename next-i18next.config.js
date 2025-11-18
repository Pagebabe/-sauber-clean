/**
 * next-i18next Configuration
 * Supports 5 languages: EN, DE, TH, RU, FR
 */

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'th', 'ru', 'fr'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
