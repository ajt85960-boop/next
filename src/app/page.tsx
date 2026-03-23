"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {t("home.title")}
        </Typography>
        <Typography color="text.secondary">
          {t("home.subtitle")}
        </Typography>
        <LanguageSwitcher />
        <Stack direction="row" spacing={2}>
          <Button href="/login" variant="contained">
            {t("home.goLogin")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
