import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import I18NextVue from 'i18next-vue';
import type { App } from 'vue';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export const i18n = (app: App) => {
  app.use(I18NextVue, { i18next });
  return app;
};
