"use client";

import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

const defaultLanguage = "zh-CN";
const supportedLanguages = ["zh-CN", "en-US"] as const;

function getStoredLanguage() {
  if (typeof window === "undefined") return defaultLanguage;
  const lang = localStorage.getItem("lang");
  if (lang && supportedLanguages.includes(lang as (typeof supportedLanguages)[number])) {
    return lang;
  }
  return defaultLanguage;
}

if (!i18n.isInitialized) {
  i18n
    .use(
      resourcesToBackend((language: string, namespace: string) =>
        import(`@/locales/${language}/${namespace}.json`),
      ),
    )
    .use(initReactI18next)
    .init({
      lng: getStoredLanguage(),
      fallbackLng: defaultLanguage,
      supportedLngs: supportedLanguages as unknown as string[],
      ns: ["common"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
