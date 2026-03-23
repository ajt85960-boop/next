"use client";

import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  function changeLanguage(lang: "zh-CN" | "en-US") {
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }

  return (
    <Stack direction="row" spacing={1}>
      <Button
        size="small"
        variant={i18n.language === "zh-CN" ? "contained" : "outlined"}
        onClick={() => changeLanguage("zh-CN")}
      >
        {t("lang.zh")}
      </Button>
      <Button
        size="small"
        variant={i18n.language === "en-US" ? "contained" : "outlined"}
        onClick={() => changeLanguage("en-US")}
      >
        {t("lang.en")}
      </Button>
    </Stack>
  );
}
